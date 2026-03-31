import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import argon2 from "argon2";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

// Dependencias do endpoint:
// - NextResponse para devolver JSON, status e cookies.
// - randomUUID para marcar respostas e gerar IDs de token.
// - argon2 para comparar a senha recebida com o hash salvo.
// - zod para validar o corpo da requisicao antes de tocar no banco.

// Configuracoes fixas usadas pelo endpoint de login.
// Aqui ficam os valores que nao devem mudar no meio do fluxo.
const CORS_METHODS = "POST, OPTIONS";
const CORS_HEADERS = "Content-Type, Authorization";
const AUTH_COOKIE_NAME = "token";
const AUTH_TOKEN_EXPIRATION = "8h";
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;
const INVALID_CREDENTIALS_MESSAGE =
  "Credenciais inválidas. Por favor, tente novamente.";
const INTERNAL_AUTH_ERROR_MESSAGE = "Falha ao autenticar. Tente novamente.";
const RATE_LIMIT_MESSAGE = "Muitas tentativas. Tente novamente mais tarde.";
const AUTH_AUDIT_REASON_INVALID_REQUEST = "validation_failed";
const AUTH_AUDIT_REASON_INVALID_CREDENTIALS = "invalid_credentials";
const AUTH_AUDIT_REASON_ACCOUNT_LOCKED = "account_locked";
const AUTH_AUDIT_REASON_MEMORY_THROTTLE = "memory_throttle";
const AUTH_AUDIT_REASON_DISTRIBUTED_THROTTLE = "distributed_throttle";
const AUTH_AUDIT_REASON_AUTHENTICATED = "authenticated";
const AUTH_AUDIT_REASON_SERVER_ERROR = "server_error";

// Contrato esperado para o corpo da requisicao de login.
// Se o body vier fora desse formato, a requisicao falha cedo.
const loginSchema = z
  .object({
    email: z.email().trim().max(254),
    senha: z.string().min(8).max(128),
    // Mantemos o campo para compatibilidade com o front atual, mas ele não é confiável.
    role: z.enum(["patient", "doctor", "admin"]).optional(),
  })
  .strict();

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

// Regras do bloqueio temporario contra tentativas repetidas.
// MAX_ATTEMPTS: quantas falhas aceitamos antes de bloquear.
// ATTEMPT_WINDOW_MS: janela de tempo para contar as falhas.
// LOCKOUT_MS: por quanto tempo a chave fica bloqueada.
// Esses valores controlam o throttle em memoria e o lockout persistente.

// Estado simples de bloqueio em memoria para reduzir brute force.
// Ele ajuda em um unico processo, mas a protecao real continua no banco.
type LoginAttemptState = {
  count: number;
  firstAttemptAt: number;
  blockedUntil: number;
};

// Extensao do globalThis para reaproveitar o map entre hot reloads.
// Isso evita perder o estado de throttle durante recarregamentos de dev.
type GlobalAuthState = typeof globalThis & {
  __loginAttempts?: Map<string, LoginAttemptState>;
};

const globalAuthState = globalThis as GlobalAuthState;
const loginAttempts =
  globalAuthState.__loginAttempts ?? new Map<string, LoginAttemptState>();

if (!globalAuthState.__loginAttempts) {
  globalAuthState.__loginAttempts = loginAttempts;
}

// Etapa 1 do fluxo: descobrir quais origens podem conversar com a rota.
// Se a origem nao estiver na lista, a resposta de CORS nao sera liberada.
// Isso fecha a porta para chamadas cross-origin nao autorizadas.
function getAllowedOrigins() {
  const allowedOrigins = (process.env.ALLOWED_API_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteOrigin) {
    allowedOrigins.push(siteOrigin);
  }

  return [...new Set(allowedOrigins)];
}

// Etapa 2 do fluxo: montar os headers de CORS apenas quando a origem for valida.
// Isso permite que o navegador aceite a resposta somente para origens liberadas.
function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return null;
  }

  const allowedOrigins = getAllowedOrigins();
  if (!allowedOrigins.includes(origin)) {
    return null;
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": CORS_METHODS,
    "Access-Control-Allow-Headers": CORS_HEADERS,
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

// Etapa 3 do fluxo: aplicar os headers de CORS na resposta quando necessario.
// O helper evita repetir essa montagem em cada resposta.
function withCors(response: NextResponse, request: Request) {
  const corsHeaders = getCorsHeaders(request);
  if (!corsHeaders) {
    return response;
  }

  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

// Etapa 4 do fluxo: impedir cache da resposta de auth.
// Assim o navegador e proxies nao reaproveitam dados sensiveis.
function applyNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

// Etapa 5 do fluxo: identificar o IP do cliente para montar a chave de throttle.
// O IP ajuda a separar tentativas por origem de rede.
function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

// Etapa 6 do fluxo: criar a chave usada no throttle.
// A chave combina IP e email para separar tentativas por origem e conta.
function getThrottleKey(request: Request, email?: string) {
  return `${getClientIp(request)}:${(email ?? "unknown").trim().toLowerCase()}`;
}

// Etapa 7 do fluxo: limpar o bloqueio quando o login da certo.
// Isso evita que um usuario continue bloqueado depois de autenticar.
function resetThrottle(key: string) {
  loginAttempts.delete(key);
}

// Etapa 8 do fluxo: registrar falha de login.
// Se o limite for atingido dentro da janela, a chave fica bloqueada por LOCKOUT_MS.
// Aqui nasce a protecao contra brute force repetido.
function registerFailure(key: string) {
  const now = Date.now();
  const current = loginAttempts.get(key);

  if (!current || now - current.firstAttemptAt > ATTEMPT_WINDOW_MS) {
    loginAttempts.set(key, {
      count: 1,
      firstAttemptAt: now,
      blockedUntil: 0,
    });
    return;
  }

  const nextCount = current.count + 1;
  const blockedUntil = nextCount >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0;

  loginAttempts.set(key, {
    count: blockedUntil ? 0 : nextCount,
    firstAttemptAt: blockedUntil ? now : current.firstAttemptAt,
    blockedUntil,
  });
}

// Etapa 9 do fluxo: verificar se a chave ainda esta bloqueada.
// Quando o tempo expira, a chave volta a funcionar normalmente.
function isBlocked(key: string) {
  const current = loginAttempts.get(key);
  if (!current) {
    return false;
  }

  const now = Date.now();
  if (current.blockedUntil > now) {
    return true;
  }

  if (current.blockedUntil > 0 && current.blockedUntil <= now) {
    loginAttempts.delete(key);
  }

  return false;
}

// Etapa 10 do fluxo: montar uma resposta JSON padrao.
// Aqui centralizamos headers de seguranca, cache e CORS.
// Assim toda saida fica consistente.
function buildJsonResponse(
  payload: Record<string, unknown>,
  status: number,
  request: Request,
  extraHeaders?: Record<string, string>,
) {
  const response = NextResponse.json(payload, { status });
  applyNoStore(response);

  response.headers.set("X-Request-Id", randomUUID());

  if (extraHeaders) {
    for (const [key, value] of Object.entries(extraHeaders)) {
      response.headers.set(key, value);
    }
  }

  return withCors(response, request);
}

// Etapa 11 do fluxo: padronizar a resposta quando email ou senha estao errados.
// A mensagem generica evita enumeracao de conta.
function buildInvalidCredentialsResponse(request: Request) {
  return buildJsonResponse(
    { message: INVALID_CREDENTIALS_MESSAGE },
    401,
    request,
  );
}

// Etapa 12 do fluxo: criar o cookie de autenticacao com as mesmas regras sempre.
// Isso concentra o contrato da sessao em um unico lugar.
function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}

// Coleta os dados do pedido que ajudam na auditoria e na protecao contra abuso.
// Esses dados viram contexto para log e para a protecao distribuida.
function getRequestContext(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return {
    ipAddress,
    userAgent: request.headers.get("user-agent")?.trim() || null,
  };
}

// Normaliza o email para manter chave de auditoria e contagem consistentes.
function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Monta o intervalo de tempo usado na protecao distribuida por logs.
// A consulta busca apenas eventos recentes.
function getThrottleWindowStart(now: Date) {
  return new Date(now.getTime() - ATTEMPT_WINDOW_MS);
}

// Conta tentativas falhas recentes por IP e por email usando o banco como fonte compartilhada.
// Isso e o que faz a protecao funcionar mesmo com varias instancias.
async function getDistributedThrottleStatus(params: {
  ipAddress: string;
  email?: string;
  now: Date;
}) {
  const windowStart = getThrottleWindowStart(params.now);
  const outcomes: Array<"failure" | "blocked" | "invalid_request"> = [
    "failure",
    "blocked",
    "invalid_request",
  ];

  const ipCountPromise = prisma.authAttemptLog.count({
    where: {
      ipAddress: params.ipAddress,
      outcome: { in: outcomes },
      attemptedAt: { gte: windowStart },
    },
  });

  const emailCountPromise = params.email
    ? prisma.authAttemptLog.count({
        where: {
          email: normalizeEmail(params.email),
          outcome: { in: ["failure", "blocked"] },
          attemptedAt: { gte: windowStart },
        },
      })
    : Promise.resolve(0);

  const [ipCount, emailCount] = await Promise.all([
    ipCountPromise,
    emailCountPromise,
  ]);

  return {
    windowStart,
    ipCount,
    emailCount,
    blocked: ipCount >= MAX_ATTEMPTS || emailCount >= MAX_ATTEMPTS,
  };
}

// Registra cada tentativa para manter uma trilha de auditoria forense.
// O mesmo log serve para investigacao, metricas e resposta a incidentes.
async function recordAuthAttempt(params: {
  userId?: string | null;
  email?: string | null;
  ipAddress: string;
  userAgent?: string | null;
  outcome: "success" | "failure" | "blocked" | "invalid_request";
  reason: string;
}) {
  return prisma.authAttemptLog.create({
    data: {
      userId: params.userId ?? undefined,
      email: params.email ? normalizeEmail(params.email) : undefined,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent ?? undefined,
      outcome: params.outcome,
      reason: params.reason,
    },
  });
}

// Calcula o estado final de falhas da conta após uma tentativa invalida.
// Ele decide se a conta segue normal, entra em lockout ou apenas incrementa o contador.
function buildFailedLoginUpdate(
  user: {
    failedLoginCount: number;
    failedLoginWindowStartedAt: Date | null;
  },
  now: Date,
) {
  const windowExpired =
    !user.failedLoginWindowStartedAt ||
    now.getTime() - user.failedLoginWindowStartedAt.getTime() >
      ATTEMPT_WINDOW_MS;

  const nextCount = windowExpired ? 1 : user.failedLoginCount + 1;
  const accountLocked = nextCount >= MAX_ATTEMPTS;

  return {
    failedLoginCount: accountLocked ? 0 : nextCount,
    failedLoginWindowStartedAt:
      windowExpired || accountLocked ? now : user.failedLoginWindowStartedAt,
    lockedUntil: accountLocked ? new Date(now.getTime() + LOCKOUT_MS) : null,
  };
}

// Limpa o estado de bloqueio da conta quando o login da certo.
// Essa limpeza garante que o usuario nao fique preso depois de acertar a senha.
function buildSuccessfulLoginReset(now: Date) {
  return {
    failedLoginCount: 0,
    failedLoginWindowStartedAt: null,
    lockedUntil: null,
    lastLoginAt: now,
  };
}

// Define um rótulo simples para o dispositivo da sessao.
function getSessionDeviceLabel(userAgent: string | null) {
  return userAgent?.trim() || "Unknown device";
}

// Resposta padrao para bloqueios persistentes ou distribuídos.
// O cliente recebe a mesma resposta, independentemente da origem do bloqueio.
function buildThrottledResponse(request: Request, retryAfterSeconds: number) {
  return buildJsonResponse({ message: RATE_LIMIT_MESSAGE }, 429, request, {
    "Retry-After": String(Math.max(1, retryAfterSeconds)),
  });
}

// Etapa 13 do fluxo: responder ao preflight do CORS.
// O navegador chama OPTIONS antes do POST em cenarios cross-origin.
// Se a origem nao estiver liberada, o navegador ja para aqui.
export async function OPTIONS(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  if (!corsHeaders) {
    return buildJsonResponse({ message: "Origem não permitida" }, 403, request);
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Etapa 14 do fluxo: autenticar de fato.
// O passo a passo aqui eh:
// 1. Ler e validar o body.
// 2. Verificar o throttle em memoria e no banco.
// 3. Buscar o usuario no banco.
// 4. Checar lockout persistente da conta.
// 5. Comparar a senha com o hash.
// 6. Registrar auditoria e atualizar o estado da conta.
// 7. Gerar o token.
// 8. Criar o cookie e devolver a resposta.
// Cada bloco abaixo segue exatamente essa ordem.
export async function POST(request: Request) {
  const requestContext = getRequestContext(request);
  const now = new Date();
  const sessionDevice = getSessionDeviceLabel(requestContext.userAgent);

  // Passo 1: ler o payload e rejeitar qualquer formato fora do contrato esperado.
  // Se isso falhar, nao vale a pena seguir para o banco.
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  // Passo 2: se o email for valido, usamos ele na chave do throttle.
  // Se nao for valido, usamos apenas o IP.
  // Assim conseguimos controlar tentativas mesmo com body ruim.
  const emailForThrottle =
    parsed.success && typeof parsed.data.email === "string"
      ? parsed.data.email
      : undefined;
  const throttleKey = getThrottleKey(request, emailForThrottle);

  // Passo 3: bloquear tentativas em excesso antes mesmo de consultar o banco.
  // Essa e a primeira barreira do fluxo.
  if (isBlocked(throttleKey)) {
    await recordAuthAttempt({
      email: emailForThrottle ?? null,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      outcome: "blocked",
      reason: AUTH_AUDIT_REASON_MEMORY_THROTTLE,
    }).catch(() => null);

    const current = loginAttempts.get(throttleKey);
    const retryAfterSeconds = current
      ? Math.max(1, Math.ceil((current.blockedUntil - Date.now()) / 1000))
      : 60;

    return buildThrottledResponse(request, retryAfterSeconds);
  }

  // Passo 4: body invalido gera falha imediata e tambem entra na auditoria.
  if (!parsed.success) {
    registerFailure(throttleKey);
    await recordAuthAttempt({
      email: emailForThrottle ?? null,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      outcome: "invalid_request",
      reason: AUTH_AUDIT_REASON_INVALID_REQUEST,
    }).catch(() => null);
    return buildJsonResponse({ message: "Dados inválidos" }, 400, request);
  }
  // Passo 5: consultar a protecao distribuida e depois buscar o usuario no banco.
  // O role sempre vem do servidor, nao do cliente.
  const { email, senha } = parsed.data;

  const distributedThrottleStatus = await getDistributedThrottleStatus({
    ipAddress: requestContext.ipAddress,
    email,
    now,
  });

  // Se o banco mostrar excesso de tentativas recentes, o bloqueio vale para todas as instancias.
  if (distributedThrottleStatus.blocked) {
    registerFailure(throttleKey);
    await recordAuthAttempt({
      email,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      outcome: "blocked",
      reason: AUTH_AUDIT_REASON_DISTRIBUTED_THROTTLE,
    }).catch(() => null);

    return buildThrottledResponse(request, Math.ceil(ATTEMPT_WINDOW_MS / 1000));
  }

  try {
    // Passo 6: buscar o usuario no banco; o role sempre vem do servidor.
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
        failedLoginCount: true,
        failedLoginWindowStartedAt: true,
        lockedUntil: true,
      },
    });

    // Se o usuario nao existir ou estiver inativo, o login falha.
    // Essa resposta continua generica para nao informar o motivo real.
    if (!user || !user.isActive) {
      registerFailure(throttleKey);
      await recordAuthAttempt({
        userId: user?.id ?? null,
        email,
        ipAddress: requestContext.ipAddress,
        userAgent: requestContext.userAgent,
        outcome: "failure",
        reason: AUTH_AUDIT_REASON_INVALID_CREDENTIALS,
      }).catch(() => null);

      return buildInvalidCredentialsResponse(request);
    }

    // Passo 7: se a conta ainda estiver bloqueada, negamos o acesso antes da senha.
    // Isso evita gastar CPU com hash quando o bloqueio ja existe.
    if (user.lockedUntil && user.lockedUntil > now) {
      registerFailure(throttleKey);
      await recordAuthAttempt({
        userId: user.id,
        email: user.email,
        ipAddress: requestContext.ipAddress,
        userAgent: requestContext.userAgent,
        outcome: "blocked",
        reason: AUTH_AUDIT_REASON_ACCOUNT_LOCKED,
      }).catch(() => null);

      return buildThrottledResponse(
        request,
        Math.ceil((user.lockedUntil.getTime() - now.getTime()) / 1000),
      );
    }

    // Passo 8: comparar a senha informada com o hash salvo no banco.
    // Se algo der errado na verificacao, tratamos como falha generica.
    const passwordMatches = await argon2
      .verify(user.passwordHash, senha)
      .catch(() => false);

    // Se a senha nao bater, a resposta continua generica para nao dar pistas.
    // Aqui tambem atualizamos contador, lockout e auditoria em transacao.
    if (!passwordMatches) {
      registerFailure(throttleKey);
      const failedLoginUpdate = buildFailedLoginUpdate(user, now);

      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: failedLoginUpdate,
        });

        await tx.authAttemptLog.create({
          data: {
            userId: user.id,
            email: user.email,
            ipAddress: requestContext.ipAddress,
            userAgent: requestContext.userAgent ?? undefined,
            outcome: failedLoginUpdate.lockedUntil ? "blocked" : "failure",
            reason: AUTH_AUDIT_REASON_INVALID_CREDENTIALS,
          },
        });
      });

      if (failedLoginUpdate.lockedUntil) {
        return buildThrottledResponse(request, LOCKOUT_MS / 1000);
      }

      return buildInvalidCredentialsResponse(request);
    }

    // Passo 9: login certo, entao limpamos o throttle dessa chave.
    resetThrottle(throttleKey);

    // Passo 10: atualizar o estado da conta e registrar a auditoria do sucesso.
    // O estado fica limpo e pronto para a proxima sessao legitima.
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: buildSuccessfulLoginReset(now),
      });

      await tx.authAttemptLog.create({
        data: {
          userId: user.id,
          email: user.email,
          ipAddress: requestContext.ipAddress,
          userAgent: requestContext.userAgent ?? undefined,
          outcome: "success",
          reason: AUTH_AUDIT_REASON_AUTHENTICATED,
        },
      });

      // A sessao atual e persistida para aparecer na tabela UserSession.
      await tx.userSession.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
          isCurrent: true,
        },
        data: {
          revokedAt: now,
          isCurrent: false,
        },
      });

      await tx.userSession.create({
        data: {
          userId: user.id,
          device: sessionDevice,
          location: null,
          ipAddress: requestContext.ipAddress,
          userAgent: requestContext.userAgent ?? undefined,
          lastSeenAt: now,
          isCurrent: true,
        },
      });
    });

    // Passo 11: gerar o token com os dados minimos necessarios.
    // O token so carrega o que o restante da aplicacao realmente precisa.
    const token = signToken(
      { email: user.email, role: user.role },
      { expiresIn: AUTH_TOKEN_EXPIRATION, jwtid: randomUUID() },
    );

    // Passo 12: montar a resposta de sucesso que vai para o front.
    const response = NextResponse.json(
      {
        message: "Autenticado",
        role: user.role,
        email: user.email,
      },
      { status: 200 },
    );

    applyNoStore(response);
    response.headers.set("X-Request-Id", randomUUID());

    // Passo 13: gravar o cookie httpOnly com o token.
    // Assim o navegador envia a sessao, mas o JavaScript nao acessa o valor.
    setAuthCookie(response, token);

    // Passo 14: aplicar CORS na resposta final e devolver ao cliente.
    return withCors(response, request);
  } catch {
    // Se algo quebrar no meio do fluxo, ainda registramos o evento para manter auditoria.
    await recordAuthAttempt({
      email,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      outcome: "failure",
      reason: AUTH_AUDIT_REASON_SERVER_ERROR,
    }).catch(() => null);

    // Passo 15: erro interno nao deve vazar detalhes do banco ou do fluxo de auth.
    return buildJsonResponse(
      { message: INTERNAL_AUTH_ERROR_MESSAGE },
      500,
      request,
    );
  }
}

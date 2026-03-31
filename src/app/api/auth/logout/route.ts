import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// Nome do cookie que guarda o JWT de autenticação.
const AUTH_COOKIE_NAME = "token";

// Monta uma resposta JSON padrão com headers que evitam cache e facilitam rastreio.
function buildResponse(payload: Record<string, unknown>, status: number) {
  const response = NextResponse.json(payload, { status });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Request-Id", randomUUID());
  return response;
}

// Envia um cookie vazio com expiração no passado para apagar a sessão no navegador.
function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
}

// Logout server-side:
// 1. lê o cookie atual,
// 2. tenta identificar o usuário pelo JWT,
// 3. revoga a UserSession ativa no banco,
// 4. apaga o cookie no cliente.
export async function POST() {
  // Lê os cookies da requisição para recuperar o token atual.
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const now = new Date();

  if (token) {
    try {
      // Valida o JWT e extrai o email salvo no login.
      const payload = verifyToken(token);

      // Usa o email do token para encontrar o usuário correspondente no banco.
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
        select: { id: true },
      });

      if (user) {
        // Marca a sessão corrente como revogada e deixa de considerá-la ativa.
        await prisma.userSession.updateMany({
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
      }
    } catch {
      // Se o token já expirou ou ficou inválido, ainda assim limpamos o cookie.
    }
  }

  // Sempre devolve uma resposta que remove o cookie do navegador.
  const response = buildResponse({ message: "Deslogado" }, 200);
  clearAuthCookie(response);
  return response;
}

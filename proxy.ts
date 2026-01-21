// proxy.ts
// Middleware de segurança com CSP dinâmico e headers de proteção.
// Segue padrão oficial Next.js 16+ (https://nextjs.org/docs/app/guides/content-security-policy)
// Última atualização: Janeiro 2026

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gera nonce criptograficamente seguro para CSP.
 * Usa crypto.randomUUID() (estável desde Node 16+).
 */
function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/**
 * Gera Content Security Policy com nonce dinâmico.
 * @param nonce - Nonce base64 gerado por request
 * @returns CSP header string formatada
 */
function generateCSP(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";

  // Diretivas CSP organizadas por categoria
  const directives = [
    // Fallback para recursos não especificados
    "default-src 'self'",

    // Base URI para relative URLs
    "base-uri 'self'",

    // Scripts: nonce + strict-dynamic para maior segurança
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,

    // Estilos: nonce em prod, inline em dev (hot reload)
    `style-src 'self'${isDev ? " 'unsafe-inline'" : ` 'nonce-${nonce}'`}`,

    // Imagens: self + data URIs + blob (canvas/uploads) + HTTPS externo
    "img-src 'self' data: blob: https:",

    // Fontes: self + data URIs (inline fonts)
    "font-src 'self' data:",

    // Conexões: self + HTTPS (APIs externas)
    "connect-src 'self' https:",

    // Frames: bloqueado (sem iframes)
    "frame-src 'none'",

    // Plugins: bloqueado (Flash, Java, etc.)
    "object-src 'none'",

    // Formulários: apenas para o próprio domínio
    "form-action 'self'",

    // Embedding: bloqueado (anti-clickjacking)
    "frame-ancestors 'none'",

    // Workers: self apenas
    "worker-src 'self'",

    // Manifests: self (PWA)
    "manifest-src 'self'",

    // Força HTTPS em requisições
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

/**
 * Headers de segurança complementares ao CSP.
 * Seguem recomendações OWASP e Mozilla Observatory.
 */
const securityHeaders: Record<string, string> = {
  // Permissions Policy: desabilita APIs sensíveis não utilizadas
  "Permissions-Policy": [
    "accelerometer=()",
    "autoplay=()",
    "camera=()",
    "encrypted-media=()",
    "fullscreen=(self)",
    "geolocation=()",
    "gyroscope=()",
    "magnetometer=()",
    "microphone=()",
    "midi=()",
    "payment=()",
    "usb=()",
    "browsing-topics=()",
  ].join(", "),

  // HSTS: força HTTPS por 1 ano + subdomínios + preload list
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

  // Referrer: envia origin apenas para cross-origin
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Previne MIME-sniffing
  "X-Content-Type-Options": "nosniff",

  // Anti-clickjacking (complementa frame-ancestors do CSP)
  "X-Frame-Options": "DENY",

  // Bloqueia políticas cross-domain (Flash, PDFs)
  "X-Permitted-Cross-Domain-Policies": "none",

  // Isola contexto de navegação
  "Cross-Origin-Opener-Policy": "same-origin",

  // Protege recursos de serem embedados
  "Cross-Origin-Resource-Policy": "same-origin",

  // Isola processo do agent
  "Origin-Agent-Cluster": "?1",
};

/**
 * Função principal do proxy/middleware.
 * Aplica CSP com nonce dinâmico e headers de segurança.
 * @param request - Request do Next.js
 * @returns Response com headers de segurança
 */
export function proxy(request: NextRequest) {
  // Gera nonce único por request (essencial para CSP dinâmico)
  const nonce = generateNonce();

  // Clona headers e adiciona nonce para acesso em Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Cria response com headers modificados
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Aplica CSP com nonce dinâmico
  response.headers.set("Content-Security-Policy", generateCSP(nonce));

  // Aplica headers de segurança
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Cache headers para páginas dinâmicas
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  } else {
    // Prod: revalidação imediata com stale-while-revalidate
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=0, must-revalidate, stale-while-revalidate=60",
    );
  }

  return response;
}

/**
 * Configuração do matcher para o proxy.
 * Define quais requests passam pelo middleware.
 */
export const config = {
  matcher: [
    /*
     * Aplica proxy em todas as rotas EXCETO:
     * - api/* (API routes - não precisam de CSP)
     * - _next/static/* (assets estáticos versionados)
     * - _next/image/* (imagens otimizadas)
     * - Arquivos de metadados (favicon, sitemap, robots, manifest)
     * - Assets estáticos (imagens, fontes, etc.)
     * - Prefetch requests (otimização de navegação)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|eot|otf)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

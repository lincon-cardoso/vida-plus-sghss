// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Gera nonce criptograficamente seguro ─────────────────
function generateNonce(): string {
  // Usando crypto.randomUUID() conforme documentação oficial Next.js
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

// ─── Content Security Policy com Nonce Dinâmico ───────────
function generateCSP(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = `
    default-src 'self';
    base-uri 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://static.cloudflareinsights.com ${
    isDev ? "'unsafe-eval'" : ""
  };
    style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    img-src 'self' data: https:;
    font-src 'self' https: data:;
    connect-src 'self' https:;
    frame-src 'none';
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  // Remove quebras de linha e espaços extras
  return cspHeader.replace(/\s{2,}/g, " ").trim();
}

// ─── Headers de Segurança (sem CSP) ───────────────────────
const securityHeaders: Record<string, string> = {
  "Permissions-Policy": [
    "accelerometer=()",
    "autoplay=()",
    "camera=()",
    "encrypted-media=()",
    "fullscreen=()",
    "geolocation=()",
    "gyroscope=()",
    "magnetometer=()",
    "microphone=()",
    "midi=()",
    "payment=()",
    "usb=()",
  ].join(", "),
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
};

// ─── Proxy Principal (Next.js 16+ convention) ─────────────
export function proxy(request: NextRequest) {
  // Gera nonce único para cada request
  const nonce = generateNonce();

  // Cria headers de request com nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Processa a resposta
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Aplica CSP com nonce dinâmico
  const csp = generateCSP(nonce);
  response.headers.set("Content-Security-Policy", csp);

  // Aplica demais headers de segurança
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Headers de cache para páginas (não afeta assets estáticos)
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  } else {
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=0, must-revalidate, stale-while-revalidate=60"
    );
  }

  return response;
}

// ─── Configuração do Matcher ──────────────────────────────
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Arquivos estáticos (imagens, fontes, etc)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

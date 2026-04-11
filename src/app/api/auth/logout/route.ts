import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import {
  AUTH_COOKIE_NAME,
  getAuthTokenFromRequest,
  revokeSessionFromToken,
} from "@/lib/session";

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
// 2. revoga a UserSession corrente no banco,
// 3. apaga o cookie no cliente.
export async function POST(request: Request) {
  const token = getAuthTokenFromRequest(request);
  const now = new Date();

  if (token) {
    await revokeSessionFromToken(token, now).catch(() => null);
  }

  // Sempre devolve uma resposta que remove o cookie do navegador.
  const response = buildResponse({ message: "Deslogado" }, 200);
  clearAuthCookie(response);
  return response;
}

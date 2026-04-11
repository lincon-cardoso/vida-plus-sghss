import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

import {
  AUTH_TOKEN_EXPIRATION,
  setAuthCookie,
  getActiveSessionFromToken,
  getAuthTokenFromRequest,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildNoContentResponse() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export async function POST(request: Request) {
  const session = await getActiveSessionFromToken(
    getAuthTokenFromRequest(request),
  );

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const refreshedToken = signToken(
    { email: session.token.email, role: session.token.role },
    { expiresIn: AUTH_TOKEN_EXPIRATION, jwtid: session.session.id },
  );

  const response = buildNoContentResponse();
  setAuthCookie(response, refreshedToken);
  return response;
}

import type { AppRole } from "@/lib/roles";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyToken, type TokenPayload } from "@/lib/auth";

export const AUTH_COOKIE_NAME = "token";
export const AUTH_TOKEN_EXPIRATION = "8h";
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;
export const SESSION_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export type ActiveSession = {
  token: TokenPayload;
  user: {
    id: string;
    email: string;
    role: AppRole;
    isActive: boolean;
    lastLoginAt: Date | null;
  };
  session: {
    id: string;
    lastSeenAt: Date;
    revokedAt: Date | null;
    isCurrent: boolean;
  };
};

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${name}=`)) {
      continue;
    }

    const value = trimmed.slice(name.length + 1).trim();
    if (!value) {
      return undefined;
    }

    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return undefined;
}

export function getAuthTokenFromRequest(request: Request) {
  return getCookieValue(request.headers.get("cookie"), AUTH_COOKIE_NAME);
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}

function isSessionExpired(lastSeenAt: Date, now: Date) {
  return now.getTime() - lastSeenAt.getTime() > SESSION_INACTIVITY_TIMEOUT_MS;
}

async function revokeSessionById(sessionId: string, now: Date) {
  await prisma.userSession.updateMany({
    where: { id: sessionId },
    data: {
      revokedAt: now,
      isCurrent: false,
    },
  });
}

export async function getActiveSessionFromToken(
  token: string | undefined,
  now = new Date(),
): Promise<ActiveSession | null> {
  if (!token) {
    return null;
  }

  let payload: TokenPayload;
  try {
    payload = verifyToken(token);
  } catch {
    return null;
  }

  if (!payload.jti) {
    return null;
  }

  const session = await prisma.userSession.findUnique({
    where: { id: payload.jti },
    select: {
      id: true,
      lastSeenAt: true,
      revokedAt: true,
      isCurrent: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  const tokenMatchesSession =
    session.user.email === payload.email && session.user.role === payload.role;
  const sessionIsActive =
    session.revokedAt === null &&
    session.isCurrent &&
    session.user.isActive &&
    tokenMatchesSession &&
    !isSessionExpired(session.lastSeenAt, now);

  if (!sessionIsActive) {
    await revokeSessionById(session.id, now);
    return null;
  }

  const touchResult = await prisma.userSession.updateMany({
    where: {
      id: session.id,
      revokedAt: null,
      isCurrent: true,
    },
    data: {
      lastSeenAt: now,
    },
  });

  if (touchResult.count === 0) {
    return null;
  }

  return {
    token: payload,
    user: session.user,
    session: {
      ...session,
      lastSeenAt: now,
      revokedAt: null,
      isCurrent: true,
    },
  };
}

export async function revokeSessionFromToken(
  token: string | undefined,
  now = new Date(),
) {
  if (!token) {
    return false;
  }

  let payload: TokenPayload;
  try {
    payload = verifyToken(token);
  } catch {
    return false;
  }

  if (!payload.jti) {
    return false;
  }

  await revokeSessionById(payload.jti, now);
  return true;
}

import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { isAppRole } from "@/lib/roles";

const CORS_METHODS = "POST, OPTIONS";
const CORS_HEADERS = "Content-Type, Authorization";

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

export async function OPTIONS(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  if (!corsHeaders) {
    return NextResponse.json(
      { message: "Origem não permitida" },
      { status: 403 },
    );
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, senha, role } = body ?? {};

  // Validação mínima
  if (
    !email ||
    !senha ||
    !role ||
    typeof role !== "string" ||
    !isAppRole(role)
  ) {
    return withCors(
      NextResponse.json({ message: "Dados inválidos" }, { status: 400 }),
      request,
    );
  }

  // DEV: credenciais centralizadas (substituir em prod)
  const ok =
    email === process.env.DEV_EMAIL &&
    senha === process.env.DEV_SENHA &&
    isAppRole(role);

  if (!ok) {
    return withCors(
      NextResponse.json(
        { message: "Credenciais inválidas. Por favor, tente novamente." },
        { status: 401 },
      ),
      request,
    );
  }
  // Gerar token JWT
  const token = signToken({ email, role });

  // retorn json e seta cooke com token
  const response = NextResponse.json(
    { message: "Autenticado", role, email },
    { status: 200 },
  );

  // use secure em pmroducao

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
  };

  response.cookies.set("token", token, cookieOptions);

  return withCors(response, request);
}

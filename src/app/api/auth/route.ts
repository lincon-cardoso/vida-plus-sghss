import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { DEV_CREDENTIALS } from "@/lib/devCredentials";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, senha, role } = body ?? {};

  // Validação mínima
  if (
    !email ||
    !senha ||
    !role ||
    !["patient", "doctor", "admin"].includes(role)
  ) {
    return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
  }

  // DEV: credenciais centralizadas (substituir em prod)
  const ok =
    email === DEV_CREDENTIALS.email &&
    senha === DEV_CREDENTIALS.senha &&
    (role === "patient" || role === "doctor" || role === "admin");

  if (!ok) {
    return NextResponse.json(
      { message: "Credenciais inválidas. Por favor, tente novamente." },
      { status: 401 },
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

  return response;
}

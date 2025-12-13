import { NextResponse } from "next/server";

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

  // DEV: credenciais hardcoded (substituir em prod)
  const ok =
    email === "linkon789@gmail.com" &&
    senha === "link2502" &&
    role === "patient";

  if (!ok) {
    return NextResponse.json(
      { message: "Credenciais inválidas. Por favor, tente novamente." },
      { status: 401 }
    );
  }

  // Retornar objeto útil; defina token/ cookie se for testar autenticação
  return NextResponse.json({ message: "Autenticado", role }, { status: 200 });
}

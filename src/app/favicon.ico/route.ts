import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Redireciona /favicon.ico para o ícone existente em /icons/icons.png
  // Usa URL absoluta baseada no request para evitar erro de
  const destination = new URL("/icons/icons.png", request.url);
  return NextResponse.redirect(destination, 302);
}

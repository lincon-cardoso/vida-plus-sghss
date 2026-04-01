// Importas funcionalidades do Next.js para gerenciar cookies e redirecionamentos
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// Importa função para verificar e decodificar o token JWT
import { verifyToken } from "@/lib/auth";
// Importa funções auxiliares para validar roles e obter rotas de dashboard
import { getDashboardRoute, isAppRole } from "@/lib/roles";
// Importa tipo React para componentes filhos
import type { ReactNode } from "react";

// Componente layout assíncrono que protege rotas por role de usuário
export default async function RoleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ roles: string }>;
}) {
  // Extrai o role da URL (ex: /patient, /doctor, /admin)
  const { roles } = await params;

  // Obtém o token armazenado nos cookies do navegador
  const token = (await cookies()).get("token")?.value;

  // Se não houver token, redireciona para login
  if (!token) redirect("/login");

  // Declara variável para armazenar o payload decodificado do token
  let payload: ReturnType<typeof verifyToken>;

  // Tenta decodificar e validar o token JWT
  try {
    payload = verifyToken(token);
  } catch {
    // Se o token for inválido ou expirado, redireciona para login
    redirect("/login");
  }

  // Valida se: o role na URL é válido OU o role do usuário no token bate com o role na URL
  // Se não bater, redireciona para o dashboard correto do usuário
  if (!isAppRole(roles) || payload.role !== roles) {
    redirect(getDashboardRoute(payload.role));
  }

  // Se todas as validações passarem, renderiza o conteúdo da página filha
  return <>{children}</>;
}

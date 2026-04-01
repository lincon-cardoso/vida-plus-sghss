import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken, type TokenPayload } from "@/lib/auth";
import { isAppRole } from "@/lib/roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// FUNÇÃO: Handler GET para recuperar resumo do dashboard do paciente
export async function GET() {
  // PASSO 1: Extrair token dos cookies
  // Obtém o token JWT armazenado nos cookies do navegador para autenticação
  const token = (await cookies()).get("token")?.value;

  // VALIDAÇÃO 1: Verificar se token existe
  // Se não houver token, retorna erro 401 (Não autorizado)
  if (!token) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  // PASSO 2: Decodificar e validar o token JWT
  // Declara variável para armazenar o payload do token decodificado
  let payload: TokenPayload;

  try {
    // Verifica a assinatura e validade do token JWT
    payload = verifyToken(token);
  } catch {
    // Se o token for inválido ou expirado, retorna erro 401
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  // VALIDAÇÃO 2: Verificar se usuário tem role de paciente
  // Valida se a role existe na aplicação e se é especificamente "patient"
  // Impede acesso de outros tipos de usuários (admin, doctor, etc)
  if (!isAppRole(payload.role) || payload.role !== "patient") {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  // PASSO 3: Buscar dados do usuário no banco de dados
  // Recupera o usuário usando email do token e seleciona apenas o id
  // Isso garante que o usuário autenticado existe no sistema
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { id: true },
  });

  // VALIDAÇÃO 3: Verificar se usuário existe
  // Se o usuário não for encontrado no banco, retorna erro 401
  if (!user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  // PASSO 4: Calcular datas para filtros
  // Obtém data/hora atual e data de 30 dias atrás
  // Essas datas são usadas para filtrar consultas recentes ou ativas
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // PASSO 5: Executar 3 queries em paralelo para recuperar estatísticas
  // Usa Promise.all para otimizar e executar as queries simultaneamente
  const [upcomingAppointments, examResults, activePrescriptions] =
    await Promise.all([
      // QUERY 1: Contar consultas futuras agendadas
      // Filtra por: paciente do usuário, data >= agora, status ativo/agendado
      prisma.appointment.count({
        where: {
          patientId: user.id,
          scheduledAt: { gte: now },
          status: {
            in: ["scheduled", "checked_in", "in_service"],
          },
        },
      }),
      // QUERY 2: Contar resultados de exames do paciente
      // Filtra por: paciente do usuário e tipo de registro "exam"
      // Retorna total histórico de exames, sem limite de data
      prisma.clinicalRecordEntry.count({
        where: {
          patientId: user.id,
          kind: "exam",
        },
      }),
      // QUERY 3: Contar prescrições ativas (últimos 30 dias)
      // Filtra por: paciente do usuário, tipo "medication", data >= 30 dias atrás
      // Isso identifica medicamentos prescritos recentemente e ainda em uso
      prisma.clinicalRecordEntry.count({
        where: {
          patientId: user.id,
          kind: "medication",
          occurredAt: { gte: thirtyDaysAgo },
        },
      }),
    ]);

  // PASSO 6: Retornar resposta JSON com o resumo
  // Envia os 3 contadores como objeto resumo para o frontend
  // Status 200 (sucesso) é retornado implicitamente
  return NextResponse.json({
    summary: {
      upcomingAppointments,
      examResults,
      activePrescriptions,
    },
  });
}

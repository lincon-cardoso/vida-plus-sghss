import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getActiveSessionFromToken,
  getAuthTokenFromRequest,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// FUNÇÃO: Handler GET para recuperar resumo do dashboard do paciente
export async function GET(request: Request) {
  const session = await getActiveSessionFromToken(
    getAuthTokenFromRequest(request),
  );

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  if (session.user.role !== "patient") {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const userId = session.user.id;

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
          patientId: userId,
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
          patientId: userId,
          kind: "exam",
        },
      }),
      // QUERY 3: Contar prescrições ativas (últimos 30 dias)
      // Filtra por: paciente do usuário, tipo "medication", data >= 30 dias atrás
      // Isso identifica medicamentos prescritos recentemente e ainda em uso
      prisma.clinicalRecordEntry.count({
        where: {
          patientId: userId,
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

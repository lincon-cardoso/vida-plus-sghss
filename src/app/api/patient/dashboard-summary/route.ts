import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken, type TokenPayload } from "@/lib/auth";
import { isAppRole } from "@/lib/roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  let payload: TokenPayload;

  try {
    payload = verifyToken(token);
  } catch {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  if (!isAppRole(payload.role) || payload.role !== "patient") {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [upcomingAppointments, examResults, activePrescriptions] =
    await Promise.all([
      prisma.appointment.count({
        where: {
          patientId: user.id,
          scheduledAt: { gte: now },
          status: {
            in: ["scheduled", "checked_in", "in_service"],
          },
        },
      }),
      prisma.clinicalRecordEntry.count({
        where: {
          patientId: user.id,
          kind: "exam",
        },
      }),
      prisma.clinicalRecordEntry.count({
        where: {
          patientId: user.id,
          kind: "medication",
          occurredAt: { gte: thirtyDaysAgo },
        },
      }),
    ]);

  return NextResponse.json({
    summary: {
      upcomingAppointments,
      examResults,
      activePrescriptions,
    },
  });
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getDashboardImplementation,
  getDashboardRoute,
  isAppRole,
} from "@/lib/roles";
import { AUTH_COOKIE_NAME, getActiveSessionFromToken } from "@/lib/session";
import PatientDashboard from "./patient/PatientDashboard";
import MedicDashboard from "./medic/MedicDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;

  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  const session = await getActiveSessionFromToken(token);

  if (!session) {
    redirect("/login");
  }

  // Mantemos aqui a mesma validação do layout para redundância.
  if (!isAppRole(roles) || session.user.role !== roles) {
    redirect(getDashboardRoute(session.user.role));
  }

  const dashboardImplementation = getDashboardImplementation(session.user.role);

  if (dashboardImplementation === "patient") {
    return <PatientDashboard payload={session.token} />;
  }

  if (dashboardImplementation === "medic") {
    return <MedicDashboard payload={session.token} />;
  }

  if (dashboardImplementation === "admin") {
    return <AdminDashboard payload={session.token} />;
  }

  redirect(getDashboardRoute(session.user.role));
}

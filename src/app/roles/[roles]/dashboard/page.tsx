import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getDashboardImplementation,
  getDashboardRoute,
  isAppRole,
} from "@/lib/roles";
import PatientDashboard from "./patient/PatientDashboard";
import MedicDashboard from "./medic/MedicDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;

  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  let payload;
  try {
    payload = verifyToken(token);

    // Mantemos aqui a mesma validação do layout para redundância.
    if (!isAppRole(roles) || payload.role !== roles) {
      redirect(getDashboardRoute(payload.role));
    }
  } catch {
    redirect("/login");
  }

  const dashboardImplementation = getDashboardImplementation(payload.role);

  if (dashboardImplementation === "patient") {
    return <PatientDashboard payload={payload} />;
  }

  if (dashboardImplementation === "medic") {
    return <MedicDashboard payload={payload} />;
  }

  if (dashboardImplementation === "admin") {
    return <AdminDashboard payload={payload} />;
  }

  redirect(getDashboardRoute(payload.role));
}

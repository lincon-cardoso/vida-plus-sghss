import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
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

    // Nota: layout.tsx já valida role !== roles, mas mantido aqui para redundância e clareza
    if (payload.role !== roles) {
      redirect(`/roles/${payload.role}/dashboard`);
    }
  } catch {
    redirect("/login");
  }

  if (payload.role === "patient") {
    return <PatientDashboard payload={payload} />;
  }

  if (payload.role === "doctor") {
    return <MedicDashboard payload={payload} />;
  }

  if (payload.role === "admin") {
    return <AdminDashboard payload={payload} />;
  }

  // Fallback para roles não suportadas - redireciona para dashboard apropriado
  redirect(`/roles/${payload.role}/dashboard`);
}

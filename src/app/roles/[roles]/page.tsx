import { redirect } from "next/navigation";
import { getDashboardRoute, isAppRole } from "@/lib/roles";

export default async function RolesIndex({
  params,
}: {
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;
  if (!isAppRole(roles)) {
    redirect("/login");
  }

  redirect(getDashboardRoute(roles));
}

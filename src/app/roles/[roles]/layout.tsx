import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { getDashboardRoute, isAppRole } from "@/lib/roles";
import type { ReactNode } from "react";

export default async function RoleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  let payload: ReturnType<typeof verifyToken>;

  try {
    payload = verifyToken(token);
  } catch {
    redirect("/login");
  }

  // A URL publica segue o contrato canônico do auth (patient|doctor|admin).
  if (!isAppRole(roles) || payload.role !== roles) {
    redirect(getDashboardRoute(payload.role));
  }

  return <>{children}</>;
}

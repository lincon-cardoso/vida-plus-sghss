import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardRoute, isAppRole } from "@/lib/roles";
import { AUTH_COOKIE_NAME, getActiveSessionFromToken } from "@/lib/session";
import SessionLifecycle from "@/components/auth/SessionLifecycle";
import type { ReactNode } from "react";

export default async function RoleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;

  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  const session = await getActiveSessionFromToken(token);

  if (!session) {
    redirect("/login");
  }

  if (!isAppRole(roles) || session.user.role !== roles) {
    redirect(getDashboardRoute(session.user.role));
  }

  return (
    <>
      <SessionLifecycle />
      {children}
    </>
  );
}

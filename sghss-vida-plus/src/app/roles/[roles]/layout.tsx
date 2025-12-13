import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function RoleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { roles: string };
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  let payload: ReturnType<typeof verifyToken>;

  try {
    payload = verifyToken(token);
  } catch {
    redirect("/login");
  }

  // impede acesso roles com token de paciente

  if (payload.role !== params.roles) {
    redirect(`/roles/${payload.role}/dashboard`);
  }

  return <>{children}</>;
}

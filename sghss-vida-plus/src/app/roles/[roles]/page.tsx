import { redirect } from "next/navigation";

export default async function RolesIndex({
  params,
}: {
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;
  redirect(`/roles/${roles}/dashboard`);
}

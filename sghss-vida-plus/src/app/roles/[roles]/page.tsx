import { redirect } from "next/navigation";

export default async function RolesIndex({
  params,
}: {
  params: { roles: string };
}) {
  redirect(`/roles/${params.roles}/dashboard`);
}

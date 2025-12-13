import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: { roles: string };
}) {
  // Com layout.tsx isso “já estaria protegido”.
  // Eu ainda leio o token aqui só pra conseguir pegar email/role e renderizar.
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);

  if (payload.role !== params.roles) {
    redirect(`/roles/${payload.role}/dashboard`);
  }

  // EXEMPLO DE DASHBOARD DO PACIENTE
  if (payload.role === "patient") {
    return (
      <main style={{ padding: 24 }}>
        <h1>Dashboard do Paciente</h1>
        <p>Bem-vindo(a), {payload.email}</p>

        <section style={{ marginTop: 16 }}>
          <h2>Atalhos</h2>
          <ul>
            <li>Minhas consultas</li>
            <li>Meus exames</li>
            <li>Meus medicamentos</li>
            <li>Meus dados</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Próximos passos</h2>
          <p>
            Aqui você pode listar a próxima consulta e alertas (quando tiver o
            banco e as queries).
          </p>
        </section>
      </main>
    );
  }

  // fallback simples (depois você cria dashboards específicos)
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard ({payload.role})</h1>
      <p>Bem-vindo(a), {payload.email}</p>
      <p>Crie aqui o dashboard específico para este perfil.</p>
    </main>
  );
}

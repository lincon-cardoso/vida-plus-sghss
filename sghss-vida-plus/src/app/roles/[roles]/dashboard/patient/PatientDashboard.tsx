import type { TokenPayload } from "@/lib/auth";

export default function PatientDashboard({
  payload,
}: {
  payload: TokenPayload;
}) {
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

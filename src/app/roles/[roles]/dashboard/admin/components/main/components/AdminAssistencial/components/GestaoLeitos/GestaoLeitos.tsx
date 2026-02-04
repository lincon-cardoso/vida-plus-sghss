import styles from "./GestaoLeitos.module.scss";

/**
 * Mock acessível de Gestão de Leitos — tabela de exemplo para demonstração.
 * Usar como referência para implementação futura.
 */
export default function GestaoLeitos() {
  const rows = [
    {
      leito: "A-101",
      paciente: "João Silva",
      status: "Ocupado",
      enfermaria: "Pediatria",
    },
    {
      leito: "A-102",
      paciente: "—",
      status: "Disponível",
      enfermaria: "Pediatria",
    },
    {
      leito: "B-201",
      paciente: "Maria Santos",
      status: "Em limpeza",
      enfermaria: "Adulto",
    },
  ];

  return (
    <section className={styles.root} aria-labelledby="gestao-leitos-title">
      <h3 id="gestao-leitos-title" className={styles.title}>
        Gestão de Leitos
      </h3>

      <div
        className={styles.tableWrap}
        role="region"
        aria-label="Tabela de leitos"
      >
        <table className={styles.table}>
          <caption className={styles.caption}>
            Lista de leitos e status (exemplo)
          </caption>
          <thead>
            <tr>
              <th scope="col">Leito</th>
              <th scope="col">Paciente</th>
              <th scope="col">Status</th>
              <th scope="col">Enfermaria</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.leito}>
                <td>{r.leito}</td>
                <td>{r.paciente}</td>
                <td>{r.status}</td>
                <td>{r.enfermaria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

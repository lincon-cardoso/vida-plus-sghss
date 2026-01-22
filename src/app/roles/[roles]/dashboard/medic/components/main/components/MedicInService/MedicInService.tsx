import styles from "./MedicInService.module.scss";
import type { InServicePatient, HistoryItem } from "./data";
import { inServicePatient, recentHistory } from "./data";

/**
 * MedicInService
 * Exibe o paciente atualmente em atendimento com visual semelhante ao mock.
 */
export default function MedicInService() {
  const patient: InServicePatient = inServicePatient;

  return (
    <div className={styles.root}>
      <div className={`container ${styles.wideContainer}`}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <div className={styles.avatar} aria-hidden="true">
                {patient.name.charAt(0)}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{patient.name}</div>
                <div className={styles.smallRow}>
                  <span className={styles.badge}>
                    {patient.gender} • {patient.age} anos
                  </span>
                  <span className={styles.cpf}>CPF: {patient.cpf}</span>
                </div>

                {patient.allergies.length > 0 && (
                  <div className={styles.allergies}>
                    <span className={styles.allergyLabel}>Alergias:</span>
                    {patient.allergies.map((a: string) => (
                      <span key={a} className={styles.allergy}>
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.cancel}>
                Cancelar
              </button>
              <button type="button" className={styles.complete}>
                Concluir Atendimento
              </button>
            </div>
          </header>

          <div className={styles.body}>
            <aside className={styles.left}>
              <section className={styles.panel}>
                <h3 className={styles.panelTitle}>Sinais Vitais (Triagem)</h3>
                <div className={styles.empty}>Sem dados de triagem</div>
              </section>

              <section className={styles.panel}>
                <h3 className={styles.panelTitle}>Histórico Recente</h3>
                <ul className={styles.historyList}>
                  {recentHistory.map((h: HistoryItem) => {
                    const statusClass = `${styles.statusBadge} ${h.status === "Pendente" ? styles.statusWarning : ""} ${h.status === "Pronto" ? styles.statusSuccess : ""}`;
                    return (
                      <li key={h.id} className={styles.historyItem}>
                        <div className={styles.historyDate}>{h.date}</div>
                        <div className={styles.historyTitle}>{h.title}</div>
                        <div className={styles.historyMeta}>
                          <span className={statusClass}>{h.status}</span>
                        </div>
                        {h.summary && (
                          <div className={styles.historySummary}>
                            {h.summary}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            </aside>

            <main className={styles.main}>
              <section className={styles.formBox}>
                <h4 className={styles.formTitle}>Subjetivo (Anamnese)</h4>
                <div className={styles.textarea}>
                  Descreva a queixa principal, história da moléstia atual,
                  histórico...
                </div>
              </section>

              <section className={styles.formBox}>
                <h4 className={styles.formTitle}>Objetivo (Exame Físico)</h4>
                <div className={styles.textarea}>
                  Descreva os achados do exame físico...
                </div>
              </section>

              <section className={styles.formBox}>
                <h4 className={styles.formTitle}>Avaliação (Diagnóstico)</h4>
                <div className={styles.textarea}>
                  Hipóteses diagnósticas e conclusões...
                </div>
              </section>

              <section className={styles.formBox}>
                <h4 className={styles.formTitle}>Plano (Conduta)</h4>
                <div className={styles.textarea}>
                  Orientações, encaminhamentos e plano terapêutico...
                </div>
              </section>
            </main>

            <aside className={styles.right}>
              <nav className={styles.tabs} aria-label="Tabs">
                <button
                  className={`${styles.tab} ${styles.active}`}
                  type="button"
                >
                  Receita
                </button>
                <button className={styles.tab} type="button">
                  Exames
                </button>
                <button className={styles.tab} type="button">
                  Diagnóstico
                </button>
              </nav>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Adicionar Medicamento</h4>
                <div className={styles.addPrescription}>
                  <input
                    className={styles.input}
                    placeholder="Nome do medicamento..."
                    aria-label="Nome do medicamento"
                  />
                  <button
                    className={styles.addBtn}
                    type="button"
                    aria-label="Adicionar"
                  >
                    +
                  </button>
                </div>

                <div className={styles.empty}>Nenhum medicamento prescrito</div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

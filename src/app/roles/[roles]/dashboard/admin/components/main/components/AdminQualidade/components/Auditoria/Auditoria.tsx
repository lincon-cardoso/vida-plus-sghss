import type { LucideIcon } from "lucide-react";
import styles from "./Auditoria.module.scss";
import {
  AUDIT_CASES,
  AUDIT_SUMMARY_CARDS,
  type AuditSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: AuditSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.iconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>
      <div>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

export default function Auditoria() {
  return (
    <section
      className={styles.root}
      aria-labelledby="qualidade-auditoria-title"
    >
      <header className={styles.header}>
        <h2 id="qualidade-auditoria-title" className={styles.title}>
          Auditoria Médica
        </h2>
        <p className={styles.subtitle}>Análise e contestação de glosas</p>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo da auditoria">
        {AUDIT_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Casos em Auditoria</h3>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prioridade</th>
                <th>Paciente</th>
                <th>Convênio</th>
                <th>Período</th>
                <th>Faturado</th>
                <th>Glosa</th>
                <th>Motivo</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_CASES.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <span
                      className={`${styles.priority} ${item.priority === "Alta" ? styles.priorityAlta : styles.priorityMedia}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td>{item.patient}</td>
                  <td>{item.insurance}</td>
                  <td>{item.period}</td>
                  <td>{item.billed}</td>
                  <td className={styles.glosa}>{item.glosa}</td>
                  <td>{item.reason}</td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[`status${item.statusTone.charAt(0).toUpperCase()}${item.statusTone.slice(1)}`]}`}
                    >
                      {item.statusLabel}
                    </span>
                  </td>
                  <td>
                    <button type="button" className={styles.actionButton}>
                      Analisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

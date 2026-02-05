import { HeartHandshake, Activity } from "lucide-react";
import styles from "./Triagem.module.scss";
import { TRIAGE_LEVELS } from "./data";

type TriageLevel = (typeof TRIAGE_LEVELS)[number];

interface TriagemProps {
  /** Número de pacientes aguardando triagem */
  waitingCount?: number;
}

/**
 * Triagem — Protocolo Manchester
 * Exibe níveis de triagem e lista de pacientes aguardando.
 */
export default function Triagem({ waitingCount = 0 }: TriagemProps) {
  return (
    <section className={styles.root} aria-labelledby="triagem-title">
      <div className={styles.headerRow}>
        <h2 id="triagem-title" className={styles.title}>
          <span className={styles.titleIconWrap} aria-hidden>
            <HeartHandshake size={20} className={styles.titleIcon} />
          </span>
          Triagem - Protocolo Manchester
        </h2>
        <p className={styles.subtitle}>
          Classificação de risco e sinais vitais
        </p>
      </div>

      <div className={styles.infoBoxes}>
        {TRIAGE_LEVELS.map((l: TriageLevel) => (
          <div key={l.key} className={`${styles.infoBox} ${styles[l.key]}`}>
            <div className={styles.infoBoxTop}>
              <div className={styles.infoNumber}>{l.count}</div>
            </div>
            <div className={styles.infoLabel}>
              <div className={styles.infoLabelTitle}>{l.label}</div>
              <div className={styles.infoLabelSub}>{l.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={styles.card}
        role="region"
        aria-label="Aguardando triagem"
      >
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            Aguardando Triagem ({waitingCount})
          </h3>
          <p className={styles.cardSubtitle}>
            Pacientes que fizeram check-in na recepção
          </p>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.emptyState}>
            <Activity size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              Nenhum paciente aguardando triagem
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

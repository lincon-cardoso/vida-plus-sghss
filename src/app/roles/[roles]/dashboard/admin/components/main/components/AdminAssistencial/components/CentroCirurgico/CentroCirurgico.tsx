import type { LucideIcon } from "lucide-react";
import styles from "./CentroCirurgico.module.scss";
import {
  SURGERY_AGENDA,
  SURGICAL_SUMMARY,
  type SurgeryItem,
  type SurgicalSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: SurgicalSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.summaryContent}>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoBox}>
      <span className={styles.infoLabel}>{label}</span>
      <strong className={styles.infoValue}>{value}</strong>
    </div>
  );
}

function StatusBadge({ surgery }: { surgery: SurgeryItem }) {
  return (
    <span className={`${styles.statusBadge} ${styles[surgery.status]}`}>
      {surgery.statusLabel}
    </span>
  );
}

export default function CentroCirurgico() {
  return (
    <section className={styles.root} aria-labelledby="centro-cirurgico-title">
      <header className={styles.header}>
        <div>
          <h2 id="centro-cirurgico-title" className={styles.title}>
            Centro Cirúrgico
          </h2>
          <p className={styles.subtitle}>Gestão de cirurgias e salas</p>
        </div>
      </header>

      <div
        className={styles.summaryGrid}
        aria-label="Resumo do centro cirúrgico"
      >
        {SURGICAL_SUMMARY.map((card) => (
          <SummaryCard key={card.key} card={card} />
        ))}
      </div>

      <section
        className={styles.panel}
        aria-labelledby="agenda-cirurgica-title"
      >
        <div className={styles.panelHeader}>
          <h3 id="agenda-cirurgica-title" className={styles.panelTitle}>
            Agenda Cirúrgica
          </h3>
        </div>

        <div className={styles.scheduleList}>
          {SURGERY_AGENDA.map((surgery) => (
            <article key={surgery.id} className={styles.surgeryCard}>
              <div className={styles.surgeryHeader}>
                <div className={styles.surgeryHeading}>
                  <div className={styles.titleLine}>
                    <StatusBadge surgery={surgery} />
                    <strong className={styles.surgeryTitle}>
                      {surgery.title}
                    </strong>
                  </div>

                  <div className={styles.metaLine}>
                    <span>{surgery.time}</span>
                    <span>•</span>
                    <span>{surgery.room}</span>
                    <span>•</span>
                    <span>Duração: {surgery.duration}</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <InfoBox label="Paciente" value={surgery.patient} />
                <InfoBox label="Cirurgião" value={surgery.surgeon} />
                <InfoBox label="Anestesista" value={surgery.anesthetist} />
              </div>

              <div className={styles.actionsRow}>
                <button type="button" className={styles.primaryButton}>
                  Checklist OMS
                </button>
                <button type="button" className={styles.secondaryButton}>
                  Ver Prontuário
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

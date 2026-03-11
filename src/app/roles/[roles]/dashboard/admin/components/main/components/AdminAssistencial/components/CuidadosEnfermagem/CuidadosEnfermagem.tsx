import {
  Activity,
  BedSingle,
  Clock,
  Droplet,
  Heart,
  Plus,
  Thermometer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./CuidadosEnfermagem.module.scss";
import {
  NURSING_RECORDS,
  NURSING_SUMMARY_CARDS,
  type NursingRecord,
  type NursingSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: NursingSummaryCard }) {
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

function VitalCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.vitalCard}>
      <div className={styles.vitalHeader}>
        <Icon size={16} className={styles.vitalIcon} />
        <span className={styles.vitalLabel}>{label}</span>
      </div>
      <strong className={styles.vitalValue}>{value}</strong>
    </div>
  );
}

function StatusBadge({ record }: { record: NursingRecord }) {
  return (
    <span
      className={`${styles.statusBadge} ${styles[record.status]}`}
      aria-label={`Status ${record.statusLabel}`}
    >
      {record.statusLabel}
    </span>
  );
}

export default function CuidadosEnfermagem() {
  return (
    <section
      className={styles.root}
      aria-labelledby="cuidados-enfermagem-title"
    >
      <header className={styles.header}>
        <div>
          <h2 id="cuidados-enfermagem-title" className={styles.title}>
            Cuidados de Enfermagem
          </h2>
          <p className={styles.subtitle}>
            Registro e acompanhamento dos cuidados prestados aos pacientes
          </p>
        </div>

        <button type="button" className={styles.primaryButton}>
          <Plus size={18} aria-hidden={true} />
          Novo Registro
        </button>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo de enfermagem">
        {NURSING_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.key} card={card} />
        ))}
      </div>

      <section className={styles.panel} aria-labelledby="registros-cuidados">
        <div className={styles.panelHeader}>
          <h3 id="registros-cuidados" className={styles.panelTitle}>
            Registros de Cuidados
          </h3>
        </div>

        <div className={styles.recordsList}>
          {NURSING_RECORDS.map((record) => (
            <article
              key={record.id}
              className={`${styles.recordCard} ${styles[record.status + "Card"]}`}
            >
              <div className={styles.recordHeader}>
                <div className={styles.recordHeading}>
                  <div className={styles.patientLine}>
                    <BedSingle size={16} className={styles.recordLeadIcon} />
                    <strong className={styles.recordTitle}>
                      {record.bed} • {record.patientName}
                    </strong>
                    <StatusBadge record={record} />
                  </div>

                  <div className={styles.metaLine}>
                    <Clock size={14} className={styles.metaIcon} />
                    <span>{record.recordedAt}</span>
                    <span>•</span>
                    <span>{record.nurse}</span>
                  </div>
                </div>

                <button type="button" className={styles.secondaryButton}>
                  Ver Detalhes
                </button>
              </div>

              <div className={styles.vitalsGrid}>
                <VitalCard
                  icon={Thermometer}
                  label="Temp."
                  value={record.temperature}
                />
                <VitalCard
                  icon={Activity}
                  label="PA"
                  value={record.bloodPressure}
                />
                <VitalCard icon={Heart} label="FC" value={record.heartRate} />
                <VitalCard
                  icon={Droplet}
                  label="SpO2"
                  value={record.oxygenSaturation}
                />
              </div>

              <div className={styles.observationsBox}>
                <span className={styles.observationsLabel}>Observações:</span>
                <p className={styles.observationsText}>{record.observations}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

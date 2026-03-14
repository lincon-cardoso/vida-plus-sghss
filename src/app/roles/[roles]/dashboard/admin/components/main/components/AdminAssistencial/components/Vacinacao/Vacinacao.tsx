import { Calendar, CheckCircle, Clock3, Download, Syringe } from "lucide-react";
import styles from "./Vacinacao.module.scss";
import { VACCINATION_RECORDS, type VaccinationRecord } from "./data";

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function SummaryCard({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  tone: "success" | "info" | "danger";
}) {
  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[tone]}`}>{icon}</div>

      <div className={styles.summaryContent}>
        <strong className={styles.summaryValue}>{value}</strong>
        <span className={styles.summaryLabel}>{label}</span>
      </div>
    </article>
  );
}

function StatusBadge({ record }: { record: VaccinationRecord }) {
  return (
    <span className={`${styles.statusBadge} ${styles[record.status]}`}>
      {record.statusLabel}
    </span>
  );
}

export default function Vacinacao() {
  const appliedCount = VACCINATION_RECORDS.filter(
    (record) => record.status === "aplicada",
  ).length;
  const upcomingCount = VACCINATION_RECORDS.filter(
    (record) => record.status === "agendada",
  ).length;
  const overdueCount = VACCINATION_RECORDS.filter(
    (record) => record.status === "atrasada",
  ).length;

  return (
    <section className={styles.root} aria-labelledby="vacinacao-title">
      <header className={styles.header}>
        <div>
          <h2 id="vacinacao-title" className={styles.title}>
            Cartão de Vacinação
          </h2>
          <p className={styles.subtitle}>Histórico e agendamento de vacinas</p>
        </div>

        <button type="button" className={styles.primaryButton}>
          <Download size={18} aria-hidden={true} />
          Baixar Certificado
        </button>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo de vacinação">
        <SummaryCard
          icon={<CheckCircle size={22} />}
          value={appliedCount}
          label="Vacinas Aplicadas"
          tone="success"
        />
        <SummaryCard
          icon={<Calendar size={22} />}
          value={upcomingCount}
          label="Próximas Doses"
          tone="info"
        />
        <SummaryCard
          icon={<Clock3 size={22} />}
          value={overdueCount}
          label="Atrasadas"
          tone="danger"
        />
      </div>

      <section className={styles.panel} aria-labelledby="historico-vacinacao">
        <div className={styles.panelHeader}>
          <h3 id="historico-vacinacao" className={styles.panelTitle}>
            Histórico de Vacinação
          </h3>
        </div>

        <div className={styles.recordsList}>
          {VACCINATION_RECORDS.map((record) => (
            <article key={record.id} className={styles.recordCard}>
              <div className={styles.recordHeader}>
                <div className={styles.recordLead}>
                  <div className={styles.recordIconBox} aria-hidden={true}>
                    <Syringe size={16} />
                  </div>

                  <div>
                    <div className={styles.recordTitleRow}>
                      <strong className={styles.recordTitle}>
                        {record.vaccineName}
                        {record.manufacturer ? ` (${record.manufacturer})` : ""}
                      </strong>
                      <StatusBadge record={record} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.metaList}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Dose:</span>
                  <span className={styles.metaValue}>{record.doseLabel}</span>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Data:</span>
                  <span className={styles.metaValue}>
                    {formatDate(record.date)}
                  </span>
                </div>

                {record.batch ? (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Lote:</span>
                    <span className={styles.metaValue}>{record.batch}</span>
                  </div>
                ) : null}

                {record.nextDoseDate ? (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Próxima dose:</span>
                    <span className={styles.metaValue}>
                      {formatDate(record.nextDoseDate)}
                    </span>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

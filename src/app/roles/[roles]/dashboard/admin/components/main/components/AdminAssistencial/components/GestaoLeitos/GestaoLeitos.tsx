import styles from "./GestaoLeitos.module.scss";
import beds, { Bed } from "./data";
import {
  Bed as BedIcon,
  Users,
  CheckCircle,
  TrendingUp,
  Activity,
  Lock,
  Grid,
} from "lucide-react";

function computeMetrics(list: Bed[]) {
  const total = list.length;
  const occupied = list.filter((b) => b.status === "Ocupado").length;
  const available = list.filter((b) => b.status === "Disponível").length;
  const occupancy =
    total === 0 ? "0.0%" : `${((occupied / total) * 100).toFixed(1)}%`;
  return { total, occupied, available, occupancy };
}

export default function GestaoLeitos() {
  const metrics = computeMetrics(beds);

  return (
    <section className={styles.root} aria-labelledby="gestao-leitos-title">
      <header className={styles.header}>
        <div>
          <h3 id="gestao-leitos-title" className={styles.title}>
            Gestão de Leitos
          </h3>
          <p className={styles.subtitle}>Monitore ocupação e internações</p>
        </div>
      </header>

      {/* Metrics */}
      <div
        className={styles.metrics}
        role="list"
        aria-label="Métricas de Ocupação"
      >
        <div
          className={`${styles.metricCard} ${styles.metricCardBed}`}
          role="listitem"
        >
          <div className={styles.metricIcon}>
            <BedIcon size={20} />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{metrics.total}</div>
            <div className={styles.metricLabel}>Total de Leitos</div>
          </div>
        </div>

        <div
          className={`${styles.metricCard} ${styles.metricCardUsers}`}
          role="listitem"
        >
          <div className={styles.metricIcon}>
            <Users size={20} />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{metrics.occupied}</div>
            <div className={styles.metricLabel}>Ocupados</div>
          </div>
        </div>

        <div
          className={`${styles.metricCard} ${styles.metricCardCheck}`}
          role="listitem"
        >
          <div className={styles.metricIcon}>
            <CheckCircle size={20} />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{metrics.available}</div>
            <div className={styles.metricLabel}>Disponíveis</div>
          </div>
        </div>

        <div
          className={`${styles.metricCard} ${styles.metricCardTrend}`}
          role="listitem"
        >
          <div className={styles.metricIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{metrics.occupancy}</div>
            <div className={styles.metricLabel}>Taxa de Ocupação</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className={styles.filters}
        role="toolbar"
        aria-label="Filtros de setores"
      >
        <button className={`${styles.pill} ${styles.pillActive}`}>
          <Grid size={14} />
          <span>Todos os Setores</span>
        </button>
        <button className={styles.pill}>
          <BedIcon size={14} />
          <span>UTI</span>
        </button>
        <button className={styles.pill}>
          <Activity size={14} />
          <span>Semi-Intensivo</span>
        </button>
        <button className={styles.pill}>
          <Users size={14} />
          <span>Enfermaria</span>
        </button>
        <button className={styles.pill}>
          <Lock size={14} />
          <span>Isolamento</span>
        </button>
      </div>

      {/* Grid of beds */}
      <div className={styles.grid}>
        {beds.map((b) => (
          <article
            key={b.id}
            className={styles.card}
            aria-labelledby={`${b.id}-label`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <span
                  className={`${styles.leitoBadge} ${styles[`leitoBadge_${b.badgeColor ?? "default"}`]}`}
                >
                  {b.id}
                </span>
                <span className={styles.sectorLabel}>{b.sector}</span>
              </div>
              <span
                className={`${styles.statusBadge} ${styles[`status_${b.badgeColor ?? "default"}`]}`}
              >
                {b.status}
              </span>
            </div>

            <div className={styles.cardBody}>
              {b.patient ? (
                <div className={styles.patientBox}>
                  <div className={styles.patientHeader}>
                    <strong className={styles.patientName}>
                      {b.patient.name}
                    </strong>
                    {b.patient.age ? (
                      <span className={styles.patientAge}>
                        {b.patient.age} anos
                      </span>
                    ) : null}
                  </div>
                  <ul className={styles.patientDetails}>
                    {b.patient.internacao ? (
                      <li>
                        <strong>Internação:</strong> {b.patient.internacao}
                      </li>
                    ) : null}
                    {b.patient.diagnostico ? (
                      <li>
                        <strong>Diagnóstico:</strong> {b.patient.diagnostico}
                      </li>
                    ) : null}
                    {b.patient.medico ? (
                      <li>
                        <strong>Médico:</strong> {b.patient.medico}
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : (
                <div className={styles.emptyState} aria-hidden>
                  <BedIcon size={36} className={styles.emptyIcon} />
                  <div className={styles.emptyText}>
                    {b.status === "Em Higienização"
                      ? "Em Higienização"
                      : "Leito Disponível"}
                  </div>

                  {b.status !== "Em Higienização" && (
                    <div className={styles.emptyActions}>
                      <button className={styles.primaryBtn}>
                        Internar Paciente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {b.patient && (
              <div className={styles.cardFooter}>
                <button className={styles.primaryBtn}>Ver Prontuário</button>
                <button className={styles.ghostBtn}>Alta</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

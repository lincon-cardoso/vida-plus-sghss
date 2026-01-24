import type { ReactElement } from "react";
import { Calendar, RotateCw } from "lucide-react";
import styles from "./MedicAgenda.module.scss";
import { shiftSchedule, shiftStats } from "./data";

/**
 * Componente de Escalas de Plantões.
 * Exibe estatísticas rápidas, seletor de data e turnos do dia.
 */
export default function MedicAgenda(): ReactElement {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>Escalas de Plantões</h2>
        <p className={styles.subtitle}>Gerencie a escala médica 24 horas</p>
      </header>

      <section
        className={styles.statsSection}
        aria-label="Indicadores da escala"
      >
        <div className={styles.statsGrid}>
          {shiftStats.map((stat) => (
            <article key={stat.id} className={styles.statCard}>
              <div
                className={`${styles.statIcon} ${styles[stat.iconVariant]}`}
                aria-hidden="true"
              >
                <stat.icon size={20} />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statTitle}>{stat.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dateSection} aria-label="Filtro por data">
        <div className={styles.dateCard}>
          <label htmlFor="shift-date" className={styles.dateLabel}>
            Selecionar Data:
          </label>
          <div className={styles.dateInputWrapper}>
            <input
              id="shift-date"
              className={styles.dateInput}
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <span className={styles.dateInputIcon} aria-hidden="true">
              <Calendar size={18} />
            </span>
          </div>
        </div>
      </section>

      <section className={styles.shiftsSection} aria-label="Turnos do dia">
        <div className={styles.shiftsGrid}>
          {shiftSchedule.shifts.map((shift) => (
            <article key={shift.id} className={styles.shiftCard}>
              <div
                className={`${styles.shiftBadge} ${styles[shift.badgeVariant]}`}
              >
                <span className={styles.shiftBadgeIcon} aria-hidden="true">
                  <shift.icon size={18} />
                </span>
                <div className={styles.shiftBadgeText}>
                  <span className={styles.shiftBadgeLabel}>{shift.label}</span>
                  <span className={styles.shiftBadgeTime}>{shift.time}</span>
                </div>
              </div>

              <div className={styles.shiftDetails}>
                <p className={styles.shiftDoctor}>{shift.doctorName}</p>
                <p className={styles.shiftSpecialty}>{shift.specialty}</p>
              </div>

              <span
                className={`${styles.shiftStatus} ${styles.statusConfirmed}`}
              >
                Confirmado
              </span>

              <button
                className={styles.refreshButton}
                type="button"
                aria-label={`Atualizar ${shift.label.toLowerCase()}`}
                title="Atualizar"
              >
                <RotateCw size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Visão Mensal (calendário simplificado) */}
      <section className={styles.monthSection} aria-label="Visão Mensal">
        <header className={styles.monthHeader}>
          <h3 className={styles.monthTitle}>Visão Mensal</h3>
        </header>

        <div className={styles.calendarWrapper}>
          <div className={styles.weekdayRow} role="row">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <div key={d} className={styles.weekdayCell}>
                {d}
              </div>
            ))}
          </div>

          <div className={styles.monthGrid} role="grid">
            {(() => {
              const now = new Date();
              const year = now.getFullYear();
              const month = now.getMonth();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const firstDay = new Date(year, month, 1).getDay();
              const cells: Array<number | null> = [];

              for (let i = 0; i < firstDay; i++) cells.push(null);
              for (let d = 1; d <= daysInMonth; d++) cells.push(d);

              return cells.map((day, idx) => (
                <div key={idx} className={styles.dayCell} role="gridcell">
                  {day ? (
                    <>
                      <div className={styles.dayNumber}>{day}</div>
                      <div className={styles.eventDots} aria-hidden="true">
                        <span className={`${styles.dot} ${styles.dotGreen}`} />
                        <span className={`${styles.dot} ${styles.dotBlue}`} />
                        <span className={`${styles.dot} ${styles.dotPurple}`} />
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyCell} />
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}

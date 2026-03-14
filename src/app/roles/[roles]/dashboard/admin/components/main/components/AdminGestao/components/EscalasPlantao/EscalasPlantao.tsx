"use client";

import type { LucideIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import styles from "./EscalasPlantao.module.scss";
import {
  DAILY_SHIFTS,
  MONTH_DAYS,
  MONTH_WEEKDAYS,
  SHIFT_SUMMARY_CARDS,
  type ShiftPeriod,
  type ShiftSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: ShiftSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.summaryContent}>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.title}</span>
      </div>
    </article>
  );
}

function ShiftCard({ shift }: { shift: ShiftPeriod }) {
  const ActionIcon = shift.actionIcon as LucideIcon;

  return (
    <article className={styles.shiftCard}>
      <div className={`${styles.shiftBadge} ${styles[shift.tone]}`}>
        <span className={styles.shiftBadgeIcon} aria-hidden={true}>
          <Calendar size={18} />
        </span>
        <div className={styles.shiftBadgeText}>
          <span className={styles.shiftBadgeLabel}>{shift.label}</span>
          <span className={styles.shiftBadgeTime}>{shift.time}</span>
        </div>
      </div>

      <h3 className={styles.shiftProfessional}>{shift.professional}</h3>
      <p className={styles.shiftSpecialty}>{shift.specialty}</p>
      <span className={styles.shiftStatus}>{shift.statusLabel}</span>

      <button
        type="button"
        className={styles.shiftAction}
        aria-label={`Atualizar turno ${shift.label.toLowerCase()}`}
      >
        <ActionIcon size={16} />
      </button>
    </article>
  );
}

export default function EscalasPlantao() {
  const [selectedDate, setSelectedDate] = useState("2024-11-12");

  return (
    <section className={styles.root} aria-labelledby="gestao-escalas-title">
      <header className={styles.header}>
        <h2 id="gestao-escalas-title" className={styles.title}>
          Escalas de Plantões
        </h2>
        <p className={styles.subtitle}>Gerencie a escala médica 24 horas</p>
      </header>

      <div className={styles.summaryGrid} aria-label="Indicadores da escala">
        {SHIFT_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <section className={styles.dateSection} aria-label="Filtro por data">
        <div className={styles.dateCard}>
          <label htmlFor="shift-date" className={styles.dateLabel}>
            Selecionar Data:
          </label>

          <div className={styles.dateInputWrap}>
            <input
              id="shift-date"
              type="date"
              className={styles.dateInput}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
            <span className={styles.dateIcon} aria-hidden={true}>
              <Calendar size={18} />
            </span>
          </div>
        </div>
      </section>

      <section className={styles.shiftsGrid} aria-label="Turnos do dia">
        {DAILY_SHIFTS.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </section>

      <section className={styles.monthSection} aria-label="Visão mensal">
        <header className={styles.monthHeader}>
          <h3 className={styles.monthTitle}>Visão Mensal</h3>
        </header>

        <div className={styles.calendarWrap}>
          <div className={styles.weekdayRow} role="row">
            {MONTH_WEEKDAYS.map((weekday) => (
              <div key={weekday} className={styles.weekdayCell}>
                {weekday}
              </div>
            ))}
          </div>

          <div className={styles.monthGrid} role="grid">
            {MONTH_DAYS.map((day) => (
              <div
                key={day.id}
                className={`${styles.dayCell} ${day.isHighlighted ? styles.dayHighlighted : ""}`}
                role="gridcell"
              >
                <div className={styles.dayNumber}>{day.dayNumber}</div>
                <div className={styles.eventDots} aria-hidden={true}>
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                  <span className={`${styles.dot} ${styles.dotBlue}`} />
                  <span className={`${styles.dot} ${styles.dotPurple}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

"use client";

import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import styles from "./Agendamentos.module.scss";
import {
  APPOINTMENT_HISTORY,
  APPOINTMENT_SUMMARY_CARDS,
  APPOINTMENT_TABS,
  type AppointmentSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: AppointmentSummaryCard }) {
  const Icon = card.icon;
  const cardClass = card.tone === "primary" ? styles.summaryPrimary : undefined;
  const iconClass =
    card.tone === "success"
      ? styles.summaryIconSuccess
      : card.tone === "danger"
        ? styles.summaryIconDanger
        : undefined;

  return (
    <article className={`${styles.summaryCard} ${cardClass ?? ""}`}>
      <span className={styles.summaryLabel}>{card.label}</span>
      <strong className={styles.summaryValue}>{card.value}</strong>
      <Icon size={40} className={`${styles.summaryIcon} ${iconClass ?? ""}`} />
    </article>
  );
}

export default function Agendamentos() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );

  return (
    <section
      className={styles.root}
      aria-labelledby="gestao-agendamentos-title"
    >
      <header className={styles.header}>
        <div>
          <h2 id="gestao-agendamentos-title" className={styles.title}>
            Meus Agendamentos
          </h2>
          <p className={styles.subtitle}>
            Gerencie suas consultas de forma simples
          </p>
        </div>

        <button type="button" className={styles.addButton}>
          <Plus size={18} />
          Nova Consulta
        </button>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo de agendamentos">
        {APPOINTMENT_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.key} card={card} />
        ))}
      </div>

      <div
        className={styles.tabsBar}
        role="tablist"
        aria-label="Abas de agendamentos"
      >
        {APPOINTMENT_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <section className={styles.panel}>
        {activeTab === "upcoming" ? (
          <div className={styles.emptyState}>
            <Calendar size={68} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>Nenhuma consulta agendada</h3>
            <p className={styles.emptyText}>
              Agende sua primeira consulta para começar
            </p>
            <button type="button" className={styles.emptyAction}>
              Agendar Consulta
            </button>
          </div>
        ) : (
          <div className={styles.historyList}>
            {APPOINTMENT_HISTORY.map((item) => (
              <article key={item.id} className={styles.historyCard}>
                <div className={styles.historyInfo}>
                  <div className={styles.historyTitleRow}>
                    <h3 className={styles.historyProfessional}>
                      {item.professional}
                    </h3>
                    <span className={styles.historyBadge}>
                      {item.statusLabel}
                    </span>
                  </div>
                  <p className={styles.historyMeta}>
                    {item.specialty} • {item.time}
                  </p>
                </div>

                <div className={styles.historyDate}>{item.date}</div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

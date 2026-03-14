"use client";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./GestaoFinanceira.module.scss";
import {
  FINANCE_DRE_ROWS,
  FINANCE_PERIOD_OPTIONS,
  FINANCE_PLACEHOLDER_CARDS,
  FINANCE_SUMMARY_CARDS,
  FINANCE_TRANSACTIONS,
  type FinanceDreRow,
  type FinanceSummaryCard,
  type FinanceTransaction,
} from "./data";

function SummaryCard({ card }: { card: FinanceSummaryCard }) {
  const Icon = card.icon as LucideIcon;
  const isDangerValue = card.id === "balance";

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.summaryContent}>
        <strong
          className={`${styles.summaryValue} ${isDangerValue ? styles.dangerValue : ""}`}
        >
          {card.value}
        </strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

function DreRow({ row }: { row: FinanceDreRow }) {
  const toneClass =
    row.tone === "success"
      ? styles.dreSuccess
      : row.tone === "danger"
        ? styles.dreDanger
        : styles.dreResult;

  return (
    <div className={`${styles.dreRow} ${toneClass}`}>
      <span className={styles.dreLabel}>{row.label}</span>
      <strong className={styles.dreValue}>{row.value}</strong>
    </div>
  );
}

export default function GestaoFinanceira() {
  const [period, setPeriod] = useState(FINANCE_PERIOD_OPTIONS[0]);

  return (
    <section className={styles.root} aria-labelledby="gestao-financeira-title">
      <header className={styles.header}>
        <div>
          <h2 id="gestao-financeira-title" className={styles.title}>
            Gestão Financeira
          </h2>
          <p className={styles.subtitle}>Controle financeiro completo</p>
        </div>

        <label>
          <span hidden>Selecionar período financeiro</span>
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className={styles.periodSelect}
          >
            {FINANCE_PERIOD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo financeiro">
        {FINANCE_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div className={styles.chartGrid}>
        {FINANCE_PLACEHOLDER_CARDS.map((panel) => {
          const Icon = panel.icon as LucideIcon;

          return (
            <section key={panel.id} className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>{panel.title}</h3>
              </div>
              <div className={styles.chartPlaceholder}>
                <div className={styles.placeholderIconWrap}>
                  <Icon size={28} />
                </div>
                <div className={styles.placeholderText}>
                  {panel.description}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Movimentações Recentes</h3>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {FINANCE_TRANSACTIONS.map((transaction: FinanceTransaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td
                    className={
                      transaction.direction === "in"
                        ? styles.valueIn
                        : styles.valueOut
                    }
                  >
                    {transaction.value}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${transaction.status === "paid" ? styles.statusPaid : styles.statusPending}`}
                    >
                      {transaction.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>
            DRE - Demonstrativo de Resultados
          </h3>
        </div>
        <div className={styles.dreRows}>
          {FINANCE_DRE_ROWS.map((row) => (
            <DreRow key={row.id} row={row} />
          ))}
        </div>
      </section>
    </section>
  );
}

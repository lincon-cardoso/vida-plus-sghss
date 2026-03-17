"use client";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./SameArquivo.module.scss";
import {
  DIAGNOSES,
  MEDICAL_RECORDS,
  RECORD_CENSUS,
  SAME_SEARCH_ICON,
  SAME_SUMMARY_CARDS,
  type SameSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: SameSummaryCard }) {
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

export default function SameArquivo() {
  const SearchIcon = SAME_SEARCH_ICON as LucideIcon;
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecords = MEDICAL_RECORDS.filter((item) => {
    if (!normalizedQuery) return true;
    return `${item.id} ${item.patient} ${item.cpf}`
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <section className={styles.root} aria-labelledby="qualidade-same-title">
      <header className={styles.header}>
        <h2 id="qualidade-same-title" className={styles.title}>
          SAME - Serviço de Arquivo Médico
        </h2>
        <p className={styles.subtitle}>Controle e localização de prontuários</p>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo do SAME">
        {SAME_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div className={styles.searchWrap}>
        <SearchIcon size={20} className={styles.searchIcon} />
        <label htmlFor="same-search" hidden>
          Buscar prontuário
        </label>
        <input
          id="same-search"
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por paciente, CPF ou número do prontuário..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Prontuários</h3>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prontuário</th>
                <th>Paciente</th>
                <th>CPF</th>
                <th>Última Internação</th>
                <th>Internações</th>
                <th>Localização</th>
                <th>Detalhes</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.patient}</td>
                  <td>{item.cpf}</td>
                  <td>{item.lastAdmission}</td>
                  <td>{item.admissions}</td>
                  <td>
                    <span
                      className={`${styles.locationTag} ${styles[`tone${item.locationTone.charAt(0).toUpperCase()}${item.locationTone.slice(1)}`]}`}
                    >
                      {item.locationLabel}
                    </span>
                  </td>
                  <td>{item.details}</td>
                  <td>
                    <button type="button" className={styles.actionButton}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className={styles.bottomGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              Diagnósticos Mais Frequentes (CID-10)
            </h3>
          </div>
          <div className={styles.metricList}>
            {DIAGNOSES.map((item) => (
              <div key={item.id} className={styles.metricRow}>
                <div>
                  <span className={styles.metricCode}>{item.code}</span>{" "}
                  <span className={styles.metricLabel}>{item.label}</span>
                </div>
                <span className={styles.metricValue}>{item.total}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Censo de Prontuários</h3>
          </div>
          <div className={styles.metricList}>
            {RECORD_CENSUS.map((item) => (
              <div
                key={item.id}
                className={`${styles.metricRow} ${styles[`census${item.tone.charAt(0).toUpperCase()}${item.tone.slice(1)}`]}`}
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

"use client";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./RelatoriosFluxo.module.scss";
import {
  BOTTLENECKS,
  DISTRIBUTION_DATA,
  DOCTOR_PERFORMANCE,
  EXPORT_ICON,
  FLOW_SUMMARY_CARDS,
  FLOW_TAB_ITEMS,
  PERFORMANCE_ICON,
  SECTOR_TIME_DATA,
  type FlowSummaryCard,
  type FlowTabKey,
} from "./data";

function SummaryCard({ card }: { card: FlowSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryTop}>
        <span className={styles.summaryLabel}>{card.label}</span>
        <Icon size={18} className={styles.summaryIcon} />
      </div>
      <strong className={styles.summaryValue}>{card.value}</strong>
      <span className={styles.summaryHelper}>{card.helper}</span>
    </article>
  );
}

export default function RelatoriosFluxo() {
  const [activeTab, setActiveTab] = useState<FlowTabKey>("tempo-setor");
  const ExportIcon = EXPORT_ICON as LucideIcon;
  const PerformanceIcon = PERFORMANCE_ICON as LucideIcon;

  return (
    <section className={styles.root} aria-labelledby="relatorios-fluxo-title">
      <header className={styles.header}>
        <div>
          <h2 id="relatorios-fluxo-title" className={styles.title}>
            Relatórios de Fluxo de Pacientes
          </h2>
          <p className={styles.subtitle}>
            Análise de desempenho e gargalos no sistema de encaminhamento
          </p>
        </div>

        <button type="button" className={styles.exportButton}>
          <ExportIcon size={18} />
          Exportar
        </button>
      </header>

      <div className={styles.summaryGrid} aria-label="Indicadores de fluxo">
        {FLOW_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div
        className={styles.tabsBar}
        role="tablist"
        aria-label="Abas de relatórios"
      >
        {FLOW_TAB_ITEMS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "tempo-setor" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Tempo Médio por Setor</h3>
            <p className={styles.panelSubtitle}>
              Comparação entre tempo real e meta estabelecida (em minutos)
            </p>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SECTOR_TIME_DATA}
                margin={{ top: 20, right: 24, left: 8, bottom: 16 }}
              >
                <CartesianGrid
                  stroke="#d6dde7"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis
                  dataKey="sector"
                  tick={{ fill: "#5e6d80", fontSize: 14 }}
                />
                <YAxis tick={{ fill: "#5e6d80", fontSize: 14 }} />
                <Tooltip />
                <Bar dataKey="tempoReal" radius={[8, 8, 0, 0]} fill="#4a7fe8" />
                <Bar dataKey="meta" radius={[8, 8, 0, 0]} fill="#22a957" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendSwatch} ${styles.blue}`} />
              Tempo Real
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendSwatch} ${styles.green}`} />
              Meta
            </span>
          </div>
        </section>
      )}

      {activeTab === "distribuicao" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Distribuição por Etapa</h3>
            <p className={styles.panelSubtitle}>
              Volume de pacientes em cada estágio do fluxo operacional
            </p>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DISTRIBUTION_DATA}
                layout="vertical"
                margin={{ top: 20, right: 24, left: 24, bottom: 12 }}
              >
                <CartesianGrid
                  stroke="#d6dde7"
                  strokeDasharray="4 4"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fill: "#5e6d80", fontSize: 14 }} />
                <YAxis
                  dataKey="stage"
                  type="category"
                  tick={{ fill: "#5e6d80", fontSize: 14 }}
                  width={90}
                />
                <Tooltip />
                <Bar dataKey="pacientes" radius={[0, 8, 8, 0]} fill="#d83f96" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {activeTab === "gargalos" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Gargalos Operacionais</h3>
            <p className={styles.panelSubtitle}>
              Setores com maior atenção de tempo e capacidade
            </p>
          </div>

          <div className={styles.contentList}>
            {BOTTLENECKS.map((item) => (
              <article key={item.id} className={styles.infoCard}>
                <div className={styles.infoMain}>
                  <h4 className={styles.infoTitle}>{item.sector}</h4>
                  <p className={styles.infoSub}>{item.issue}</p>
                </div>

                <div className={styles.infoMeta}>
                  <div className={styles.metaValue}>{item.tempoMedio}</div>
                  <span className={`${styles.badge} ${styles[item.severity]}`}>
                    {item.severity === "alta"
                      ? "Alta"
                      : item.severity === "moderada"
                        ? "Moderada"
                        : "Normal"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "performance-medicos" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Performance Médicos</h3>
            <p className={styles.panelSubtitle}>
              Comparação do tempo médio de atendimento por profissional
            </p>
          </div>

          <div className={styles.contentList}>
            {DOCTOR_PERFORMANCE.map((item) => {
              const scoreClass =
                item.score === "Excelente"
                  ? styles.scoreExcelente
                  : item.score === "Bom"
                    ? styles.scoreBom
                    : styles.scoreAtencao;

              return (
                <article key={item.id} className={styles.infoCard}>
                  <div className={styles.infoMain}>
                    <h4 className={styles.infoTitle}>{item.doctor}</h4>
                    <p className={styles.infoSub}>{item.specialty}</p>
                  </div>

                  <div className={styles.infoMeta}>
                    <div className={styles.metaValue}>
                      {item.avgMinutes} min
                    </div>
                    <span className={`${styles.badge} ${scoreClass}`}>
                      <PerformanceIcon size={14} />
                      {item.score}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

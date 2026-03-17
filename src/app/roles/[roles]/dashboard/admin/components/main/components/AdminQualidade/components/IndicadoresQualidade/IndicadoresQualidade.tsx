"use client";

import type { LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./IndicadoresQualidade.module.scss";
import {
  QUALITY_SUMMARY_CARDS,
  SATISFACTION_DATA,
  WAITING_TIME_DATA,
  type QualitySummaryCard,
} from "./data";

function SummaryCard({ card }: { card: QualitySummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.iconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>
      <strong className={styles.summaryValue}>{card.value}</strong>
      <span className={styles.summaryLabel}>{card.label}</span>
      <span className={styles.summaryGoal}>{card.goal}</span>
    </article>
  );
}

export default function IndicadoresQualidade() {
  return (
    <section
      className={styles.root}
      aria-labelledby="qualidade-indicadores-title"
    >
      <header className={styles.header}>
        <h2 id="qualidade-indicadores-title" className={styles.title}>
          Indicadores de Qualidade
        </h2>
        <p className={styles.subtitle}>Métricas e metas de desempenho</p>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo de indicadores">
        {QUALITY_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div className={styles.chartGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Evolução Mensal - Satisfação</h3>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={SATISFACTION_DATA}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  stroke="#d8e0ea"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#5e6d80", fontSize: 13 }}
                />
                <YAxis tick={{ fill: "#5e6d80", fontSize: 13 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="nps"
                  stroke="#4a7fe8"
                  fill="#dbe8ff"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              Tempo de Espera por Especialidade
            </h3>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WAITING_TIME_DATA}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  stroke="#d8e0ea"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis
                  dataKey="specialty"
                  tick={{ fill: "#5e6d80", fontSize: 13 }}
                />
                <YAxis tick={{ fill: "#5e6d80", fontSize: 13 }} />
                <Tooltip />
                <Bar dataKey="tempo" radius={[8, 8, 0, 0]} fill="#8452ec" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </section>
  );
}

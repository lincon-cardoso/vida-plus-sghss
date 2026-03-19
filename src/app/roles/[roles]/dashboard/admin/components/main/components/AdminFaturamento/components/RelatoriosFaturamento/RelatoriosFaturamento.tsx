"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./RelatoriosFaturamento.module.scss";
import {
  BED_OCCUPANCY_DATA,
  BILLING_SUMMARY_CARDS,
  EXPORT_ACTIONS,
  EXPORT_ICON,
  FILTER_ICON,
  MONTHLY_ATTENDANCE_DATA,
  PROFESSIONAL_PERFORMANCE,
  RATING_ICON,
  REVENUE_EVOLUTION_DATA,
  SPECIALTY_DATA,
  type BillingSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: BillingSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryTop}>
        <div className={`${styles.iconBox} ${styles[card.tone]}`}>
          <Icon size={24} />
        </div>
        <span
          className={`${styles.delta} ${card.deltaTone === "positive" ? styles.deltaPositive : styles.deltaNegative}`}
        >
          {card.delta}
        </span>
      </div>
      <strong className={styles.summaryValue}>{card.value}</strong>
      <span className={styles.summaryLabel}>{card.label}</span>
    </article>
  );
}

export default function RelatoriosFaturamento() {
  const FilterIcon = FILTER_ICON as LucideIcon;
  const ExportIcon = EXPORT_ICON as LucideIcon;
  const RatingIcon = RATING_ICON as LucideIcon;

  return (
    <section
      className={styles.root}
      aria-labelledby="faturamento-relatorios-title"
    >
      <header className={styles.header}>
        <div>
          <h2 id="faturamento-relatorios-title" className={styles.title}>
            Relatórios e Análises
          </h2>
          <p className={styles.subtitle}>
            Visualize métricas e indicadores de desempenho
          </p>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.ghostButton}>
            <FilterIcon size={18} />
            Período
          </button>
          <button type="button" className={styles.primaryButton}>
            <ExportIcon size={18} />
            Exportar PDF
          </button>
        </div>
      </header>

      <div className={styles.summaryGrid} aria-label="Indicadores financeiros">
        {BILLING_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div className={styles.chartGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Atendimentos por Mês</h3>
            <p className={styles.panelSubtitle}>
              Consultas e exames realizados
            </p>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_ATTENDANCE_DATA}
                margin={{ top: 20, right: 12, left: 0, bottom: 10 }}
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
                <Bar dataKey="consultas" fill="#2d72ec" radius={[6, 6, 0, 0]} />
                <Bar dataKey="exames" fill="#39ab50" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendSwatch} ${styles.legendBlue}`} />
              Consultas
            </span>
            <span className={styles.legendItem}>
              <span
                className={`${styles.legendSwatch} ${styles.legendGreen}`}
              />
              Exames
            </span>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Ocupação de Leitos</h3>
            <p className={styles.panelSubtitle}>Últimos 7 dias</p>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BED_OCCUPANCY_DATA}
                margin={{ top: 20, right: 12, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  stroke="#d8e0ea"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis dataKey="day" tick={{ fill: "#5e6d80", fontSize: 13 }} />
                <YAxis tick={{ fill: "#5e6d80", fontSize: 13 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="ocupados"
                  stackId="beds"
                  fill="#ff5036"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="disponiveis"
                  stackId="beds"
                  fill="#39ab50"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className={styles.chartGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Consultas por Especialidade</h3>
            <p className={styles.panelSubtitle}>Distribuição no período</p>
          </div>
          <div className={styles.pieChartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPECIALTY_DATA}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={96}
                  label={({ name }) => name}
                  labelLine={false}
                >
                  {SPECIALTY_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Evolução da Receita</h3>
            <p className={styles.panelSubtitle}>Últimos 6 meses</p>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={REVENUE_EVOLUTION_DATA}
                margin={{ top: 20, right: 12, left: 6, bottom: 10 }}
              >
                <CartesianGrid stroke="#d8e0ea" strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#5e6d80", fontSize: 13 }}
                />
                <YAxis
                  tick={{ fill: "#5e6d80", fontSize: 13 }}
                  tickFormatter={(value) => `R$ ${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => {
                    const amount = typeof value === "number" ? value : 0;

                    return [`R$ ${amount.toLocaleString("pt-BR")}`, "Receita"];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="#39ab50"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#39ab50" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className={styles.largePanel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Desempenho dos Profissionais</h3>
          <p className={styles.panelSubtitle}>
            Ranking por número de atendimentos
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Profissional</th>
                <th>Especialidade</th>
                <th>Atendimentos</th>
                <th>Avaliação</th>
                <th>Receita</th>
              </tr>
            </thead>
            <tbody>
              {PROFESSIONAL_PERFORMANCE.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span
                      className={`${styles.position} ${item.position <= 3 ? styles.positionTop : ""}`}
                    >
                      {item.position}
                    </span>
                  </td>
                  <td>{item.professional}</td>
                  <td>{item.specialty}</td>
                  <td>{item.appointments}</td>
                  <td>
                    <span className={styles.rating}>
                      <RatingIcon size={15} className={styles.ratingIcon} />
                      {item.rating}
                    </span>
                  </td>
                  <td className={styles.revenueCell}>{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.exportPanel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Exportar Relatórios</h3>
        </div>
        <div className={styles.exportActions}>
          {EXPORT_ACTIONS.map((action) => {
            const Icon = action.icon as LucideIcon;

            return (
              <button
                key={action.id}
                type="button"
                className={styles.exportButton}
              >
                <Icon
                  size={18}
                  className={
                    action.tone === "danger"
                      ? styles.exportDanger
                      : action.tone === "success"
                        ? styles.exportSuccess
                        : styles.exportPrimary
                  }
                />
                {action.label}
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}

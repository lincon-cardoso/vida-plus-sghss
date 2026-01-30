import styles from "./AdminHomeFlowPanel.module.scss";
import dynamic from "next/dynamic";

const AdminHomeChart = dynamic(() => import("./AdminHomeChart"), {
  ssr: false,
  loading: () => <div className={styles.chartPlaceholder} />,
});

export default function AdminHomeFlowPanel() {
  const mockValues = [20, 35, 50, 40, 60];
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  return (
    <section className={styles.panel} aria-label="Fluxo de atendimentos">
      <header className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Fluxo de Atendimentos</h3>
        <label className={styles.panelFilter}>
          <span className={styles.panelFilterLabel}>Período</span>
          <select
            className={styles.select}
            name="flow_period"
            defaultValue="7d"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
        </label>
      </header>

      <div className={styles.panelBody}>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Total</div>
            <div className={styles.summaryValue}>172</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Média diária</div>
            <div className={styles.summaryValue}>~25</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Conclusões</div>
            <div className={styles.summaryValue}>85%</div>
          </div>
        </div>

        <div className={styles.chart}>
          {/* Chart dynamic client component */}
          <AdminHomeChart
            data={mockValues.map((v, i) => ({ day: days[i], value: v }))}
          />
        </div>
      </div>
    </section>
  );
}

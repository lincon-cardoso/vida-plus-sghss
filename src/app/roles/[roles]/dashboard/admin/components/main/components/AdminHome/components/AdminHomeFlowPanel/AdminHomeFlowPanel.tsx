import styles from "./AdminHomeFlowPanel.module.scss";

export default function AdminHomeFlowPanel() {
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

      <div className={styles.panelBody} aria-hidden>
        <div className={styles.chartPlaceholder} />
      </div>
    </section>
  );
}

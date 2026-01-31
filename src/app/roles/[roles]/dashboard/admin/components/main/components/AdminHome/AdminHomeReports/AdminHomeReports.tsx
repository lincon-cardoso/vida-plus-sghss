import styles from "./AdminHomeReports.module.scss";
import { ADMIN_HOME_REPORTS, type AdminHomeReport } from "./data";

/**
 * Seção 'Relatórios e Indicadores' do Admin Home
 * Renderiza um grid de cards com ícones e descrição curta.
 */
export default function AdminHomeReports() {
  return (
    <section className={styles.root} aria-labelledby="reports-title">
      <h3 id="reports-title" className={styles.title}>
        Relatórios e Indicadores
      </h3>

      <div className={styles.grid}>
        {ADMIN_HOME_REPORTS.map((r: AdminHomeReport) => {
          const Icon = r.icon;
          return (
            <div key={r.id} className={styles.card} tabIndex={0} role="button">
              <div className={styles.iconWrap} aria-hidden>
                <Icon size={20} />
              </div>

              <div className={styles.content}>
                <div className={styles.cardTitle}>{r.title}</div>
                <div className={styles.cardSubtitle}>{r.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import styles from "./AdminHome.module.scss";
import AdminHomeFlowPanel from "./components/AdminHomeFlowPanel";
import AdminHomeHeader from "./components/AdminHomeHeader";
import AdminHomeKpiGrid from "./components/AdminHomeKpiGrid";
import AdminHomeSidebar from "./components/AdminHomeSidebar";
import {
  ADMIN_HOME_ALERTS,
  ADMIN_HOME_KPIS,
  ADMIN_HOME_NAV_ITEMS,
} from "./data";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/**
 * Cabeçalho do Dashboard Executivo do Admin.
 * Exibe título, descrição, data atual e ação primária.
 */
export default function AdminHome() {
  const today = formatDate(new Date());

  const activeKey = "overview";

  return (
    <div className={styles.root} aria-labelledby="admin-home-title">
      <div className={styles.layout}>
        <AdminHomeSidebar
          navItems={ADMIN_HOME_NAV_ITEMS}
          activeKey={activeKey}
          alerts={ADMIN_HOME_ALERTS}
        />

        <section className={styles.content} aria-label="Dashboard executivo">
          <AdminHomeHeader
            title="Portal do Gestor"
            description="Visão integrada e gestão estratégica da unidade"
            todayLabel={today}
            ctaLabel="Gerar Relatório"
          />

          <AdminHomeKpiGrid kpis={ADMIN_HOME_KPIS} />

          <AdminHomeFlowPanel />
        </section>
      </div>
    </div>
  );
}

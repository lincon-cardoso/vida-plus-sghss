import styles from "./AdminHome.module.scss";
import dynamic from "next/dynamic";
import AdminHomeFlowPanel from "./components/AdminHomeFlowPanel";
import AdminHomeHeader from "./components/AdminHomeHeader";
import AdminHomeSidebar from "./components/AdminHomeSidebar";
import AdminHomeClinical from "./components/AdminHomeClinical";
import AdminHomePatients from "./components/AdminHomePatients";
import AdminHomeResources from "./components/AdminHomeResources";
import AdminHomeFinance from "./components/AdminHomeFinance";
import AdminHomeReports from "./AdminHomeReports";
import {
  ADMIN_HOME_ALERTS,
  ADMIN_HOME_KPIS,
  ADMIN_HOME_NAV_ITEMS,
  ADMIN_HOME_ACTIVITIES,
} from "./data";

const AdminHomeKpiGrid = dynamic(
  () => import("./components/AdminHomeKpiGrid"),
  {
    ssr: false,
    loading: () => <div>Carregando KPIs...</div>,
  },
);

const AdminHomeActivities = dynamic(
  () => import("./components/AdminHomeActivities"),
  {
    ssr: false,
    loading: () => <div>Carregando atividades...</div>,
  },
);

interface AdminHomeProps {
  activeKey: string;
  onSelect: (key: string) => void;
}

function getFormattedDate(date: Date) {
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
export default function AdminHome({ activeKey, onSelect }: AdminHomeProps) {
  const today = getFormattedDate(new Date());

  return (
    <div className={styles.root} aria-labelledby="admin-home-title">
      <AdminHomeHeader
        title="Portal do Gestor"
        description="Visão integrada e gestão estratégica da unidade"
        todayLabel={today}
        ctaLabel="Gerar Relatório"
      />
      <div className={styles.layout}>
        <AdminHomeSidebar
          navItems={ADMIN_HOME_NAV_ITEMS}
          activeKey={activeKey}
          alerts={ADMIN_HOME_ALERTS}
          onSelect={onSelect}
        />

        <section className={styles.content} aria-label="Dashboard executivo">
          {activeKey === "overview" && (
            <>
              <AdminHomeKpiGrid kpis={ADMIN_HOME_KPIS} />

              <AdminHomeReports />

              <AdminHomeFlowPanel />

              <AdminHomeActivities activities={ADMIN_HOME_ACTIVITIES} />
            </>
          )}

          {activeKey === "clinical" && <AdminHomeClinical />}

          {activeKey === "patients" && <AdminHomePatients />}

          {activeKey === "beds" && <AdminHomeResources />}

          {activeKey === "finance" && <AdminHomeFinance />}

          {activeKey === "reports" && <AdminHomeReports />}
        </section>
      </div>
    </div>
  );
}

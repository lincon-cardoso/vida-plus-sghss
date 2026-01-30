import styles from "./AdminHomeSidebar.module.scss";
import type { AdminHomeAlert, AdminHomeNavItem } from "../../data";

interface AdminHomeSidebarProps {
  navItems: AdminHomeNavItem[];
  activeKey: string;
  alerts: AdminHomeAlert[];
}

export default function AdminHomeSidebar({
  navItems,
  activeKey,
  alerts,
}: AdminHomeSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Menu do painel executivo">
      <nav className={styles.nav} aria-label="Seções do painel">
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === activeKey;

            return (
              <li key={item.key} className={styles.navListItem}>
                <button
                  type="button"
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={styles.navIcon} size={18} aria-hidden />
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className={styles.alerts} aria-label="Alertas do sistema">
        <h3 className={styles.alertsTitle}>ALERTAS DO SISTEMA</h3>
        <ul className={styles.alertsList}>
          {alerts.map((alert) => (
            <li
              key={alert.key}
              className={`${styles.alertItem} ${
                alert.variant === "danger"
                  ? styles.alertItemDanger
                  : styles.alertItemWarning
              }`}
            >
              <p className={styles.alertItemTitle}>{alert.title}</p>
              <p className={styles.alertItemTime}>{alert.time}</p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

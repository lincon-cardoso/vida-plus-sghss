import styles from "./AdminHomeActivities.module.scss";
import type { AdminHomeActivity, AdminHomeIcon } from "../../data";

interface Props {
  activities: AdminHomeActivity[];
}

export default function AdminHomeActivities({ activities }: Props) {
  return (
    <section className={styles.panel} aria-label="Atividades Recentes">
      <header className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Atividades Recentes</h3>
        <a className={styles.viewAll} href="#">
          Ver todas
        </a>
      </header>

      <ul className={styles.activityList}>
        {activities.map((act) => (
          <li key={act.key} className={styles.activityItem}>
            <div
              className={`${styles.iconWrap} ${
                act.variant === "success"
                  ? styles.iconWrapSuccess
                  : act.variant === "info"
                    ? styles.iconWrapInfo
                    : act.variant === "warning"
                      ? styles.iconWrapWarning
                      : styles.iconWrapMuted
              }`}
              aria-hidden
            >
              {act.icon ? (
                // renderiza o ícone vindo do data (tipado)
                (() => {
                  const Icon: AdminHomeIcon = act.icon;
                  return <Icon className={styles.icon} size={18} />;
                })()
              ) : (
                <span className={styles.icon} />
              )}
            </div>

            <div className={styles.content}>
              <p className={styles.title}>{act.title}</p>
              {act.subtitle ? (
                <p className={styles.subtitle}>{act.subtitle}</p>
              ) : null}
            </div>

            <div className={styles.time}>{act.time}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

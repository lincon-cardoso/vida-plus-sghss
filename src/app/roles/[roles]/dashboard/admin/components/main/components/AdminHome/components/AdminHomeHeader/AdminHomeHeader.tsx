import styles from "./AdminHomeHeader.module.scss";

interface AdminHomeHeaderProps {
  title: string;
  description: string;
  todayLabel: string;
  ctaLabel: string;
}

export default function AdminHomeHeader({
  title,
  description,
  todayLabel,
  ctaLabel,
}: AdminHomeHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 id="admin-home-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.right}>
        <span className={styles.datePill} aria-hidden>
          {todayLabel}
        </span>
        <button type="button" className={styles.cta}>
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}

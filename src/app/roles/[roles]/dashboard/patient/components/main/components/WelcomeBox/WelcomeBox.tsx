import styles from "../../styles/PatientMenu.module.scss";

type Props = {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
};

export default function WelcomeBox({ title, subtitle, actions }: Props) {
  return (
    <div className={styles.welcomeBox}>
      <div className={styles.welcomeContent}>
        <h1 className={styles.contentTitle}>{title}</h1>
        <p className={styles.editable}>{subtitle}</p>
      </div>

      {actions && <div className={styles.welcomeActions}>{actions}</div>}
    </div>
  );
}

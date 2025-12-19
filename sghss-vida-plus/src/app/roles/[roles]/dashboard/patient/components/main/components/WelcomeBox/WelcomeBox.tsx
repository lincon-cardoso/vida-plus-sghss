"use client";

import styles from "../../styles/PatientMenu.module.scss";

type Props = {
  title: string;
  subtitle: string;
};

export default function WelcomeBox({ title, subtitle }: Props) {
  return (
    <div className={styles.welcomeBox}>
      <h1 className={styles.contentTitle}>{title}</h1>
      <p className={styles.editable}>{subtitle}</p>
    </div>
  );
}

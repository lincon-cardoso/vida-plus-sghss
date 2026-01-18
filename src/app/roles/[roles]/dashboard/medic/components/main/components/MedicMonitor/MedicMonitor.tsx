"use client";

import styles from "./MedicMonitor.module.scss";

export default function MedicMonitor() {
  return (
    <div className={styles.dashboardContent}>
      <h2 className={styles.title}>Monitor de Pacientes</h2>
      <p className={styles.description}>
        Conteúdo do monitor de pacientes será exibido aqui.
      </p>
    </div>
  );
}

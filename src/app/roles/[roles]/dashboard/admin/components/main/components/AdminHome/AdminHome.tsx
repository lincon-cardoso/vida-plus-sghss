"use client";

import styles from "./AdminHome.module.scss";

/**
 * Componente simples do Dashboard Executivo do Admin.
 */
export default function AdminHome() {
  return (
    <main className={styles.root} aria-labelledby="admin-home-title">
      <h2 id="admin-home-title" className={styles.title}>
        Dashboard Executivo
      </h2>
      <p className={styles.description}>Visão geral e métricas do sistema.</p>
    </main>
  );
}

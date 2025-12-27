"use client";
import { Download } from "lucide-react";
import styles from "./styles/HistoricoMedico.module.scss";

export default function HistoricoMedico() {
  return (
    <section className={styles.historico}>
      <div className={styles.header}>
        <h3 className={styles.title}>Linha do Tempo</h3>
        <a
          className={styles.exportLink}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: implementar exportação real
            console.log("Exportar histórico clicado");
          }}
          aria-label="Exportar Histórico"
        >
          <Download className={styles.icon} size={16} aria-hidden="true" />
          <span>Exportar Histórico</span>
        </a>
      </div>

      {/* Conteúdo do histórico (ex.: entradas) */}
    </section>
  );
}

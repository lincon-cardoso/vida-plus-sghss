import styles from "./Resources.module.scss";
import type { Sector, Supply } from "./data";
import { SECTORS, SUPPLIES } from "./data";
import { Box, Activity } from "lucide-react";

/**
 * Recursos e Leitos — componente de visualização
 * - Painel esquerdo: ocupação por setor (barra de progresso colorida)
 * - Painel direito: estoque crítico com badges coloridas
 */
export default function Resources() {
  return (
    <div className={styles.root} aria-labelledby="resources-title">
      <h2 id="resources-title" className={styles.title}>
        Recursos e Instalações
      </h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Activity size={18} />
            <div className={styles.cardTitle}>Ocupação por Setor</div>
          </div>

          <div className={styles.sectors}>
            {SECTORS.map((s: Sector) => (
              <div key={s.key} className={styles.sectorRow}>
                <div className={styles.sectorLabel}>
                  <span className={styles.sectorName}>{s.name}</span>
                  <span className={styles.sectorValue}>
                    {s.occupied}/{s.capacity} ({s.percent}%)
                  </span>
                </div>

                <div
                  className={styles.progress}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s.percent}
                >
                  <div
                    className={`${styles.progressBar} ${styles[`w${Math.round(s.percent / 10) * 10}`]} ${styles[s.key]}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Box size={18} />
            <div className={styles.cardTitle}>Estoque Crítico</div>
          </div>

          <div className={styles.supplies}>
            {SUPPLIES.map((it: Supply) => (
              <div key={it.key} className={styles.supplyRow}>
                <div>
                  <div className={styles.supplyName}>{it.name}</div>
                  <div className={styles.supplyMeta}>Mínimo: {it.min}</div>
                </div>
                <div className={styles.supplyBadge} data-variant={it.variant}>
                  {it.qty} un
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

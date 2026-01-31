import styles from "./Finance.module.scss";
import { DollarSign } from "lucide-react";
import type { FinanceKpi } from "./data";
import { FINANCE_KPIS } from "./data";

/**
 * Gestão Financeira — painel resumido
 * - Linha superior com KPIs (cards)
 * - Painel grande com call-to-action para o módulo financeiro completo
 */
export default function Finance() {
  return (
    <section className={styles.root} aria-labelledby="finance-title">
      <h2 id="finance-title" className={styles.title}>
        Gestão Financeira
      </h2>

      <div className={styles.kpiRow}>
        {FINANCE_KPIS.map((k: FinanceKpi) => (
          <article
            key={k.key}
            className={styles.kpiCard}
            aria-labelledby={`kpi-${k.key}`}
          >
            <div id={`kpi-${k.key}`} className={styles.kpiTitle}>
              {k.title}
            </div>
            <div className={styles.kpiValue}>{k.value}</div>
            <div
              className={`${styles.kpiTrend} ${k.trendDirection === "up" ? styles.trendUp : styles.trendDown}`}
            >
              {k.trendDirection === "up" ? "▲" : "▼"} {k.trend}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.largeCard}>
        <div className={styles.largeContent}>
          <DollarSign size={56} className={styles.largeIcon} />
          <div className={styles.largeText}>
            <h3 className={styles.largeTitle}>
              Relatórios Financeiros Detalhados
            </h3>
            <p className={styles.largeDescription}>
              Acesse o módulo financeiro completo para visualizar DRE, Fluxo de
              Caixa e Contas a Pagar/Receber.
            </p>
            <button className={styles.ctaButton} type="button">
              Acessar Módulo Financeiro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

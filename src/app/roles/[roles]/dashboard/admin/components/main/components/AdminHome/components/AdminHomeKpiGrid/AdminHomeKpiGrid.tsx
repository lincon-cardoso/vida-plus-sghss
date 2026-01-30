import styles from "./AdminHomeKpiGrid.module.scss";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { AdminHomeKpi } from "../../data";

interface AdminHomeKpiGridProps {
  kpis: AdminHomeKpi[];
}

export default function AdminHomeKpiGrid({ kpis }: AdminHomeKpiGridProps) {
  return (
    <div className={styles.kpiGrid} aria-label="Indicadores principais">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isPositive = kpi.trendDirection === "up";
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <article key={kpi.key} className={styles.kpiCard}>
            <div className={styles.kpiCardTop}>
              <span
                className={styles.kpiIconWrapper}
                aria-hidden
                data-tone={kpi.key}
              >
                <Icon className={styles.kpiIcon} size={18} />
              </span>

              <span
                className={`${styles.kpiTrend} ${
                  isPositive ? styles.kpiTrendUp : styles.kpiTrendDown
                }`}
                aria-label={`Variação ${kpi.trend}`}
              >
                <TrendIcon className={styles.kpiTrendIcon} size={16} />
                {kpi.trend}
              </span>
            </div>

            <p className={styles.kpiValue}>{kpi.value}</p>
            <p className={styles.kpiTitle}>{kpi.title}</p>
          </article>
        );
      })}
    </div>
  );
}

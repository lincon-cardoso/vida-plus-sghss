export type FinanceKpi = {
  key: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
};

export const FINANCE_KPIS: FinanceKpi[] = [
  {
    key: "revenue",
    title: "Receita Bruta (Mês)",
    value: "R$ 1.25M",
    trend: "12% vs mês anterior",
    trendDirection: "up",
  },
  {
    key: "expenses",
    title: "Despesas Operacionais",
    value: "R$ 840K",
    trend: "5% vs mês anterior",
    trendDirection: "down",
  },
  {
    key: "claims",
    title: "Glosas (Estimadas)",
    value: "R$ 45K",
    trend: "2% vs mês anterior",
    trendDirection: "down",
  },
];

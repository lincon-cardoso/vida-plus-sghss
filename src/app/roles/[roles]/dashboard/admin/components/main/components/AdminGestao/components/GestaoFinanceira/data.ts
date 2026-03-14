import {
  CalendarDays,
  DollarSign,
  PieChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FinanceSummaryCard = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "success" | "danger" | "warning";
};

export type FinanceTransactionStatus = "paid" | "pending";

export type FinanceTransaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  value: string;
  direction: "in" | "out";
  status: FinanceTransactionStatus;
  statusLabel: string;
};

export type FinanceDreRow = {
  id: string;
  label: string;
  value: string;
  tone: "success" | "danger" | "result";
};

export const FINANCE_PERIOD_OPTIONS = [
  "Este Mês",
  "Últimos 3 Meses",
  "Este Ano",
];

export const FINANCE_SUMMARY_CARDS: FinanceSummaryCard[] = [
  {
    id: "revenue",
    label: "Receitas",
    value: "R$ 23.500",
    icon: TrendingUp,
    tone: "success",
  },
  {
    id: "expenses",
    label: "Despesas",
    value: "R$ 60.200",
    icon: TrendingDown,
    tone: "danger",
  },
  {
    id: "balance",
    label: "Saldo",
    value: "R$ 36.700",
    icon: DollarSign,
    tone: "danger",
  },
  {
    id: "payable",
    label: "A Pagar",
    value: "R$ 12.000",
    icon: CalendarDays,
    tone: "warning",
  },
];

export const FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  {
    id: "fin-1",
    date: "12/11/2024",
    description: "Consultas - Plano de Saúde XYZ",
    category: "Consultas",
    value: "+ R$ 15.000",
    direction: "in",
    status: "paid",
    statusLabel: "Pago",
  },
  {
    id: "fin-2",
    date: "12/11/2024",
    description: "Salários - Equipe Médica",
    category: "Pessoal",
    value: "- R$ 45.000",
    direction: "out",
    status: "paid",
    statusLabel: "Pago",
  },
  {
    id: "fin-3",
    date: "11/11/2024",
    description: "Exames Laboratoriais",
    category: "Exames",
    value: "+ R$ 8.500",
    direction: "in",
    status: "paid",
    statusLabel: "Pago",
  },
  {
    id: "fin-4",
    date: "11/11/2024",
    description: "Medicamentos - Fornecedor ABC",
    category: "Farmácia",
    value: "- R$ 12.000",
    direction: "out",
    status: "pending",
    statusLabel: "Pendente",
  },
  {
    id: "fin-5",
    date: "10/11/2024",
    description: "Energia Elétrica",
    category: "Utilidades",
    value: "- R$ 3.200",
    direction: "out",
    status: "paid",
    statusLabel: "Pago",
  },
];

export const FINANCE_DRE_ROWS: FinanceDreRow[] = [
  {
    id: "dre-revenue",
    label: "Receita Bruta",
    value: "R$ 23.500",
    tone: "success",
  },
  {
    id: "dre-expenses",
    label: "(-) Despesas Operacionais",
    value: "R$ 60.200",
    tone: "danger",
  },
  {
    id: "dre-result",
    label: "Resultado Líquido",
    value: "R$ 36.700",
    tone: "result",
  },
];

export const FINANCE_PLACEHOLDER_CARDS = [
  {
    id: "cashflow",
    title: "Fluxo de Caixa",
    icon: TrendingUp,
    description: "Gráfico de Fluxo de Caixa",
  },
  {
    id: "revenue-category",
    title: "Receitas por Categoria",
    icon: PieChart,
    description: "Distribuição de Receitas",
  },
];

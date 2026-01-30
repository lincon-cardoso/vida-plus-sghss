import type { ComponentType } from "react";
import {
  Bed,
  DollarSign,
  FileText,
  HeartPulse,
  LayoutGrid,
  TrendingUp,
  Users,
} from "lucide-react";

export type AdminHomeIcon = ComponentType<{
  className?: string;
  size?: number;
}>;

export type AdminHomeNavItem = {
  key: string;
  label: string;
  icon: AdminHomeIcon;
};

export type AdminHomeKpi = {
  key: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: AdminHomeIcon;
};

export type AdminHomeAlert = {
  key: string;
  title: string;
  time: string;
  variant: "danger" | "warning";
};

export const ADMIN_HOME_NAV_ITEMS: AdminHomeNavItem[] = [
  { key: "overview", label: "Visão Geral", icon: LayoutGrid },
  { key: "clinical", label: "Corpo Clínico", icon: Users },
  { key: "patients", label: "Gestão de Pacientes", icon: HeartPulse },
  { key: "beds", label: "Recursos e Leitos", icon: Bed },
  { key: "finance", label: "Financeiro", icon: DollarSign },
  { key: "reports", label: "Relatórios e Indicadores", icon: FileText },
];

export const ADMIN_HOME_KPIS: AdminHomeKpi[] = [
  {
    key: "monthly_revenue",
    title: "Faturamento Mensal",
    value: "R$ 1.25M",
    trend: "+5.2%",
    trendDirection: "up",
    icon: DollarSign,
  },
  {
    key: "active_patients",
    title: "Pacientes Ativos",
    value: "3,847",
    trend: "+12.5%",
    trendDirection: "up",
    icon: Users,
  },
  {
    key: "bed_occupancy",
    title: "Ocupação de Leitos",
    value: "87%",
    trend: "-2.1%",
    trendDirection: "down",
    icon: Bed,
  },
  {
    key: "nps",
    title: "NPS / Satisfação",
    value: "4.8",
    trend: "+0.2",
    trendDirection: "up",
    icon: TrendingUp,
  },
];

export const ADMIN_HOME_ALERTS: AdminHomeAlert[] = [
  {
    key: "dipyrone_stock",
    title: "Estoque de Dipirona baixo",
    time: "2h atrás",
    variant: "danger",
  },
  {
    key: "icu_occupancy",
    title: "Taxa de ocupação UTI > 90%",
    time: "4h atrás",
    variant: "warning",
  },
];

import { CheckCircle, UserPlus, AlertTriangle } from "lucide-react";

export type AdminHomeActivity = {
  key: string;
  title: string;
  subtitle?: string;
  time: string;
  icon?: AdminHomeIcon;
  variant?: "success" | "info" | "warning" | "muted";
};

export const ADMIN_HOME_ACTIVITIES: AdminHomeActivity[] = [
  {
    key: "activity_shift_end",
    title: "Dr. João finalizou o plantão na UTI",
    subtitle: "",
    time: "15 min atrás",
    icon: CheckCircle,
    variant: "success",
  },
  {
    key: "activity_admission",
    title: "Nova admissão: Maria Silva (Convênio Unimed)",
    subtitle: "",
    time: "42 min atrás",
    icon: UserPlus,
    variant: "info",
  },
  {
    key: "activity_stock_alert",
    title: "Alerta de estoque: Paracetamol abaixo do mínimo",
    subtitle: "",
    time: "1h atrás",
    icon: AlertTriangle,
    variant: "warning",
  },
  {
    key: "activity_billing",
    title: "Faturamento do dia fechado parcialmente",
    subtitle: "",
    time: "2h atrás",
    icon: DollarSign,
    variant: "muted",
  },
];

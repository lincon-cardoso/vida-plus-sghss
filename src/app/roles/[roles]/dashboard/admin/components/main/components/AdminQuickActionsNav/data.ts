import type { LucideIcon } from "lucide-react";
import {
  Home,
  UserCheck,
  Users,
  FileText,
  BarChart2,
  PieChart,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

export type AdminActionKey =
  | "nav_dashboard"
  | "nav_reception"
  | "nav_patients"
  | "nav_assistance"
  | "nav_management"
  | "nav_quality"
  | "nav_billing"
  | "nav_system"
  | "nav_logout";

export type AdminSubItem = {
  key: string;
  label: string;
};

export type AdminAction = {
  itemKey: AdminActionKey;
  label: string;
  color?: string;
  subItems?: AdminSubItem[];
  icon?: LucideIcon;
};

export const ACTION_ICONS: Record<AdminActionKey, LucideIcon> = {
  nav_dashboard: Home,
  nav_reception: UserCheck,
  nav_patients: Users,
  nav_assistance: FileText,
  nav_management: BarChart2,
  nav_quality: PieChart,
  nav_billing: DollarSign,
  nav_system: Settings,
  nav_logout: LogOut,
};

export const DEFAULT_ACTIONS: AdminAction[] = [
  {
    itemKey: "nav_dashboard",
    label: "Dashboard Executivo",
    icon: ACTION_ICONS.nav_dashboard,
  },
  {
    itemKey: "nav_reception",
    label: "Recepção & Check-in",
    icon: ACTION_ICONS.nav_reception,
  },
  {
    itemKey: "nav_patients",
    label: "Pacientes",
    icon: ACTION_ICONS.nav_patients,
  },
  {
    itemKey: "nav_assistance",
    label: "Assistencial",
    icon: ACTION_ICONS.nav_assistance,
    subItems: [
      { key: "atendimentos", label: "Atendimentos" },
      { key: "prontuarios", label: "Prontuários" },
    ],
  },
  {
    itemKey: "nav_management",
    label: "Gestão",
    icon: ACTION_ICONS.nav_management,
    subItems: [
      { key: "relatorios", label: "Relatórios" },
      { key: "cadastros", label: "Cadastros" },
    ],
  },
  {
    itemKey: "nav_quality",
    label: "Qualidade",
    icon: ACTION_ICONS.nav_quality,
  },
  {
    itemKey: "nav_billing",
    label: "Faturamento",
    icon: ACTION_ICONS.nav_billing,
  },
  { itemKey: "nav_system", label: "Sistema", icon: ACTION_ICONS.nav_system },
];

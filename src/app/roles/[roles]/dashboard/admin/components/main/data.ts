import type { LucideIcon } from "lucide-react";
import { ACTION_ICONS } from "./components/AdminQuickActionsNav/data";
import type { AdminActionKey } from "./components/AdminQuickActionsNav/data";

export type AdminAction = {
  itemKey: AdminActionKey;
  label: string;
  icon: LucideIcon;
  subItems?: { key: string; label: string }[];
};

export const ADMIN_ACTIONS: AdminAction[] = [
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
      { key: "gestao_leitos", label: "Gestão de Leitos" },
      { key: "triagem", label: "Triagem" },
      { key: "laboratorio", label: "Laboratório" },
      { key: "cuidados_enfermagem", label: "Cuidados de Enfermagem" },
      { key: "banco_sangue", label: "Banco de Sangue" },
      { key: "centro_cirurgico", label: "Centro Cirúrgico" },
      { key: "vacinacao", label: "Vacinação" },
    ],
  },
  {
    itemKey: "nav_management",
    label: "Gestão",
    icon: ACTION_ICONS.nav_management,
    subItems: [
      { key: "profissionais", label: "Profissionais" },
      { key: "agendamentos", label: "Agendamentos" },
      { key: "escalas_plantao", label: "Escalas/Plantões" },
      { key: "estoque_farmacia", label: "Estoque/Farmácia" },
      { key: "gestao_financeira", label: "Gestão Financeira" },
      { key: "relatorios_fluxo", label: "Relatórios de Fluxo" },
      { key: "regras_fluxo", label: "Regras de Fluxo" },
    ],
  },
  {
    itemKey: "nav_quality",
    label: "Qualidade",
    icon: ACTION_ICONS.nav_quality,
    subItems: [
      { key: "indicadores", label: "Indicadores" },
      { key: "satisfacao", label: "Satisfação" },
      { key: "auditoria", label: "Auditoria" },
      { key: "same_arquivo", label: "SAME (Arquivo)" },
    ],
  },
  {
    itemKey: "nav_billing",
    label: "Faturamento",
    icon: ACTION_ICONS.nav_billing,
    subItems: [
      { key: "relatorios_faturamento", label: "Relatórios" },
      { key: "tiss_operadoras", label: "TISS (Operadoras)" },
    ],
  },
  { itemKey: "nav_system", label: "Sistema", icon: ACTION_ICONS.nav_system },
];

// Chave para sessionStorage, seguindo padrão do projeto
export const ADMIN_DASHBOARD_ACTIVE_LABEL_KEY =
  "vida-plus:admin-dashboard:activeLabel";

// Valor padrão para activeLabel
export const DEFAULT_ACTIVE_LABEL = ADMIN_ACTIONS[0]?.label ?? "Início";

// Valor padrão para activeHomeKey
export const DEFAULT_ACTIVE_HOME_KEY = "overview";

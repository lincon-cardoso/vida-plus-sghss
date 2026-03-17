import { Bell, CheckCircle2, CircleX, Gauge, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BusinessRuleSummaryCard = {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  valueTone?: "danger";
};

export type RuleTabKey = "alertas" | "configuracoes" | "historico";

export type RuleSetting = {
  id: string;
  title: string;
  description: string;
  statusLabel: string;
  statusTone: "success" | "warning";
};

export type RuleHistoryItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

export const RULE_SUMMARY_CARDS: BusinessRuleSummaryCard[] = [
  {
    id: "compliance",
    label: "Taxa de Conformidade",
    value: "100.0%",
    helper: "0 de 0 dentro do prazo",
    icon: CheckCircle2,
  },
  {
    id: "alerts",
    label: "Alertas Ativos",
    value: "0",
    helper: "0 avisos, 0 críticos",
    icon: Bell,
  },
  {
    id: "violations",
    label: "Violações",
    value: "0",
    helper: "Pacientes acima do limite",
    icon: CircleX,
    valueTone: "danger",
  },
  {
    id: "auto-priority",
    label: "Auto-Priorização",
    value: "Ativa",
    helper: "Ajuste automático de prioridades",
    icon: TrendingUp,
  },
];

export const RULE_TABS: Array<{ key: RuleTabKey; label: string }> = [
  { key: "alertas", label: "Alertas Ativos" },
  { key: "configuracoes", label: "Configurações" },
  { key: "historico", label: "Histórico" },
];

export const RULE_SETTINGS: RuleSetting[] = [
  {
    id: "setting-1",
    title: "Tempo máximo por etapa",
    description:
      "Define o limite por setor para identificação de pacientes fora da meta operacional.",
    statusLabel: "Ativo",
    statusTone: "success",
  },
  {
    id: "setting-2",
    title: "Escalonamento automático",
    description:
      "Gera priorização quando um paciente excede o tempo previsto em etapas críticas.",
    statusLabel: "Monitorando",
    statusTone: "warning",
  },
  {
    id: "setting-3",
    title: "Alertas por conformidade",
    description:
      "Agrupa ocorrências por prazo, setor e especialidade para auditoria diária.",
    statusLabel: "Ativo",
    statusTone: "success",
  },
];

export const RULE_HISTORY: RuleHistoryItem[] = [
  {
    id: "history-1",
    title: "Regra de tempo revisada",
    description: "Limite de triagem mantido em 15 minutos sem novas violações.",
    timestamp: "16/03/2026 09:10",
  },
  {
    id: "history-2",
    title: "Auto-priorização confirmada",
    description: "Mecanismo automático validado para filas críticas de imagem.",
    timestamp: "15/03/2026 17:45",
  },
];

export const EMPTY_STATE_ICON = Gauge;

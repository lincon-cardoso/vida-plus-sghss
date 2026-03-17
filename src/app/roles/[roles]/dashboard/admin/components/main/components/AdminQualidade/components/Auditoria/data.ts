import {
  AlertTriangle,
  BadgePercent,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AuditSummaryCard = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "danger" | "success" | "warning" | "primary";
};

export type AuditCase = {
  id: string;
  priority: "Alta" | "Média";
  patient: string;
  insurance: string;
  period: string;
  billed: string;
  glosa: string;
  reason: string;
  statusLabel: string;
  statusTone: "warning" | "primary" | "success" | "secondary";
};

export const AUDIT_SUMMARY_CARDS: AuditSummaryCard[] = [
  {
    id: "glosas",
    label: "Total em Glosas",
    value: "R$ 2.900",
    icon: AlertTriangle,
    tone: "danger",
  },
  {
    id: "recuperado",
    label: "Recuperado",
    value: "R$ 500",
    icon: DollarSign,
    tone: "success",
  },
  {
    id: "pendente",
    label: "Pendente Análise",
    value: "R$ 1.200",
    icon: BadgePercent,
    tone: "warning",
  },
  {
    id: "taxa",
    label: "Taxa Recuperação",
    value: "17.2%",
    icon: TrendingUp,
    tone: "primary",
  },
];

export const AUDIT_CASES: AuditCase[] = [
  {
    id: "AUD-001",
    priority: "Alta",
    patient: "José Silva",
    insurance: "Unimed",
    period: "05/11/2024 - 08/11/2024",
    billed: "R$ 4.500",
    glosa: "R$ 1.200",
    reason: "Diárias não autorizadas",
    statusLabel: "Pendente Análise",
    statusTone: "warning",
  },
  {
    id: "AUD-002",
    priority: "Alta",
    patient: "Maria Santos",
    insurance: "Bradesco",
    period: "01/11/2024 - 03/11/2024",
    billed: "R$ 3.200",
    glosa: "R$ 800",
    reason: "Materiais não cobertos",
    statusLabel: "Analisado",
    statusTone: "primary",
  },
  {
    id: "AUD-003",
    priority: "Média",
    patient: "Pedro Lima",
    insurance: "SulAmérica",
    period: "28/10/2024 - 30/10/2024",
    billed: "R$ 2.100",
    glosa: "R$ 500",
    reason: "Procedimento duplicado",
    statusLabel: "Recuperado",
    statusTone: "success",
  },
  {
    id: "AUD-004",
    priority: "Média",
    patient: "Ana Costa",
    insurance: "Amil",
    period: "20/10/2024 - 22/10/2024",
    billed: "R$ 1.800",
    glosa: "R$ 400",
    reason: "Falta documentação",
    statusLabel: "Recurso Enviado",
    statusTone: "secondary",
  },
];

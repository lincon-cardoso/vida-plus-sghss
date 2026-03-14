import { AlertCircle, Calendar, Clock3, RefreshCcw, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ShiftSummaryCard = {
  id: string;
  title: string;
  value: number;
  icon: LucideIcon;
  tone: "primary" | "success" | "warning" | "danger";
};

export type ShiftPeriod = {
  id: string;
  label: "Manhã" | "Tarde" | "Noite";
  time: string;
  professional: string;
  specialty: string;
  tone: "morning" | "afternoon" | "night";
  statusLabel: string;
  actionIcon: LucideIcon;
};

export type MonthDay = {
  id: string;
  dayNumber: number;
  isCurrentMonth?: boolean;
  isHighlighted?: boolean;
};

export const SHIFT_SUMMARY_CARDS: ShiftSummaryCard[] = [
  {
    id: "month",
    title: "Plantões no Mês",
    value: 4,
    icon: Calendar,
    tone: "primary",
  },
  {
    id: "active",
    title: "Profissionais Ativos",
    value: 12,
    icon: Users,
    tone: "success",
  },
  {
    id: "pending",
    title: "Trocas Pendentes",
    value: 2,
    icon: Clock3,
    tone: "warning",
  },
  {
    id: "uncovered",
    title: "Descobertos",
    value: 0,
    icon: AlertCircle,
    tone: "danger",
  },
];

export const DAILY_SHIFTS: ShiftPeriod[] = [
  {
    id: "shift-morning",
    label: "Manhã",
    time: "07:00 - 13:00",
    professional: "Dr. João Silva",
    specialty: "Clínico Geral",
    tone: "morning",
    statusLabel: "Confirmado",
    actionIcon: RefreshCcw,
  },
  {
    id: "shift-afternoon",
    label: "Tarde",
    time: "13:00 - 19:00",
    professional: "Dra. Ana Costa",
    specialty: "Pediatria",
    tone: "afternoon",
    statusLabel: "Confirmado",
    actionIcon: RefreshCcw,
  },
  {
    id: "shift-night",
    label: "Noite",
    time: "19:00 - 07:00",
    professional: "Dr. Carlos Lima",
    specialty: "Emergência",
    tone: "night",
    statusLabel: "Confirmado",
    actionIcon: RefreshCcw,
  },
];

export const MONTH_WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const MONTH_DAYS: MonthDay[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: `day-${index + 1}`,
    dayNumber: index + 1,
    isCurrentMonth: true,
    isHighlighted: index + 1 === 6,
  }),
);

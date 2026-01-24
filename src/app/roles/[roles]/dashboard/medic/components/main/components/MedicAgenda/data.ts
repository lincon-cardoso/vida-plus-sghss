import type { LucideIcon } from "lucide-react";
import { AlertCircle, Calendar, Clock, Users } from "lucide-react";

/**
 * Tipos e dados estáticos para a seção de Escalas de Plantões.
 */

export type ShiftStat = {
  id: string;
  title: string;
  value: number;
  icon: LucideIcon;
  iconVariant:
    | "statIconPrimary"
    | "statIconSuccess"
    | "statIconWarning"
    | "statIconDanger";
};

export const shiftStats: ShiftStat[] = [
  {
    id: "month",
    title: "Plantões no Mês",
    value: 4,
    icon: Calendar,
    iconVariant: "statIconPrimary",
  },
  {
    id: "active",
    title: "Profissionais Ativos",
    value: 12,
    icon: Users,
    iconVariant: "statIconSuccess",
  },
  {
    id: "pending",
    title: "Trocas Pendentes",
    value: 2,
    icon: Clock,
    iconVariant: "statIconWarning",
  },
  {
    id: "uncovered",
    title: "Descobertos",
    value: 0,
    icon: AlertCircle,
    iconVariant: "statIconDanger",
  },
];

export type ShiftScheduleItem = {
  id: string;
  label: "Manhã" | "Tarde" | "Noite";
  time: string;
  doctorName: string;
  specialty: string;
  icon: LucideIcon;
  badgeVariant: "shiftMorning" | "shiftAfternoon" | "shiftNight";
};

export const shiftSchedule: { shifts: ShiftScheduleItem[] } = {
  shifts: [
    {
      id: "morning",
      label: "Manhã",
      time: "07:00 - 13:00",
      doctorName: "Dr. João Silva",
      specialty: "Clínico Geral",
      icon: Clock,
      badgeVariant: "shiftMorning",
    },
    {
      id: "afternoon",
      label: "Tarde",
      time: "13:00 - 19:00",
      doctorName: "Dra. Ana Costa",
      specialty: "Pediatria",
      icon: Clock,
      badgeVariant: "shiftAfternoon",
    },
    {
      id: "night",
      label: "Noite",
      time: "19:00 - 07:00",
      doctorName: "Dr. Carlos Lima",
      specialty: "Emergência",
      icon: Clock,
      badgeVariant: "shiftNight",
    },
  ],
};

import { Calendar, Check, CircleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppointmentSummaryCard = {
  key: "upcoming" | "completed" | "cancelled";
  label: string;
  value: number;
  icon: LucideIcon;
  tone: "primary" | "success" | "danger";
};

export type AppointmentTab = {
  key: "upcoming" | "history";
  label: string;
  count: number;
};

export type AppointmentHistoryItem = {
  id: string;
  professional: string;
  specialty: string;
  date: string;
  time: string;
  status: "realizada" | "cancelada";
  statusLabel: string;
};

export const APPOINTMENT_SUMMARY_CARDS: AppointmentSummaryCard[] = [
  {
    key: "upcoming",
    label: "Próximas",
    value: 0,
    icon: Calendar,
    tone: "primary",
  },
  {
    key: "completed",
    label: "Realizadas",
    value: 1,
    icon: Check,
    tone: "success",
  },
  {
    key: "cancelled",
    label: "Canceladas",
    value: 0,
    icon: CircleAlert,
    tone: "danger",
  },
];

export const APPOINTMENT_TABS: AppointmentTab[] = [
  { key: "upcoming", label: "Próximas", count: 0 },
  { key: "history", label: "Histórico", count: 1 },
];

export const APPOINTMENT_HISTORY: AppointmentHistoryItem[] = [
  {
    id: "appointment-1",
    professional: "Dra. Ana Costa Pereira",
    specialty: "Pediatria",
    date: "12/03/2026",
    time: "14:30",
    status: "realizada",
    statusLabel: "Realizada",
  },
];

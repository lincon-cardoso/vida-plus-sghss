import type { LucideIcon } from "lucide-react";
import { CheckSquare, Clock3, Scissors, UsersRound } from "lucide-react";

export type SurgicalSummaryTone = "info" | "warning" | "success" | "purple";

export type SurgicalSummaryCard = {
  key: "today" | "inProgress" | "availableRooms" | "activeTeams";
  label: string;
  value: number;
  icon: LucideIcon;
  tone: SurgicalSummaryTone;
};

export type SurgeryStatus = "em_andamento" | "agendada";

export type SurgeryItem = {
  id: string;
  status: SurgeryStatus;
  statusLabel: string;
  title: string;
  time: string;
  room: string;
  duration: string;
  patient: string;
  surgeon: string;
  anesthetist: string;
};

export const SURGICAL_SUMMARY: SurgicalSummaryCard[] = [
  {
    key: "today",
    label: "Cirurgias Hoje",
    value: 2,
    icon: Scissors,
    tone: "info",
  },
  {
    key: "inProgress",
    label: "Em Andamento",
    value: 1,
    icon: Clock3,
    tone: "warning",
  },
  {
    key: "availableRooms",
    label: "Salas Disponíveis",
    value: 3,
    icon: CheckSquare,
    tone: "success",
  },
  {
    key: "activeTeams",
    label: "Equipes Ativas",
    value: 8,
    icon: UsersRound,
    tone: "purple",
  },
];

export const SURGERY_AGENDA: SurgeryItem[] = [
  {
    id: "surgery-001",
    status: "em_andamento",
    statusLabel: "Em Andamento",
    title: "Colecistectomia Videolaparoscópica",
    time: "08:00",
    room: "Sala 1",
    duration: "2h",
    patient: "Maria Silva",
    surgeon: "Dr. Carlos Lima",
    anesthetist: "Dr. Pedro Costa",
  },
  {
    id: "surgery-002",
    status: "agendada",
    statusLabel: "Agendada",
    title: "Hérnia Inguinal",
    time: "14:00",
    room: "Sala 2",
    duration: "1h30",
    patient: "João Santos",
    surgeon: "Dr. Ana Paula",
    anesthetist: "Dra. Fernanda",
  },
];

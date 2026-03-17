import { Clock3, Star, Target, TrendingUp, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QualitySummaryCard = {
  id: string;
  label: string;
  value: string;
  goal: string;
  icon: LucideIcon;
  tone: "primary" | "success";
};

export type SatisfactionPoint = {
  month: string;
  nps: number;
};

export type WaitingTimePoint = {
  specialty: string;
  tempo: number;
};

export const QUALITY_SUMMARY_CARDS: QualitySummaryCard[] = [
  {
    id: "tempo-espera",
    label: "Tempo Médio de Espera",
    value: "18 min",
    goal: "Meta: < 30 min",
    icon: Clock3,
    tone: "primary",
  },
  {
    id: "ocupacao",
    label: "Taxa de Ocupação",
    value: "78%",
    goal: "Meta: 75-85%",
    icon: TrendingUp,
    tone: "primary",
  },
  {
    id: "nps",
    label: "NPS (Satisfação)",
    value: "87",
    goal: "Meta: > 80",
    icon: Star,
    tone: "success",
  },
  {
    id: "retorno",
    label: "Taxa de Retorno",
    value: "92%",
    goal: "Meta: > 85%",
    icon: UsersRound,
    tone: "success",
  },
  {
    id: "glosas",
    label: "Glosas Evitadas",
    value: "94%",
    goal: "Meta: > 90%",
    icon: Target,
    tone: "primary",
  },
];

export const SATISFACTION_DATA: SatisfactionPoint[] = [
  { month: "Jan", nps: 72 },
  { month: "Fev", nps: 76 },
  { month: "Mar", nps: 79 },
  { month: "Abr", nps: 81 },
  { month: "Mai", nps: 84 },
  { month: "Jun", nps: 87 },
];

export const WAITING_TIME_DATA: WaitingTimePoint[] = [
  { specialty: "Clínica", tempo: 14 },
  { specialty: "Pediatria", tempo: 19 },
  { specialty: "Cardiologia", tempo: 24 },
  { specialty: "Ortopedia", tempo: 16 },
];

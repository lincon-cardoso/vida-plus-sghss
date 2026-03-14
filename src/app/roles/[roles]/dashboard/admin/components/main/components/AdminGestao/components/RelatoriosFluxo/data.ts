import {
  Activity,
  AlertTriangle,
  Clock3,
  Download,
  HeartPulse,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FlowSummaryCard = {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

export type FlowTabKey =
  | "tempo-setor"
  | "distribuicao"
  | "gargalos"
  | "performance-medicos";

export type SectorTimePoint = {
  sector: string;
  tempoReal: number;
  meta: number;
  fill?: string;
};

export type DistributionPoint = {
  stage: string;
  pacientes: number;
};

export type BottleneckItem = {
  id: string;
  sector: string;
  issue: string;
  tempoMedio: string;
  severity: "normal" | "moderada" | "alta";
};

export type DoctorPerformanceItem = {
  id: string;
  doctor: string;
  specialty: string;
  avgMinutes: number;
  score: string;
};

export const FLOW_SUMMARY_CARDS: FlowSummaryCard[] = [
  {
    id: "transfers",
    label: "Total de Transferências",
    value: "0",
    helper: "0 em andamento",
    icon: UsersRound,
  },
  {
    id: "journeys",
    label: "Jornadas Concluídas",
    value: "0",
    helper: "Taxa: 0.0%",
    icon: Activity,
  },
  {
    id: "bottlenecks",
    label: "Gargalos Detectados",
    value: "0",
    helper: "Tudo normal",
    icon: AlertTriangle,
  },
  {
    id: "avg-time",
    label: "Tempo Médio Global",
    value: "0 min",
    helper: "Across all sectors",
    icon: Clock3,
  },
];

export const FLOW_TAB_ITEMS: Array<{ key: FlowTabKey; label: string }> = [
  { key: "tempo-setor", label: "Tempo por Setor" },
  { key: "distribuicao", label: "Distribuição" },
  { key: "gargalos", label: "Gargalos" },
  { key: "performance-medicos", label: "Performance Médicos" },
];

export const SECTOR_TIME_DATA: SectorTimePoint[] = [
  { sector: "Laboratório", tempoReal: 45, meta: 15, fill: "#4a7fe8" },
  { sector: "Imagem", tempoReal: 61, meta: 15, fill: "#8452ec" },
  { sector: "Cardiologia", tempoReal: 50, meta: 15, fill: "#e03f98" },
];

export const DISTRIBUTION_DATA: DistributionPoint[] = [
  { stage: "Recepção", pacientes: 18 },
  { stage: "Triagem", pacientes: 12 },
  { stage: "Exames", pacientes: 9 },
  { stage: "Consulta", pacientes: 7 },
];

export const BOTTLENECKS: BottleneckItem[] = [
  {
    id: "bottleneck-1",
    sector: "Imagem",
    issue: "Fila acima da meta para exames de tomografia",
    tempoMedio: "61 min",
    severity: "alta",
  },
  {
    id: "bottleneck-2",
    sector: "Cardiologia",
    issue: "Concentração de agendas no período da tarde",
    tempoMedio: "50 min",
    severity: "moderada",
  },
  {
    id: "bottleneck-3",
    sector: "Laboratório",
    issue: "Tempo controlado dentro do limite operacional",
    tempoMedio: "45 min",
    severity: "normal",
  },
];

export const DOCTOR_PERFORMANCE: DoctorPerformanceItem[] = [
  {
    id: "doctor-1",
    doctor: "Dra. Ana Costa",
    specialty: "Pediatria",
    avgMinutes: 18,
    score: "Excelente",
  },
  {
    id: "doctor-2",
    doctor: "Dr. Pedro Lima",
    specialty: "Ortopedia",
    avgMinutes: 26,
    score: "Bom",
  },
  {
    id: "doctor-3",
    doctor: "Dr. Carlos Mendes",
    specialty: "Neurologia",
    avgMinutes: 32,
    score: "Atenção",
  },
];

export const EXPORT_ICON = Download;
export const PERFORMANCE_ICON = HeartPulse;

import {
  CalendarDays,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BillingSummaryCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative";
  icon: LucideIcon;
  tone: "success" | "primary" | "secondary" | "warning";
};

export type MonthlyAttendancePoint = {
  month: string;
  consultas: number;
  exames: number;
};

export type BedOccupancyPoint = {
  day: string;
  ocupados: number;
  disponiveis: number;
};

export type SpecialtyPoint = {
  name: string;
  value: number;
  fill: string;
};

export type RevenueEvolutionPoint = {
  month: string;
  receita: number;
};

export type ProfessionalPerformanceItem = {
  id: string;
  position: number;
  professional: string;
  specialty: string;
  appointments: number;
  rating: number;
  revenue: string;
};

export type ExportAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  tone: "danger" | "success" | "primary";
};

export const BILLING_SUMMARY_CARDS: BillingSummaryCard[] = [
  {
    id: "revenue",
    label: "Receita Total",
    value: "R$ 720.000",
    delta: "+15.2%",
    deltaTone: "positive",
    icon: DollarSign,
    tone: "success",
  },
  {
    id: "appointments",
    label: "Total Consultas",
    value: "1.234",
    delta: "+8.4%",
    deltaTone: "positive",
    icon: CalendarDays,
    tone: "primary",
  },
  {
    id: "active-patients",
    label: "Pacientes Ativos",
    value: "3.456",
    delta: "+12.1%",
    deltaTone: "positive",
    icon: Users,
    tone: "secondary",
  },
  {
    id: "occupancy",
    label: "Taxa Ocupação",
    value: "84%",
    delta: "-2.3%",
    deltaTone: "negative",
    icon: TrendingUp,
    tone: "warning",
  },
];

export const MONTHLY_ATTENDANCE_DATA: MonthlyAttendancePoint[] = [
  { month: "Jan", consultas: 140, exames: 90 },
  { month: "Fev", consultas: 165, exames: 102 },
  { month: "Mar", consultas: 188, exames: 117 },
  { month: "Abr", consultas: 203, exames: 132 },
  { month: "Mai", consultas: 218, exames: 144 },
  { month: "Jun", consultas: 235, exames: 155 },
];

export const BED_OCCUPANCY_DATA: BedOccupancyPoint[] = [
  { day: "Seg", ocupados: 38, disponiveis: 12 },
  { day: "Ter", ocupados: 42, disponiveis: 8 },
  { day: "Qua", ocupados: 35, disponiveis: 15 },
  { day: "Qui", ocupados: 40, disponiveis: 10 },
  { day: "Sex", ocupados: 37, disponiveis: 13 },
  { day: "Sáb", ocupados: 30, disponiveis: 20 },
  { day: "Dom", ocupados: 28, disponiveis: 22 },
];

export const SPECIALTY_DATA: SpecialtyPoint[] = [
  { name: "Cardiologia 20%", value: 20, fill: "#2d72ec" },
  { name: "Pediatria 28%", value: 28, fill: "#39ab50" },
  { name: "Ortopedia 14%", value: 14, fill: "#ffab00" },
  { name: "Ginecologia 23%", value: 23, fill: "#8d3cf5" },
  { name: "Neurologia 15%", value: 15, fill: "#ff5036" },
];

export const REVENUE_EVOLUTION_DATA: RevenueEvolutionPoint[] = [
  { month: "Jan", receita: 450000 },
  { month: "Fev", receita: 520000 },
  { month: "Mar", receita: 585000 },
  { month: "Abr", receita: 612000 },
  { month: "Mai", receita: 680000 },
  { month: "Jun", receita: 730000 },
];

export const PROFESSIONAL_PERFORMANCE: ProfessionalPerformanceItem[] = [
  {
    id: "perf-1",
    position: 1,
    professional: "Dra. Ana Costa Pereira",
    specialty: "Pediatria",
    appointments: 203,
    rating: 4.9,
    revenue: "R$ 152.250",
  },
  {
    id: "perf-2",
    position: 2,
    professional: "Dr. João Santos Silva",
    specialty: "Cardiologia",
    appointments: 189,
    rating: 4.8,
    revenue: "R$ 141.750",
  },
  {
    id: "perf-3",
    position: 3,
    professional: "Dra. Mariana Souza",
    specialty: "Ginecologia",
    appointments: 167,
    rating: 4.9,
    revenue: "R$ 125.250",
  },
  {
    id: "perf-4",
    position: 4,
    professional: "Dr. Carlos Mendes",
    specialty: "Neurologia",
    appointments: 145,
    rating: 4.6,
    revenue: "R$ 108.750",
  },
  {
    id: "perf-5",
    position: 5,
    professional: "Dr. Pedro Lima Oliveira",
    specialty: "Ortopedia",
    appointments: 112,
    rating: 4.7,
    revenue: "R$ 84.000",
  },
];

export const EXPORT_ACTIONS: ExportAction[] = [
  {
    id: "pdf",
    label: "Relatório PDF Completo",
    icon: FileText,
    tone: "danger",
  },
  {
    id: "excel",
    label: "Planilha Excel",
    icon: FileSpreadsheet,
    tone: "success",
  },
  {
    id: "csv",
    label: "Dados CSV",
    icon: Download,
    tone: "primary",
  },
];

export const FILTER_ICON = Filter;
export const EXPORT_ICON = Download;
export const RATING_ICON = Star;

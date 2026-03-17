import { Clock3, FileSearch, FileText, FolderOpen, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SameSummaryCard = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "primary" | "neutral" | "success" | "warning";
};

export type RecordLocationTone =
  | "warning"
  | "primary"
  | "success"
  | "secondary";

export type MedicalRecordItem = {
  id: string;
  patient: string;
  cpf: string;
  lastAdmission: string;
  admissions: number;
  locationLabel: string;
  locationTone: RecordLocationTone;
  details: string;
};

export type DiagnosisItem = {
  id: string;
  code: string;
  label: string;
  total: number;
};

export type CensusItem = {
  id: string;
  label: string;
  value: string;
  tone: "primary" | "success" | "warning";
};

export const SAME_SUMMARY_CARDS: SameSummaryCard[] = [
  {
    id: "total",
    label: "Total Prontuários",
    value: "4",
    icon: FolderOpen,
    tone: "primary",
  },
  {
    id: "physical",
    label: "Arquivo Físico",
    value: "1",
    icon: MapPin,
    tone: "neutral",
  },
  {
    id: "digital",
    label: "Digitalizados",
    value: "1",
    icon: FileText,
    tone: "success",
  },
  {
    id: "borrowed",
    label: "Emprestados",
    value: "1",
    icon: Clock3,
    tone: "warning",
  },
];

export const MEDICAL_RECORDS: MedicalRecordItem[] = [
  {
    id: "PRO-123456",
    patient: "Maria Silva Santos",
    cpf: "123.456.789-00",
    lastAdmission: "12/11/2024",
    admissions: 3,
    locationLabel: "Emprestado",
    locationTone: "warning",
    details: "Com: Dr. João",
  },
  {
    id: "PRO-789012",
    patient: "José Carlos Lima",
    cpf: "987.654.321-00",
    lastAdmission: "08/11/2024",
    admissions: 5,
    locationLabel: "Arquivo Físico",
    locationTone: "primary",
    details: "Estante: A-12-05",
  },
  {
    id: "PRO-345678",
    patient: "Ana Paula Costa",
    cpf: "456.789.123-00",
    lastAdmission: "05/11/2024",
    admissions: 2,
    locationLabel: "Digital",
    locationTone: "success",
    details: "Disponível no sistema",
  },
  {
    id: "PRO-901234",
    patient: "Pedro Henrique",
    cpf: "321.654.987-00",
    lastAdmission: "01/11/2024",
    admissions: 1,
    locationLabel: "Digitalização",
    locationTone: "secondary",
    details: "Fila de indexação",
  },
];

export const DIAGNOSES: DiagnosisItem[] = [
  { id: "diag-1", code: "I10", label: "Hipertensão Essencial", total: 45 },
  { id: "diag-2", code: "E11", label: "Diabetes Mellitus Tipo 2", total: 38 },
  { id: "diag-3", code: "J06.9", label: "IVAS", total: 32 },
  { id: "diag-4", code: "K80", label: "Colelitíase", total: 28 },
];

export const RECORD_CENSUS: CensusItem[] = [
  {
    id: "census-1",
    label: "Arquivo Físico",
    value: "1 (25%)",
    tone: "primary",
  },
  { id: "census-2", label: "Digitalizados", value: "1 (25%)", tone: "success" },
  { id: "census-3", label: "Emprestados", value: "1 (25%)", tone: "warning" },
];

export const SAME_SEARCH_ICON = FileSearch;

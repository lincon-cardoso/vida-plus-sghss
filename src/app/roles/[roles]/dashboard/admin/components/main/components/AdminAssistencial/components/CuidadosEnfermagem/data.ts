import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle, Clock, User } from "lucide-react";

export type NursingSummaryTone = "success" | "danger" | "warning" | "info";

export type NursingSummaryCard = {
  key: "concluidos" | "urgentes" | "pendentes" | "ativos";
  label: string;
  value: number;
  icon: LucideIcon;
  tone: NursingSummaryTone;
};

export type NursingRecordStatus = "concluido" | "urgente";

export type NursingRecord = {
  id: string;
  bed: string;
  patientName: string;
  status: NursingRecordStatus;
  statusLabel: string;
  recordedAt: string;
  nurse: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  oxygenSaturation: string;
  observations: string;
};

export const NURSING_SUMMARY_CARDS: NursingSummaryCard[] = [
  {
    key: "concluidos",
    label: "Concluídos Hoje",
    value: 2,
    icon: CheckCircle,
    tone: "success",
  },
  {
    key: "urgentes",
    label: "Casos Urgentes",
    value: 1,
    icon: AlertCircle,
    tone: "danger",
  },
  {
    key: "pendentes",
    label: "Pendentes",
    value: 0,
    icon: Clock,
    tone: "warning",
  },
  {
    key: "ativos",
    label: "Pacientes Ativos",
    value: 1,
    icon: User,
    tone: "info",
  },
];

export const NURSING_RECORDS: NursingRecord[] = [
  {
    id: "care-102",
    bed: "Leito 102",
    patientName: "Maria Silva",
    status: "concluido",
    statusLabel: "Concluído",
    recordedAt: "13/11/2024 08:00",
    nurse: "Enf. Juliana Santos",
    temperature: "36.8°C",
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    oxygenSaturation: "98%",
    observations:
      "Paciente calma, orientada, aceitando dieta. Ferida cirúrgica sem sinais flogísticos.",
  },
  {
    id: "care-201",
    bed: "Leito 201",
    patientName: "João Santos",
    status: "concluido",
    statusLabel: "Concluído",
    recordedAt: "13/11/2024 09:30",
    nurse: "Enf. Carlos Mendes",
    temperature: "37.2°C",
    bloodPressure: "140/90 mmHg",
    heartRate: "88 bpm",
    oxygenSaturation: "96%",
    observations:
      "Paciente refere dor em MMII. Glicemia elevada, conforme protocolo administrado insulina. Orientado sobre dieta.",
  },
  {
    id: "care-105",
    bed: "Leito 105",
    patientName: "Ana Costa",
    status: "urgente",
    statusLabel: "Urgente",
    recordedAt: "13/11/2024 10:00",
    nurse: "Enf. Beatriz Lima",
    temperature: "38.5°C",
    bloodPressure: "110/70 mmHg",
    heartRate: "110 bpm",
    oxygenSaturation: "94%",
    observations:
      "Paciente febril, taquicárdica. Necessário avaliação médica urgente.",
  },
];

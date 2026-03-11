import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Droplet, Package2, TrendingDown } from "lucide-react";

export type BloodBankSummaryTone = "danger" | "warning" | "critical" | "info";

export type BloodBankSummaryCard = {
  key: "total" | "missing" | "expiring" | "transfusions";
  label: string;
  value: number;
  icon: LucideIcon;
  tone: BloodBankSummaryTone;
};

export type BloodTypeStock = {
  bloodType: string;
  availableBags: number;
  isCritical?: boolean;
};

export type StockStatus = "ok" | "baixo";

export type HemocomponentDetail = {
  id: string;
  bloodType: string;
  component: string;
  stock: number;
  minimum: number;
  expiring: number;
  status: StockStatus;
};

export type RequestTagTone =
  | "warning"
  | "purple"
  | "danger"
  | "blue"
  | "success";

export type BloodRequestTag = {
  label: string;
  tone: RequestTagTone;
};

export type TransfusionRequest = {
  id: string;
  patient: string;
  bloodType: string;
  component: string;
  bags: number;
  tags: BloodRequestTag[];
};

export const BLOOD_BANK_SUMMARY: BloodBankSummaryCard[] = [
  {
    key: "total",
    label: "Bolsas Totais",
    value: 45,
    icon: Droplet,
    tone: "danger",
  },
  {
    key: "missing",
    label: "Tipos em Falta",
    value: 1,
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    key: "expiring",
    label: "Vencendo",
    value: 2,
    icon: TrendingDown,
    tone: "critical",
  },
  {
    key: "transfusions",
    label: "Transfusões Hoje",
    value: 3,
    icon: Package2,
    tone: "info",
  },
];

export const BLOOD_TYPE_STOCK: BloodTypeStock[] = [
  { bloodType: "A+", availableBags: 18 },
  { bloodType: "A-", availableBags: 0 },
  { bloodType: "B+", availableBags: 4 },
  { bloodType: "B-", availableBags: 0 },
  { bloodType: "AB+", availableBags: 5 },
  { bloodType: "AB-", availableBags: 0 },
  { bloodType: "O+", availableBags: 15 },
  { bloodType: "O-", availableBags: 3, isCritical: true },
];

export const HEMOCOMPONENT_DETAILS: HemocomponentDetail[] = [
  {
    id: "detail-a+-conc",
    bloodType: "A+",
    component: "concentrado",
    stock: 12,
    minimum: 8,
    expiring: 2,
    status: "ok",
  },
  {
    id: "detail-a+-plasma",
    bloodType: "A+",
    component: "plasma",
    stock: 6,
    minimum: 4,
    expiring: 0,
    status: "ok",
  },
  {
    id: "detail-o--conc",
    bloodType: "O-",
    component: "concentrado",
    stock: 3,
    minimum: 6,
    expiring: 0,
    status: "baixo",
  },
  {
    id: "detail-o+-conc",
    bloodType: "O+",
    component: "concentrado",
    stock: 15,
    minimum: 10,
    expiring: 0,
    status: "ok",
  },
  {
    id: "detail-b+-plat",
    bloodType: "B+",
    component: "plaquetas",
    stock: 4,
    minimum: 3,
    expiring: 0,
    status: "ok",
  },
  {
    id: "detail-ab+-conc",
    bloodType: "AB+",
    component: "concentrado",
    stock: 5,
    minimum: 4,
    expiring: 0,
    status: "ok",
  },
];

export const TRANSFUSION_REQUESTS: TransfusionRequest[] = [
  {
    id: "TRF-001",
    patient: "Maria Silva",
    bloodType: "A+",
    component: "Concentrado de Hemácias",
    bags: 2,
    tags: [
      { label: "Urgente", tone: "warning" },
      { label: "Prova Cruzada", tone: "purple" },
    ],
  },
  {
    id: "TRF-002",
    patient: "José Santos",
    bloodType: "O-",
    component: "Concentrado de Hemácias",
    bags: 1,
    tags: [
      { label: "Emergência", tone: "danger" },
      { label: "Tipagem", tone: "blue" },
    ],
  },
  {
    id: "TRF-003",
    patient: "Pedro Lima",
    bloodType: "B+",
    component: "Plaquetas",
    bags: 1,
    tags: [
      { label: "Rotina", tone: "blue" },
      { label: "Liberado", tone: "success" },
    ],
  },
];

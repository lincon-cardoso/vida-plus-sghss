import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TissSummaryCard = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "warning" | "primary" | "success" | "danger";
};

export type TissGuideStatusTone = "approved" | "sent" | "pending" | "denied";

export type TissGuideTypeTone =
  | "consulta"
  | "sadt"
  | "internacao"
  | "honorarios";

export type TissGuide = {
  id: string;
  code: string;
  type: string;
  typeTone: TissGuideTypeTone;
  patient: string;
  insurance: string;
  procedure: string;
  date: string;
  value: string;
  status: string;
  statusTone: TissGuideStatusTone;
};

export const TISS_SUMMARY_CARDS: TissSummaryCard[] = [
  {
    id: "to-send",
    label: "A Enviar",
    value: "R$ 4.500,00",
    icon: Clock3,
    tone: "warning",
  },
  {
    id: "sent",
    label: "Enviado",
    value: "R$ 1.200,00",
    icon: Plane,
    tone: "primary",
  },
  {
    id: "approved",
    label: "Aprovado",
    value: "R$ 3.450,00",
    icon: CheckCircle2,
    tone: "success",
  },
  {
    id: "glosas",
    label: "Glosas",
    value: "R$ 200,00",
    icon: AlertTriangle,
    tone: "danger",
  },
];

export const TISS_GUIDES: TissGuide[] = [
  {
    id: "001",
    code: "001",
    type: "Consulta",
    typeTone: "consulta",
    patient: "Maria Silva",
    insurance: "Unimed",
    procedure: "Consulta Cardiologia",
    date: "12/11/2024",
    value: "R$ 250,00",
    status: "Aprovado",
    statusTone: "approved",
  },
  {
    id: "002",
    code: "002",
    type: "SADT",
    typeTone: "sadt",
    patient: "João Santos",
    insurance: "Bradesco Saúde",
    procedure: "Ressonância Magnética",
    date: "11/11/2024",
    value: "R$ 1.200,00",
    status: "Enviado",
    statusTone: "sent",
  },
  {
    id: "003",
    code: "003",
    type: "Internação",
    typeTone: "internacao",
    patient: "Ana Costa",
    insurance: "SulAmérica",
    procedure: "Internação UTI (3 dias)",
    date: "10/11/2024",
    value: "R$ 4.500,00",
    status: "Pendente",
    statusTone: "pending",
  },
  {
    id: "004",
    code: "004",
    type: "Consulta",
    typeTone: "consulta",
    patient: "Pedro Lima",
    insurance: "Amil",
    procedure: "Consulta Ortopedia",
    date: "09/11/2024",
    value: "R$ 200,00",
    status: "Glosado",
    statusTone: "denied",
  },
  {
    id: "005",
    code: "005",
    type: "Honorários",
    typeTone: "honorarios",
    patient: "Carlos Souza",
    insurance: "Porto Seguro",
    procedure: "Cirurgia Hérnia",
    date: "08/11/2024",
    value: "R$ 3.200,00",
    status: "Aprovado",
    statusTone: "approved",
  },
];

export const GENERATE_BATCH_ICON = Plane;
export const GUIDE_FILE_ICON = FileText;
export const GUIDE_DOWNLOAD_ICON = Download;
export const GLOSA_ALERT_ICON = AlertTriangle;

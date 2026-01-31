import type { LucideIcon } from "lucide-react";
import {
  FileText,
  BarChart2,
  Clock,
  Users,
  Activity,
  DollarSign,
} from "lucide-react";

export type AdminHomeReport = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ADMIN_HOME_REPORTS: AdminHomeReport[] = [
  {
    id: "ans",
    title: "Indicadores ANS",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: FileText,
  },
  {
    id: "ocupacao",
    title: "Taxa de Ocupação",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: BarChart2,
  },
  {
    id: "tempo-espera",
    title: "Tempo Médio de Espera",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: Clock,
  },
  {
    id: "satisfacao",
    title: "Satisfação do Paciente (NPS)",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: Activity,
  },
  {
    id: "producao",
    title: "Produção Médica",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: Users,
  },
  {
    id: "custos",
    title: "Custos por Setor",
    description: "Gerar relatório detalhado PDF/Excel",
    icon: DollarSign,
  },
];

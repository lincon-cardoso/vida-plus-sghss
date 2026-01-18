import type { ComponentType, SVGProps } from "react";
import {
  Clock,
  Phone,
  Users,
  Stethoscope,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export type IconProp = SVGProps<SVGSVGElement> & { size?: number | string };

export interface Stat {
  id: string;
  value: number;
  label: string;
  meta: string;
  Icon: ComponentType<IconProp>;
}

export interface QueueItem {
  position: number;
  name: string;
  meta: string;
  time: string;
  isUrgent: boolean;
}

export interface MedicMonitorProps {
  stats?: Stat[];
  queue?: QueueItem[];
}

export const defaultStats: Stat[] = [
  {
    id: "waiting",
    value: 2,
    label: "Aguardando",
    meta: "Pacientes na fila",
    Icon: Clock,
  },
  {
    id: "calling",
    value: 0,
    label: "Chamando",
    meta: "Sendo chamados",
    Icon: Phone,
  },
  {
    id: "ready",
    value: 0,
    label: "Prontos",
    meta: "Para atendimento",
    Icon: Users,
  },
  {
    id: "inService",
    value: 0,
    label: "Em Atendimento",
    meta: "Atendimentos ativos",
    Icon: Stethoscope,
  },
  {
    id: "done",
    value: 0,
    label: "Concluídos",
    meta: "Hoje",
    Icon: CheckCircle,
  },
  {
    id: "total",
    value: 2,
    label: "Total",
    meta: "Na fila",
    Icon: TrendingUp,
  },
];

export const defaultQueue: QueueItem[] = [
  {
    position: 1,
    name: "MARIA SILVA",
    meta: "Q1 • Clínica Geral",
    time: "08:30",
    isUrgent: true,
  },
  {
    position: 2,
    name: "JOÃO SANTOS",
    meta: "Q2 • Endocrinologia",
    time: "09:15",
    isUrgent: false,
  },
];

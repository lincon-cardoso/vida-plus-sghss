import type { LucideIcon } from "lucide-react";
import { Video, MessageSquare, Clock, User } from "lucide-react";

/**
 * Tipos e dados estáticos para o componente MedicTeleconsulta.
 * Mantidos fora do componente para facilitar testes e reutilização.
 */

export type TeleconsultaConfig = {
  maxDuration: number; // em minutos
  defaultVideoQuality: "HD" | "SD";
  enableRecording: boolean;
};

export type PatientInfo = {
  id: string;
  name: string;
  age: number;
  condition: string;
  avatar?: string;
};

export type CallAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  action: "toggleCamera" | "toggleMic" | "shareScreen" | "chat" | "endCall";
  isToggle?: boolean;
  defaultState?: boolean;
};

export const teleconsultaConfig: TeleconsultaConfig = {
  maxDuration: 60,
  defaultVideoQuality: "HD",
  enableRecording: false,
};

export const mockPatient: PatientInfo = {
  id: "patient-001",
  name: "João Silva",
  age: 45,
  condition: "Consulta de rotina",
};

export const callActions: CallAction[] = [
  {
    id: "camera",
    label: "Câmera",
    icon: Video,
    action: "toggleCamera",
    isToggle: true,
    defaultState: true,
  },
  {
    id: "mic",
    label: "Microfone",
    icon: MessageSquare, // Usando MessageSquare como placeholder, ajustar se necessário
    action: "toggleMic",
    isToggle: true,
    defaultState: true,
  },
  {
    id: "screen",
    label: "Compartilhar Tela",
    icon: Clock, // Placeholder
    action: "shareScreen",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
    action: "chat",
  },
  {
    id: "end",
    label: "Encerrar Chamada",
    icon: User, // Placeholder
    action: "endCall",
  },
];

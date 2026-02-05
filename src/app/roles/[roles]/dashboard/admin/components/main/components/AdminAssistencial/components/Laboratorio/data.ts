import type { LucideIcon } from "lucide-react";
import { Droplet, Image, Heart } from "lucide-react";

export type LabPriority = "rotina" | "urgente";
export type LabStatus = "aguardando" | "em_analise" | "concluido";

export type LabItem = {
  id: string;
  patient: string;
  status: LabStatus;
  priority?: LabPriority;
  type: "Sangue" | "Imagem" | "Cardio" | string;
  title: string;
  requestedBy: string;
  requestedAt: string; // ISO date
  justification?: string;
  result?: string;
  icon?: LucideIcon;
};

export const LAB_ITEMS: LabItem[] = [
  {
    id: "lab-1",
    patient: "Maria Silva",
    status: "aguardando",
    priority: "rotina",
    type: "Sangue",
    title: "Hemograma Completo",
    requestedBy: "Dr. Carlos Santos",
    requestedAt: "2024-11-12T09:00:00",
    justification:
      "Acompanhamento de rotina para controle de hipertensão arterial",
    icon: Droplet,
  },
  {
    id: "lab-2",
    patient: "João Santos",
    status: "em_analise",
    priority: "rotina",
    type: "Sangue",
    title: "Glicemia em Jejum",
    requestedBy: "Dra. Ana Paula",
    requestedAt: "2024-11-12T10:30:00",
    justification: "Controle glicêmico - paciente diabético tipo 2",
    icon: Droplet,
  },
  {
    id: "lab-3",
    patient: "Maria Silva",
    status: "concluido",
    priority: "rotina",
    type: "Imagem",
    title: "Raio-X de Tórax (PA e Perfil)",
    requestedBy: "Dr. Carlos Santos",
    requestedAt: "2024-11-10T14:15:00",
    justification: "Investigação de tosse persistente há 3 semanas",
    result:
      "Campos pulmonares livres, sem sinais de consolidação ou derrame. Área cardíaca dentro dos limites da normalidade. Conclusão: Radiografia de tórax sem alterações significativas.",
    icon: Image,
  },
  {
    id: "lab-4",
    patient: "Ana Costa",
    status: "concluido",
    priority: "urgente",
    type: "Cardio",
    title: "Eletrocardiograma (ECG)",
    requestedBy: "Dr. Roberto Lima",
    requestedAt: "2024-11-04T16:30:00",
    justification:
      "Primeira consulta cardiológica - paciente relata palpitações",
    result:
      "Ritmo sinusal regular. Frequência cardíaca: 78 bpm. Eixo elétrico normal. Ausência de arritmias.",
    icon: Heart,
  },
  {
    id: "lab-5",
    patient: "João Santos",
    status: "concluido",
    priority: "rotina",
    type: "Sangue",
    title: "Hemoglobina Glicada (HbA1c)",
    requestedBy: "Dra. Ana Paula",
    requestedAt: "2024-11-05T09:45:00",
    justification: "Avaliação do controle glicêmico dos últimos 3 meses",
    result:
      "HbA1c: 6.8% - Resultado indica controle glicêmico adequado. Valor de referência: <7% para diabéticos.",
    icon: Droplet,
  },
];

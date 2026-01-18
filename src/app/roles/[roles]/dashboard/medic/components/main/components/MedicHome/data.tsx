import type { ReactNode } from "react";
import { Calendar, Users, TrendingUp, Clock, Check } from "lucide-react";

/**
 * Tipos de dado e dados estáticos para os cards do Dashboard do Médico.
 * Mantidos fora do componente para facilitar testes e reutilização.
 */
export type StatItem = {
  id: string;
  title: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  variant: "Blue" | "Green" | "Purple" | "Yellow";
};

export const stats: StatItem[] = [
  {
    id: "consultas",
    title: "Consultas Hoje",
    value: 8,
    subtext: "3 pendentes",
    icon: <Calendar size={20} aria-hidden />,
    variant: "Blue",
  },
  {
    id: "pacientes",
    title: "Pacientes Ativos",
    value: 145,
    subtext: "+12 este mês",
    icon: <Users size={20} aria-hidden />,
    variant: "Green",
  },
  {
    id: "satisfacao",
    title: "Taxa de Satisfação",
    value: "4.8",
    subtext: "★ de 5.0",
    icon: <TrendingUp size={20} aria-hidden />,
    variant: "Purple",
  },
  {
    id: "horas",
    title: "Horas Trabalhadas",
    value: "32h",
    subtext: "Esta semana",
    icon: <Clock size={20} aria-hidden />,
    variant: "Yellow",
  },
];

export type Appointment = {
  id: string;
  time: string;
  patient: string;
  type: string;
  status: "done" | "in-progress" | "scheduled";
};

export const appointments: Appointment[] = [
  {
    id: "a1",
    time: "09:00",
    patient: "Maria Silva Santos",
    type: "Consulta",
    status: "done",
  },
  {
    id: "a2",
    time: "10:00",
    patient: "Carlos Oliveira",
    type: "Retorno",
    status: "done",
  },
  {
    id: "a3",
    time: "11:00",
    patient: "Ana Paula Costa",
    type: "Consulta",
    status: "in-progress",
  },
  {
    id: "a4",
    time: "14:00",
    patient: "Pedro Souza",
    type: "Teleconsulta",
    status: "scheduled",
  },
  {
    id: "a5",
    time: "15:00",
    patient: "Juliana Martins",
    type: "Consulta",
    status: "scheduled",
  },
  {
    id: "a6",
    time: "16:00",
    patient: "Roberto Silva",
    type: "Retorno",
    status: "scheduled",
  },
];

export type Pending = {
  id: string;
  title: string;
  count: number;
  variant: "Danger" | "Warning" | "Neutral";
};

export const pendencias: Pending[] = [
  { id: "p1", title: "laudos para assinar", count: 3, variant: "Danger" },
  { id: "p2", title: "prescrições pendentes", count: 5, variant: "Warning" },
  { id: "p3", title: "pacientes em espera", count: 2, variant: "Neutral" },
];

export const performance = [
  { id: "pf1", label: "Consultas realizadas", value: "89" },
  { id: "pf2", label: "Avaliação média", value: "4.8 ★" },
  { id: "pf3", label: "Taxa de retorno", value: "78%" },
];

export type Patient = {
  id: string;
  name: string;
  diagnosis: string;
  lastVisit: string;
  status: { label: string; variant: "Success" | "Info" | "Warning" };
};

export const recentPatients: Patient[] = [
  {
    id: "r1",
    name: "Maria Silva Santos",
    diagnosis: "Hipertensão",
    lastVisit: "Hoje, 09:00",
    status: { label: "Estável", variant: "Success" },
  },
  {
    id: "r2",
    name: "Carlos Oliveira",
    diagnosis: "Pós-operatório",
    lastVisit: "Hoje, 10:00",
    status: { label: "Melhorando", variant: "Info" },
  },
  {
    id: "r3",
    name: "Ana Paula Costa",
    diagnosis: "Diabetes Tipo 2",
    lastVisit: "08/11/2024",
    status: { label: "Em Observação", variant: "Warning" },
  },
];

export type ActionItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

export const actions: ActionItem[] = [
  { id: "a1", label: "Ver Pacientes", icon: <Users size={20} aria-hidden /> },
  { id: "a2", label: "Minha Agenda", icon: <Calendar size={20} aria-hidden /> },
  { id: "a3", label: "Assinar Laudos", icon: <Check size={20} aria-hidden /> },
  { id: "a4", label: "Relatórios", icon: <TrendingUp size={20} aria-hidden /> },
];

export const mockDoctorName = "Dr. João Silva";
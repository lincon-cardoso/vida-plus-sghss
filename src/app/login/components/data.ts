import type { LucideIcon } from "lucide-react";
import { User, Stethoscope, Shield, Calendar } from "lucide-react";

/**
 * Dados estáticos e tipos para a área de login.
 * Mantido fora dos componentes para facilitar testes e reuso.
 */
export type Role = {
  id: "patient" | "doctor" | "admin";
  label: string;
  icon: LucideIcon;
  description?: string;
};

export const roles: Role[] = [
  { id: "patient", label: "Paciente", icon: User },
  { id: "doctor", label: "Profissional", icon: Stethoscope },
  { id: "admin", label: "Gestor", icon: Shield },
];

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    id: "telemedicina",
    title: "Telemedicina Integrada",
    description: "Consultas online seguras e eficientes",
    icon: Stethoscope,
  },
  {
    id: "seguranca",
    title: "Segurança Avançada",
    description: "Dados protegidos com criptografia LGPD",
    icon: Shield,
  },
  {
    id: "agendamento",
    title: "Agendamento Inteligente",
    description: "Gestão completa de consultas e exames",
    icon: Calendar,
  },
];

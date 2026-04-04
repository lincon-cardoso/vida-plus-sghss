import type { LucideIcon } from "lucide-react";
import { User, Stethoscope, Shield, Calendar } from "lucide-react";
import type { AppRole } from "@/lib/roles";

// Tipos usados para manter os perfis e os cards de destaque consistentes.
export type Role = {
  id: AppRole;
  label: string;
  icon: LucideIcon;
  description?: string;
};

// Perfis que o usuario pode selecionar antes de entrar no sistema.
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

// Beneficios mostrados no cabeçalho para resumir o valor da plataforma.
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

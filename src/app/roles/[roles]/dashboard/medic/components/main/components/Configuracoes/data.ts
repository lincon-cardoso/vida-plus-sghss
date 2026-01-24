import type { LucideIcon } from "lucide-react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Mail,
  Smartphone,
  Phone,
  Sun,
} from "lucide-react";

/**
 * Tipos e dados estáticos para a seção de Configurações.
 */
export type ConfigItem = {
  id: "perfil" | "notificacoes" | "seguranca" | "idioma" | "aparencia";
  label: string;
  Icon: LucideIcon;
};

export const configItems: ConfigItem[] = [
  { id: "perfil", label: "Perfil", Icon: User },
  { id: "notificacoes", label: "Notificações", Icon: Bell },
  { id: "seguranca", label: "Segurança", Icon: Shield },
  { id: "idioma", label: "Idioma e Região", Icon: Globe },
  { id: "aparencia", label: "Aparência", Icon: Moon },
];

/* Idioma (exportado para `Idioma.tsx`) */
export type Language = {
  code: string;
  label: string;
  sub: string;
  flag: string;
};
export const LANGUAGES: Language[] = [
  { code: "pt-BR", label: "Português (Brasil)", sub: "Portuguese", flag: "🇧🇷" },
  { code: "en-US", label: "Inglês (EUA)", sub: "English", flag: "🇺🇸" },
  { code: "es-ES", label: "Espanhol", sub: "Español", flag: "🇪🇸" },
  { code: "fr-FR", label: "Francês", sub: "Français", flag: "🇫🇷" },
];

export const COUNTRIES = [
  { code: "BR", label: "Brasil" },
  { code: "US", label: "Estados Unidos" },
  { code: "ES", label: "Espanha" },
];

export const STATES_BY_COUNTRY: Record<string, string[]> = {
  BR: ["São Paulo", "Rio de Janeiro"],
  US: ["New York", "California"],
  ES: ["Madrid"],
};

export const CITIES_BY_STATE: Record<string, string[]> = {
  "São Paulo": ["São Paulo"],
  "Rio de Janeiro": ["Rio de Janeiro"],
  "New York": ["New York"],
  California: ["Los Angeles"],
  Madrid: ["Madrid"],
};

export const DATE_FORMATS = [
  { id: "DD/MM/YYYY", label: "DD/MM/AAAA" },
  { id: "MM/DD/YYYY", label: "MM/DD/AAAA" },
  { id: "YYYY-MM-DD", label: "AAAA-MM-DD" },
];

export const TIME_FORMATS = [
  { id: "24h", label: "24 horas" },
  { id: "12h", label: "12 horas" },
];

export const WEEK_STARTS = [
  { id: "sunday", label: "Domingo" },
  { id: "monday", label: "Segunda-feira" },
];

/* Notificações (exportado para `Notificacoes.tsx`) */
export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  defaultValue?: boolean;
  ariaLabel?: string;
};

export type NotificationGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: NotificationItem[];
};

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    id: "email",
    title: "Notificações por E-mail",
    icon: Mail,
    items: [
      {
        id: "confirmacaoConsultas",
        title: "Confirmação de consultas",
        description: "Receba e-mail quando sua consulta for confirmada",
        defaultValue: true,
        ariaLabel: "Ativar confirmações de consultas por e-mail",
      },
      {
        id: "lembretesConsultas",
        title: "Lembretes de consultas",
        description: "Receba lembretes 24 horas antes de cada consulta",
        defaultValue: true,
        ariaLabel: "Ativar lembretes de consultas por e-mail",
      },
      {
        id: "resultadosExames",
        title: "Resultados de exames",
        description:
          "Notificação quando novos resultados estiverem disponíveis",
        defaultValue: true,
        ariaLabel: "Ativar notificações de resultados de exames por e-mail",
      },
      {
        id: "receitasMedicas",
        title: "Receitas médicas",
        description: "Aviso quando uma nova prescrição for emitida",
        defaultValue: true,
        ariaLabel: "Ativar notificações de receitas médicas por e-mail",
      },
    ],
  },
  {
    id: "push",
    title: "Notificações Push",
    icon: Smartphone,
    items: [
      {
        id: "mensagensMedico",
        title: "Mensagens do médico",
        description: "Notificações instantâneas de mensagens da equipe médica",
        defaultValue: true,
        ariaLabel: "Ativar mensagens do médico por push",
      },
      {
        id: "atualizacoesFila",
        title: "Atualizações de fila",
        description: "Atualizações sobre sua posição na fila de atendimento",
        defaultValue: false,
        ariaLabel: "Ativar atualizações de fila por push",
      },
      {
        id: "promocoesNovidades",
        title: "Promoções e novidades",
        description:
          "Receba informações sobre novos serviços e campanhas de saúde",
        defaultValue: false,
        ariaLabel: "Ativar promoções e novidades por push",
      },
    ],
  },
  {
    id: "sms",
    title: "Notificações por SMS",
    icon: Phone,
    items: [
      {
        id: "lembretesUrgentes",
        title: "Lembretes urgentes",
        description: "SMS para consultas e exames importantes",
        defaultValue: true,
        ariaLabel: "Ativar lembretes urgentes por SMS",
      },
      {
        id: "alteracoesHorario",
        title: "Alterações de horário",
        description: "Aviso por SMS em caso de remarcarão",
        defaultValue: true,
        ariaLabel: "Ativar alterações de horário por SMS",
      },
    ],
  },
];

/* Aparência (exportado para `Aparencia.tsx`) */
export const THEME_OPTIONS = [
  {
    id: "light",
    title: "Modo Claro",
    description: "Interface clara e vibrante",
    Icon: Sun,
  },
  {
    id: "dark",
    title: "Modo Escuro",
    description: "Reduz o brilho da tela",
    Icon: Moon,
  },
];

export const FONT_SIZES = ["Pequeno", "Médio", "Grande"] as const;

/* Segurança (exportado para `Seguranca.tsx`) */
export type Session = {
  id: string;
  device: string;
  location: string;
  time: string;
  current?: boolean;
};

export const INITIAL_SESSIONS: Session[] = [
  {
    id: "s1",
    device: "Chrome no Windows",
    location: "São Paulo, Brasil",
    time: "Agora",
    current: true,
  },
  {
    id: "s2",
    device: "Safari no iPhone",
    location: "São Paulo, Brasil",
    time: "2 horas atrás",
  },
  {
    id: "s3",
    device: "Firefox no Windows",
    location: "São Paulo, Brasil",
    time: "1 dia atrás",
  },
];

import type { LucideIcon } from "lucide-react";
import {
  Home,
  Monitor,
  Stethoscope,
  Video,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";

export type MedicActionKey =
  | "nav_home"
  | "nav_monitor"
  | "nav_stetho"
  | "nav_video"
  | "nav_calendar"
  | "nav_settings"
  | "nav_logout";

export type MedicSubItem = {
  key: string;
  label: string;
};

export type MedicAction = {
  itemKey: MedicActionKey;
  label: string;
  color?: string;
  subItems?: MedicSubItem[];
  icon?: LucideIcon;
};

export const ACTION_ICONS: Record<MedicActionKey, LucideIcon> = {
  nav_home: Home,
  nav_monitor: Monitor,
  nav_stetho: Stethoscope,
  nav_video: Video,
  nav_calendar: Calendar,
  nav_settings: Settings,
  nav_logout: LogOut,
};

export const DEFAULT_ACTIONS: MedicAction[] = [
  { itemKey: "nav_home", label: "Home", icon: ACTION_ICONS.nav_home },
  {
    itemKey: "nav_monitor",
    label: "Monitor",
    icon: ACTION_ICONS.nav_monitor,
  },
  {
    itemKey: "nav_stetho",
    label: "Atendimento",
    icon: ACTION_ICONS.nav_stetho,
    subItems: [
      { key: "in_service", label: "Em Atendimento" },
      { key: "my_patients", label: "Meus Pacientes" },
    ],
  },
  {
    itemKey: "nav_video",
    label: "Teleconsulta",
    icon: ACTION_ICONS.nav_video,
  },
  {
    itemKey: "nav_calendar",
    label: "Agenda",
    icon: ACTION_ICONS.nav_calendar,
  },
  {
    itemKey: "nav_settings",
    label: "Configurações",
    icon: ACTION_ICONS.nav_settings,
  },
];

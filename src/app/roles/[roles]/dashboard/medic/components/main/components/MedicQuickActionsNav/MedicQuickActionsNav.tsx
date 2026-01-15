"use client";

import {
  Home,
  Monitor,
  Stethoscope,
  Video,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import type { RefObject } from "react";
import styles from "./MedicQuickActionsNav.module.scss";

export type MedicActionKey =
  | "nav_home"
  | "nav_monitor"
  | "nav_stetho"
  | "nav_video"
  | "nav_calendar"
  | "nav_settings"
  | "nav_logout";

export type MedicAction = {
  itemKey: MedicActionKey;
  label: string;
  color?: string;
};

type Props = {
  id?: string;
  actions?: MedicAction[]; // optional, component has sensible defaults
  menuRef?: RefObject<HTMLElement | null>;
  activeLabel?: string;
  onActionClick?: (action: MedicAction) => void;
  isExpanded?: boolean;
};

function getIcon(itemKey: MedicActionKey) {
  switch (itemKey) {
    case "nav_home":
      return Home;
    case "nav_monitor":
      return Monitor;
    case "nav_stetho":
      return Stethoscope;
    case "nav_video":
      return Video;
    case "nav_calendar":
      return Calendar;
    case "nav_settings":
      return Settings;
    case "nav_logout":
      return LogOut;
  }
}

const DEFAULT_ACTIONS: MedicAction[] = [
  { itemKey: "nav_home", label: "Home" },
  { itemKey: "nav_monitor", label: "Monitor" },
  { itemKey: "nav_stetho", label: "Atendimento" },
  { itemKey: "nav_video", label: "Teleconsulta" },
  { itemKey: "nav_calendar", label: "Agenda" },
  { itemKey: "nav_settings", label: "Configurações" },
];

export default function MedicQuickActionsNav({
  id,
  actions = DEFAULT_ACTIONS,
  menuRef,
  activeLabel,
  onActionClick,
  isExpanded = false,
}: Props) {
  return (
    <nav
      id={id ?? "medic-menu"}
      ref={menuRef}
      tabIndex={-1}
      className={`${styles.root} ${isExpanded ? styles.expanded : ""}`}
      aria-label="Navegação do médico"
    >
      <div className={styles.top}>
        <ul className={styles.iconList}>
          {actions.map((action) => {
            const { label } = action;
            const Icon = getIcon(action.itemKey);
            const isActive = activeLabel === label;

            return (
              <li key={action.itemKey}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={label}
                  data-active={isActive ? "true" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onActionClick?.(action)}
                >
                  {Icon ? <Icon className={styles.icon} /> : null}
                  {isExpanded && <span className={styles.label}>{label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.separator} aria-hidden />

      <div className={styles.bottom}>
        <ul className={styles.iconList}>
          <li>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.logout}`}
              aria-label="Sair"
              onClick={() =>
                onActionClick?.({ itemKey: "nav_logout", label: "Sair" })
              }
            >
              <LogOut className={styles.icon} />
              {isExpanded && <span className={styles.label}>Sair</span>}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

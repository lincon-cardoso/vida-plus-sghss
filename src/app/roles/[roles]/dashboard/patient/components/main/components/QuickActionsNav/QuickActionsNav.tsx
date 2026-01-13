"use client";

import { Calendar, Home, LogOut, Settings, Users } from "lucide-react";
import type { RefObject } from "react";
import styles from "../../styles/PatientMenu.module.scss";

export type QuickActionKey =
  | "nav_dashboard"
  | "nav_prontuario"
  | "nav_agendamentos"
  | "nav_config"
  | "nav_logout";

export type QuickAction = {
  itemKey: QuickActionKey;
  label: string;
  color?: string;
};

type Props = {
  id?: string;
  actions: QuickAction[];
  menuRef?: RefObject<HTMLElement | null>;
  activeLabel?: string;
  onActionClick?: (action: QuickAction) => void;
};

export default function QuickActionsNav({
  id,
  actions,
  menuRef,
  activeLabel,
  onActionClick,
}: Props) {
  function getActionIcon(itemKey: QuickActionKey) {
    switch (itemKey) {
      case "nav_dashboard":
        return Home;
      case "nav_prontuario":
        return Users;
      case "nav_agendamentos":
        return Calendar;
      case "nav_config":
        return Settings;
      case "nav_logout":
        return LogOut;
    }
  }

  return (
    <nav
      id={id ?? "patient-menu"}
      ref={menuRef}
      tabIndex={-1}
      className={styles.sidebarIcons}
      aria-label="Navegação rápida"
    >
      <ul className={styles.iconList}>
        {actions.map((action) => {
          const { label, color } = action;
          const Icon = getActionIcon(action.itemKey);
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
                {Icon ? (
                  <Icon
                    className={styles.icon}
                    style={color ? { color } : undefined}
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

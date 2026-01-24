"use client";

import { Calendar, Home, LogOut, Settings, Users } from "lucide-react";
import type { RefObject } from "react";
import styles from "./QuickActionsNav.module.scss";

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
  isExpanded?: boolean;
};

export default function QuickActionsNav({
  id,
  actions,
  menuRef,
  activeLabel,
  onActionClick,
  isExpanded = false,
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

  const topActions = actions.filter((a) => a.itemKey !== "nav_logout");
  const logoutAction = actions.find((a) => a.itemKey === "nav_logout");

  return (
    <nav
      id={id ?? "patient-menu"}
      ref={menuRef}
      tabIndex={-1}
      className={`${styles.root} ${isExpanded ? styles.expanded : ""}`}
      aria-label="Navegação rápida"
    >
      <div className={styles.top}>
        <ul className={styles.iconList}>
          {topActions.map((action) => {
            const { label } = action;
            const Icon = getActionIcon(action.itemKey);
            const isActive = activeLabel === label;

            return (
              <li key={action.itemKey}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={label}
                  title={!isExpanded ? label : undefined}
                  data-active={isActive ? "true" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onActionClick?.(action)}
                >
                  {Icon ? <Icon className={styles.icon} aria-hidden /> : null}

                  {isExpanded ? (
                    <span className={styles.label}>{label}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.separator} aria-hidden />

      <div className={styles.bottom}>
        <ul className={styles.iconList}>
          {logoutAction ? (
            <li>
              <button
                type="button"
                className={`${styles.iconButton} ${styles.logout}`}
                aria-label={logoutAction.label}
                title={!isExpanded ? logoutAction.label : undefined}
                onClick={() => onActionClick?.(logoutAction)}
              >
                <LogOut className={styles.icon} aria-hidden />

                {isExpanded ? (
                  <span className={styles.label}>{logoutAction.label}</span>
                ) : null}
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

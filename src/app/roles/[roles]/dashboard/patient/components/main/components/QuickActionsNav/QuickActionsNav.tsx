"use client";

import type { LucideIcon } from "lucide-react";
import type { RefObject } from "react";
import styles from "../../styles/PatientMenu.module.scss";

export type QuickAction = {
  label: string;
  Icon: LucideIcon;
  color?: string;
};

type Props = {
  actions: QuickAction[];
  menuRef?: RefObject<HTMLElement | null>;
  activeLabel?: string;
  onActionClick?: (action: QuickAction) => void;
};

export default function QuickActionsNav({
  actions,
  menuRef,
  activeLabel,
  onActionClick,
}: Props) {
  return (
    <nav
      id="patient-menu"
      ref={menuRef}
      tabIndex={-1}
      className={styles.sidebarIcons}
      aria-label="Navegação rápida"
    >
      <ul className={styles.iconList}>
        {actions.map((action) => {
          const { label, Icon, color } = action;
          const isActive = activeLabel === label;

          return (
            <li key={label}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={label}
                data-active={isActive ? "true" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onActionClick?.(action)}
              >
                <Icon
                  className={styles.icon}
                  style={color ? { color } : undefined}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

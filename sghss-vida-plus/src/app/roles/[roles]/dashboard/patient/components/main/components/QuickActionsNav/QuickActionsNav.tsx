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
};

export default function QuickActionsNav({ actions, menuRef }: Props) {
  return (
    <nav
      id="patient-menu"
      ref={menuRef}
      tabIndex={-1}
      className={styles.sidebarIcons}
      aria-label="Navegação rápida"
    >
      <ul className={styles.iconList}>
        {actions.map(({ label, Icon, color }) => (
          <li key={label}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label={label}
            >
              <Icon
                className={styles.icon}
                style={color ? { color } : undefined}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

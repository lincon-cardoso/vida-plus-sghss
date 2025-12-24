"use client";

import type { LucideIcon } from "lucide-react";
import styles from "../../styles/PatientMenu.module.scss";

export type InfoBoxItem = {
  Icon: LucideIcon;
  count: string | number;
  label: string;
};

type Props = {
  items: InfoBoxItem[];
};

export default function InfoBoxes({ items }: Props) {
  return (
    <div className={styles.infoBoxes}>
      {items.map(({ Icon, count, label }) => (
        <div key={label} className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <Icon className={styles.icon} />
            <h2 className={styles.infoNumber}>{count}</h2>
          </div>
          <p className={styles.infoLabel}>{label}</p>
        </div>
      ))}
    </div>
  );
}

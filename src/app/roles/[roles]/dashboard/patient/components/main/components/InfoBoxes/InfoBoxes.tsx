import { Activity, Calendar, FileText } from "lucide-react";
import styles from "../../styles/PatientMenu.module.scss";

export type InfoBoxKey =
  | "upcoming_appointments"
  | "exam_results"
  | "active_prescription";

export type InfoBoxItem = {
  itemKey: InfoBoxKey;
  count: string | number;
  label: string;
};

type Props = {
  items: InfoBoxItem[];
};

export default function InfoBoxes({ items }: Props) {
  function getInfoBoxIcon(itemKey: InfoBoxKey) {
    switch (itemKey) {
      case "upcoming_appointments":
        return Calendar;
      case "exam_results":
        return FileText;
      case "active_prescription":
        return Activity;
    }
  }

  return (
    <div className={styles.infoBoxes}>
      {items.map(({ itemKey, count, label }) => {
        const Icon = getInfoBoxIcon(itemKey);
        return (
          <div key={itemKey} className={styles.infoBox}>
            <div className={styles.infoBoxTop}>
              {Icon ? <Icon className={styles.icon} /> : null}
              <h2 className={styles.infoNumber}>{count}</h2>
            </div>
            <p className={styles.infoLabel}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}

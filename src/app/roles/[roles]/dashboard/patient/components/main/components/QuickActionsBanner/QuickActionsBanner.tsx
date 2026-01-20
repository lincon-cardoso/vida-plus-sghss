"use client";
import { Activity, Calendar, Clock, FileText } from "lucide-react";
import styles from "./QuickActionsBanner.module.scss";

export type BannerItemKey =
  | "banner_exames"
  | "banner_horarios"
  | "banner_atividades"
  | "banner_agenda";

type BannerItem = {
  itemKey: BannerItemKey;
  label?: string;
  color?: string;
  onClick?: () => void;
};

interface Props {
  items?: BannerItem[];
}

export default function QuickActionsBanner({ items }: Props) {
  function getBannerIcon(itemKey: BannerItemKey) {
    switch (itemKey) {
      case "banner_exames":
        return FileText;
      case "banner_horarios":
        return Clock;
      case "banner_atividades":
        return Activity;
      case "banner_agenda":
        return Calendar;
    }
  }

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.content}>
        <div className={styles.text}>
          <strong>Atalhos Rápidos</strong>
        </div>
        <div className={styles.items}>
          {items?.map((it, i) => {
            const Icon = getBannerIcon(it.itemKey);
            return (
              <button
                key={it.itemKey ?? i}
                type="button"
                className={styles.bannerItem}
                onClick={it.onClick}
              >
                {Icon ? <Icon className={styles.icon} /> : null}
                {it.label && <span className={styles.label}>{it.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

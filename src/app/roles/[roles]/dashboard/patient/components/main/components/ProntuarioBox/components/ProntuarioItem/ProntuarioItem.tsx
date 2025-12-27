"use client";
import { Activity, AlertCircle, CheckCircle, Clock } from "lucide-react";
import type { CSSProperties } from "react";
import type {
  ProntuarItem,
  ProntuarioItemKey,
} from "../../types/ProntuarioBox.types";
import styles from "./ProntuarioItem.module.scss";

interface Props {
  items?: ProntuarItem[];
}

export default function ProntuarioItem({ items }: Props) {
  function getItemIcon(itemKey?: ProntuarioItemKey) {
    switch (itemKey) {
      case "exam_pending":
        return AlertCircle;
      case "exam_in_process":
        return Clock;
      case "exam_completed":
        return CheckCircle;
      case "exam_urgent":
        return Activity;
      default:
        return null;
    }
  }

  return (
    <div>
      {items?.length ? (
        <div
          className={styles.itemsContainer}
          aria-label="Atalhos do prontuário"
        >
          {items.map((it, i) => {
            const Icon = getItemIcon(it.itemKey);

            type ItemStyle = CSSProperties & { "--item-accent"?: string };

            const itemStyle: ItemStyle | undefined = it.color
              ? {
                  "--item-accent": it.color,
                }
              : undefined;

            return (
              <button
                key={it.label ?? i}
                type="button"
                className={styles.item}
                onClick={it.onClick}
                style={itemStyle}
                aria-label={it.label ?? "Ação"}
              >
                <span className={styles.itemContent}>
                  {it.value !== undefined && it.value !== null && (
                    <span className={styles.count}>{it.value}</span>
                  )}
                  {it.label && <span className={styles.label}>{it.label}</span>}
                </span>

                <span className={styles.iconWrap} aria-hidden="true">
                  {Icon ? <Icon className={styles.icon} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

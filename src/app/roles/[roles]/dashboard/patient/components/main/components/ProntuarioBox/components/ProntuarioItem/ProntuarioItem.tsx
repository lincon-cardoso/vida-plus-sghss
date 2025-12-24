"use client";
import type { CSSProperties } from "react";
import type { ProntuarItem } from "../../types/ProntuarioBox.types";
import styles from "./ProntuarioItem.module.scss";

interface Props {
  items?: ProntuarItem[];
}

export default function ProntuarioItem({ items }: Props) {
  return (
    <div>
      {items?.length ? (
        <div
          className={styles.itemsContainer}
          aria-label="Atalhos do prontuário"
        >
          {items.map((it, i) => {
            const Icon = it.Icon;

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
                  <Icon className={styles.icon} />
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

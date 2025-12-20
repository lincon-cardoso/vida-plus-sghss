"use client";
import type { ComponentType, SVGProps, CSSProperties } from "react";
import WelcomeBox from "@/app/roles/[roles]/dashboard/patient/components/main/components/WelcomeBox/WelcomeBox";
import styles from "./ProntuarioBox.module.scss";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

type ProntuarItem = {
  Icon: IconComp;
  count?: string | number;
  label?: string;
  color?: string;
  value?: number;
  onClick?: () => void;
};

interface Props {
  title?: string;
  subtitle?: string;
  items?: ProntuarItem[];
}

export default function ProntuarioBox({
  items,
  title = "Meu Prontuário Médico",
  subtitle = "Acesse suas informações de saúde, exames e histórico médico",
}: Props) {
  return (
    <div className={styles.prontuarioBox}>
      <WelcomeBox title={title} subtitle={subtitle} />

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

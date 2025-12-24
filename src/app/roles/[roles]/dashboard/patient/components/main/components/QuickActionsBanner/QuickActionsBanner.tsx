"use client";
import styles from "./QuickActionsBanner.module.scss";

type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type BannerItem = {
  Icon: IconComp;
  label?: string;
  color?: string;
  onClick?: () => void;
};

interface Props {
  items?: BannerItem[];
}

export default function QuickActionsBanner({ items }: Props) {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.content}>
        <div className={styles.text}>
          <strong>Atalhos Rápidos</strong>
        </div>
        <div className={styles.items}>
          {items?.map((it, i) => {
            const Icon = it.Icon;
            return (
              <button
                key={i}
                type="button"
                className={styles.bannerItem}
                onClick={it.onClick}
                style={{ color: it.color }}
              >
                <Icon className={styles.icon} />
                {it.label && <span className={styles.label}>{it.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

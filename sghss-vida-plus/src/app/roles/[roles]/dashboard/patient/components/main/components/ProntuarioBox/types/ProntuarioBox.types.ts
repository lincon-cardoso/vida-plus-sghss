import type { ComponentType, SVGProps } from "react";

export type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

export type ProntuarItem = {
  Icon: IconComp;
  count?: string | number;
  label?: string;
  color?: string;
  value?: number;
  onClick?: () => void;
};

export interface ProntuarioBoxProps {
  title?: string;
  subtitle?: string;
  items?: ProntuarItem[];
}

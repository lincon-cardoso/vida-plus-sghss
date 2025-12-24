import type { ComponentType, SVGProps } from "react";

export type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

export type ProntuarioTabKey =
  | "Meus Exames"
  | "Dados Pessoais"
  | "Histórico Médico";

export type ProntuarioTabItem = {
  key: ProntuarioTabKey;
  label: string;
  Icon?: IconComp;
};

export type ProntuarItem = {
  itemKey?: string;
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
  tabs?: ProntuarioTabItem[];
}

export type ProntuarioTabKey =
  | "Meus Exames"
  | "Dados Pessoais"
  | "Histórico Médico";

export type ProntuarioTabItem = {
  key: ProntuarioTabKey;
  label: string;
};

export type ProntuarioItemKey =
  | "exam_pending"
  | "exam_in_process"
  | "exam_completed"
  | "exam_urgent";

export type ProntuarItem = {
  itemKey?: ProntuarioItemKey;
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

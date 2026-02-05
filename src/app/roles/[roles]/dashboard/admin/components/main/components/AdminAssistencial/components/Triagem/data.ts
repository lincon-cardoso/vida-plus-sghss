export type TriageKey =
  | "emergencia"
  | "muito_urgente"
  | "urgente"
  | "pouco_urgente"
  | "nao_urgente";

export type TriageLevel = {
  key: TriageKey;
  label: string;
  count: number;
  time: string; // tempo estimado de espera/descritivo
  color: string; // hex
};

export const TRIAGE_LEVELS: TriageLevel[] = [
  {
    key: "emergencia",
    label: "Emergência",
    count: 0,
    time: "Imediato",
    color: "#ef4444",
  },
  {
    key: "muito_urgente",
    label: "Muito Urgente",
    count: 0,
    time: "10 min",
    color: "#ff6a00",
  },
  {
    key: "urgente",
    label: "Urgente",
    count: 0,
    time: "60 min",
    color: "#f59e0b",
  },
  {
    key: "pouco_urgente",
    label: "Pouco Urgente",
    count: 0,
    time: "120 min",
    color: "#22c55e",
  },
  {
    key: "nao_urgente",
    label: "Não Urgente",
    count: 0,
    time: "240 min",
    color: "#1e6df6",
  },
];

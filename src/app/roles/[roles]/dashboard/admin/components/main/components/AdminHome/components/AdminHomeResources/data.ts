export type Sector = {
  key: string;
  name: string;
  occupied: number;
  capacity: number;
  percent: number;
  color: string; // hex or css color
};

export type Supply = {
  key: string;
  name: string;
  min: string | number;
  qty: number;
  variant: "danger" | "warning" | "success" | "info";
};

export const SECTORS: Sector[] = [
  {
    key: "uti_adulto",
    name: "UTI Adulto",
    occupied: 18,
    capacity: 20,
    percent: 90,
    color: "#ef4444",
  },
  {
    key: "uti_neonatal",
    name: "UTI Neonatal",
    occupied: 8,
    capacity: 12,
    percent: 67,
    color: "#f59e0b",
  },
  {
    key: "enfermaria_a",
    name: "Enfermaria A",
    occupied: 24,
    capacity: 30,
    percent: 80,
    color: "#10b981",
  },
  {
    key: "enfermaria_b",
    name: "Enfermaria B",
    occupied: 15,
    capacity: 30,
    percent: 50,
    color: "#16a34a",
  },
  {
    key: "centro_cirurgico",
    name: "Centro Cirúrgico",
    occupied: 4,
    capacity: 6,
    percent: 67,
    color: "#2563eb",
  },
];

export const SUPPLIES: Supply[] = [
  {
    key: "dipirona",
    name: "Dipirona 500mg",
    min: "500 un",
    qty: 120,
    variant: "danger",
  },
  {
    key: "soro",
    name: "Soro Fisiológico 0.9%",
    min: "100 un",
    qty: 45,
    variant: "warning",
  },
  {
    key: "luvas",
    name: "Luvas Cirúrgicas M",
    min: "1000 un",
    qty: 800,
    variant: "warning",
  },
  {
    key: "mascaras",
    name: "Máscaras N95",
    min: "200 un",
    qty: 250,
    variant: "success",
  },
];

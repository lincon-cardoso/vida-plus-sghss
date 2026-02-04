export type Patient = {
  name: string;
  age?: number;
  internacao?: string; // ISO or human readable
  diagnostico?: string;
  medico?: string;
};

export type Bed = {
  id: string;
  sector: string;
  status:
    | "Ocupado"
    | "Disponível"
    | "Em Higienização"
    | "Em limpeza"
    | "Isolamento";
  patient?: Patient | null;
  badgeColor?: string; // optional semantic color key
};

const beds: Bed[] = [
  {
    id: "UTI-01",
    sector: "UTI",
    status: "Ocupado",
    patient: {
      name: "José Silva",
      age: 68,
      internacao: "10/11/2024",
      diagnostico: "IAM",
      medico: "Dr. Carlos",
    },
    badgeColor: "red",
  },
  {
    id: "UTI-02",
    sector: "UTI",
    status: "Disponível",
    patient: null,
    badgeColor: "green",
  },
  {
    id: "ENF-101",
    sector: "Enfermaria",
    status: "Ocupado",
    patient: {
      name: "Maria Santos",
      age: 45,
      internacao: "11/11/2024",
      diagnostico: "Pneumonia",
      medico: "Dra. Ana",
    },
    badgeColor: "red",
  },
  {
    id: "ENF-102",
    sector: "Enfermaria",
    status: "Em Higienização",
    patient: null,
    badgeColor: "orange",
  },
  {
    id: "SEMI-01",
    sector: "Semi-Intensivo",
    status: "Disponível",
    patient: null,
    badgeColor: "green",
  },
  {
    id: "ISO-01",
    sector: "Isolamento",
    status: "Ocupado",
    patient: {
      name: "Pedro Lima",
      age: 52,
      internacao: "09/11/2024",
      diagnostico: "COVID-19",
      medico: "Dr. João",
    },
    badgeColor: "red",
  },
];

export default beds;

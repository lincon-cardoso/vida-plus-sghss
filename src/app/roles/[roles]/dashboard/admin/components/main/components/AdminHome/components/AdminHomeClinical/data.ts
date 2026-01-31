export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  status: "active" | "inactive";
  statusLabel?: string;
  statusVariant?: "Info" | "Success" | "Danger" | "Primary";
  patients?: number;
  crm?: string;
};

export const CLINICAL_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. João Silva",
    specialty: "Cardiologista",
    status: "active",
    statusLabel: "Em Atendimento",
    statusVariant: "Primary",
    patients: 12,
    crm: "CRM-12345",
  },
  {
    id: "d2",
    name: "Dra. Ana Costa",
    specialty: "Pediatra",
    status: "active",
    statusLabel: "Disponível",
    statusVariant: "Success",
    patients: 0,
    crm: "CRM-67890",
  },
  {
    id: "d3",
    name: "Dr. Pedro Lima",
    specialty: "Ortopedista",
    status: "active",
    statusLabel: "Em Cirurgia",
    statusVariant: "Danger",
    patients: 4,
    crm: "CRM-44221",
  },
  {
    id: "d4",
    name: "Enf. Carla Souza",
    specialty: "Chefe de Enfermagem",
    status: "active",
    statusLabel: "Ativa",
    statusVariant: "Info",
    patients: 28,
    crm: "COFEN-8877",
  },
];

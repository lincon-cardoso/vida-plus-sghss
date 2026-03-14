export type ProfessionalStatus = "available" | "busy" | "offline";

export type ProfessionalRecord = {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  status: ProfessionalStatus;
  statusLabel: string;
  patientsCount: number;
  rating: number;
  phone: string;
  email: string;
};

export const PROFESSIONALS: ProfessionalRecord[] = [
  {
    id: "prof-1",
    name: "Dr. João Santos Silva",
    crm: "CRM 123456-SP",
    specialty: "Cardiologia",
    status: "available",
    statusLabel: "Disponível",
    patientsCount: 145,
    rating: 4.8,
    phone: "(11) 98765-4321",
    email: "joao.santos@vidaplus.com",
  },
  {
    id: "prof-2",
    name: "Dra. Ana Costa Pereira",
    crm: "CRM 234567-SP",
    specialty: "Pediatria",
    status: "busy",
    statusLabel: "Ocupado",
    patientsCount: 203,
    rating: 4.9,
    phone: "(11) 97654-3210",
    email: "ana.costa@vidaplus.com",
  },
  {
    id: "prof-3",
    name: "Dr. Pedro Lima Oliveira",
    crm: "CRM 345678-SP",
    specialty: "Ortopedia",
    status: "available",
    statusLabel: "Disponível",
    patientsCount: 98,
    rating: 4.7,
    phone: "(11) 96543-2109",
    email: "pedro.lima@vidaplus.com",
  },
  {
    id: "prof-4",
    name: "Dra. Mariana Souza",
    crm: "CRM 456789-SP",
    specialty: "Ginecologia",
    status: "offline",
    statusLabel: "Offline",
    patientsCount: 167,
    rating: 4.9,
    phone: "(11) 95432-1098",
    email: "mariana.souza@vidaplus.com",
  },
  {
    id: "prof-5",
    name: "Dr. Carlos Mendes",
    crm: "CRM 567890-SP",
    specialty: "Neurologia",
    status: "available",
    statusLabel: "Disponível",
    patientsCount: 112,
    rating: 4.6,
    phone: "(11) 94321-0987",
    email: "carlos.mendes@vidaplus.com",
  },
];

export const SPECIALTY_OPTIONS = [
  "Todas Especialidades",
  ...Array.from(
    new Set(PROFESSIONALS.map((professional) => professional.specialty)),
  ),
];

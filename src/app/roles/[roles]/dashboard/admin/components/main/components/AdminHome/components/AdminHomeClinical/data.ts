export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  status: "active" | "inactive";
  shift?: string;
  lastActive?: string;
};

export const CLINICAL_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dra. Ana Beatriz",
    specialty: "Cardiologia",
    status: "active",
    shift: "Manhã",
    lastActive: "15 min atrás",
  },
  {
    id: "d2",
    name: "Dr. Pedro Lima",
    specialty: "Emergência",
    status: "active",
    shift: "Noite",
    lastActive: "1h atrás",
  },
  {
    id: "d3",
    name: "Dra. Carla Souza",
    specialty: "Pediatria",
    status: "inactive",
    shift: "Tarde",
    lastActive: "ontem",
  },
];

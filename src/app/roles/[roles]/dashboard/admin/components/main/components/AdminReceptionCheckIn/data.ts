export const APPOINTMENT_STATUSES = [
  "agendado",
  "checkin",
  "concluido",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export type Appointment = {
  id: string;
  name: string;
  time: string;
  cpf: string;
  phone: string;
  specialty: string;
  doctor: string;
  status: AppointmentStatus;
};

export const APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    name: "Maria Silva",
    time: "09:00",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    specialty: "Clínica Geral",
    doctor: "Dr. Carlos Santos",
    status: "agendado",
  },
  {
    id: "2",
    name: "João Santos",
    time: "14:00",
    cpf: "987.654.321-00",
    phone: "(11) 91234-5678",
    specialty: "Endocrinologia",
    doctor: "Dra. Ana Paula",
    status: "agendado",
  },
  {
    id: "3",
    name: "Ana Costa",
    time: "16:30",
    cpf: "456.789.123-00",
    phone: "(11) 99876-5432",
    specialty: "Cardiologia",
    doctor: "Dr. Roberto Lima",
    status: "agendado",
  },
];

// Chave para sessionStorage (seguir padrão do projeto)
export const RECEPTION_ACTIVE_LABEL_KEY = "vida-plus:reception:activeLabel";

// Valor padrão para seleção inicial (se necessário no futuro)
export const DEFAULT_RECEPTION_ACTIVE_LABEL = "Agendados Hoje";

// Pequena utilidade para compor estatísticas a partir das appointments
export function computeStats(list: Appointment[]) {
  const scheduled = list.length;
  const arrived = list.filter((a) => a.status === "checkin").length;
  const inService = 0;
  const completed = list.filter((a) => a.status === "concluido").length;
  return { scheduled, arrived, inService, completed };
}

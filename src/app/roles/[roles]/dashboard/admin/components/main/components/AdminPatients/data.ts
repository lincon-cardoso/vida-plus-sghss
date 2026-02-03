/**
 * Dados de exemplo para AdminPatients
 * (arquivo de mocks dentro da pasta do componente)
 */

export type Patient = {
  id: string;
  name: string;
  email: string;
  cpf: string; // apenas números
  birthDate: string; // YYYY-MM-DD
  phone: string;
  lastVisit: string; // YYYY-MM-DD
  isActive: boolean;
};

export const PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Maria Silva Santos",
    email: "maria.silva@email.com",
    cpf: "12345678900",
    birthDate: "1985-03-15",
    phone: "(11) 98765-4321",
    lastVisit: "2024-11-10",
    isActive: true,
  },
  {
    id: "2",
    name: "João Carlos Oliveira",
    email: "joao.oliveira@email.com",
    cpf: "98765432100",
    birthDate: "1990-07-22",
    phone: "(11) 91234-5678",
    lastVisit: "2024-11-08",
    isActive: true,
  },
  {
    id: "3",
    name: "Ana Paula Costa",
    email: "ana.costa@email.com",
    cpf: "45678912300",
    birthDate: "1978-12-05",
    phone: "(11) 99876-5432",
    lastVisit: "2024-11-05",
    isActive: true,
  },
  {
    id: "4",
    name: "Pedro Henrique Souza",
    email: "pedro.souza@email.com",
    cpf: "32165498700",
    birthDate: "1995-09-18",
    phone: "(11) 96543-2109",
    lastVisit: "2024-10-20",
    isActive: false,
  },
  {
    id: "5",
    name: "Juliana Martins",
    email: "juliana.martins@email.com",
    cpf: "78912345600",
    birthDate: "1988-01-30",
    phone: "(11) 95432-1098",
    lastVisit: "2024-11-11",
    isActive: true,
  },
];

export default PATIENTS;

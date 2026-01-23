/**
 * Tipos e dados mock para o componente MedicMyPatients.
 * Mantidos fora do componente para facilitar testes e reutilização.
 */

export type Patient = {
  id: string;
  name: string;
  email?: string;
  cpf?: string;
  dob?: string;
  phone?: string;
  lastVisit?: string;
  status?: "Ativo" | "Inativo";
};

export const defaultPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Silva Santos",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    dob: "15/03/1985",
    phone: "(11) 98765-4321",
    lastVisit: "10/11/2024",
    status: "Ativo",
  },
  {
    id: "2",
    name: "João Carlos Oliveira",
    email: "joao.oliveira@email.com",
    cpf: "987.654.321-00",
    dob: "22/07/1990",
    phone: "(11) 91234-5678",
    lastVisit: "08/11/2024",
    status: "Ativo",
  },
  {
    id: "3",
    name: "Ana Paula Costa",
    email: "ana.costa@email.com",
    cpf: "456.789.123-00",
    dob: "05/12/1978",
    phone: "(11) 99876-5432",
    lastVisit: "05/11/2024",
    status: "Ativo",
  },
  {
    id: "4",
    name: "Pedro Henrique Souza",
    email: "pedro.souza@email.com",
    cpf: "321.654.987-00",
    dob: "18/09/1995",
    phone: "(11) 96543-2109",
    lastVisit: "20/10/2024",
    status: "Inativo",
  },
  {
    id: "5",
    name: "Juliana Martins",
    email: "juliana.martins@email.com",
    cpf: "789.123.456-00",
    dob: "30/01/1988",
    phone: "(11) 95432-1098",
    lastVisit: "11/11/2024",
    status: "Ativo",
  },
];

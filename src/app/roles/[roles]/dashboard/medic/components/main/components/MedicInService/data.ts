/**
 * Dados de mock para o componente MedicInService
 * Mantidos fora do componente para facilitar testes e reuso.
 */

export type InServicePatient = {
  id: string;
  name: string;
  gender: "Masculino" | "Feminino" | "Outro";
  age: number;
  cpf: string;
  room?: string;
  allergies: string[];
};

export const inServicePatient: InServicePatient = {
  id: "p1",
  name: "Maria Silva",
  gender: "Feminino",
  age: 41,
  cpf: "123.456.789-00",
  room: "Sala 1",
  allergies: ["Dipirona", "Penicilina"],
};

export type HistoryItem = {
  id: string;
  date: string; // data formatada
  title: string;
  status: "Pendente" | "Pronto" | "Concluído";
  summary?: string;
};

export const recentHistory: HistoryItem[] = [
  {
    id: "h1",
    date: "13/11/2024",
    title: "Colesterol Total e Frações",
    status: "Pendente",
    summary: "",
  },
  {
    id: "h2",
    date: "12/11/2024",
    title: "Hemograma Completo",
    status: "Pendente",
  },
  {
    id: "h3",
    date: "10/11/2024",
    title: "Raio-X de Tórax (PA e Perfil)",
    status: "Pronto",
    summary: "Campos pulmonares livres, sem sinais de comprometimento",
  },
  {
    id: "h4",
    date: "28/10/2024",
    title: "TSH",
    status: "Pronto",
    summary: "TSH: 2.4 mIU/L - Valor dentro da normalidade",
  },
];

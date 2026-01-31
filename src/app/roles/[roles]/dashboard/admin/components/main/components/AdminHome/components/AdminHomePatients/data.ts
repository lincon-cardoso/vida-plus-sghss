export type Patient = {
  id: string;
  name: string;
  recordNumber: string;
  age: number;
  lastVisit?: string;
  phone?: string;
};

export const PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Mariana Oliveira",
    recordNumber: "PR-2024-001",
    age: 32,
    lastVisit: "12/01/2026",
    phone: "+55 (11) 91234-5678",
  },
  {
    id: "p2",
    name: "Carlos Alberto",
    recordNumber: "PR-2024-002",
    age: 45,
    lastVisit: "02/01/2026",
    phone: "+55 (21) 99876-5432",
  },
  {
    id: "p3",
    name: "Fernanda Lima",
    recordNumber: "PR-2024-003",
    age: 27,
    lastVisit: "20/12/2025",
    phone: "+55 (31) 99555-1234",
  },
];

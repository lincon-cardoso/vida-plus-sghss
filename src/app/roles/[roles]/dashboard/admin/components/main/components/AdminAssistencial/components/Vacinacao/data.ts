export type VaccinationStatus = "aplicada" | "agendada" | "atrasada";

export type VaccinationRecord = {
  id: string;
  vaccineName: string;
  manufacturer?: string;
  doseLabel: string;
  status: VaccinationStatus;
  statusLabel: string;
  date: string;
  batch?: string;
  nextDoseDate?: string;
};

export const VACCINATION_RECORDS: VaccinationRecord[] = [
  {
    id: "vac-1",
    vaccineName: "COVID-19",
    manufacturer: "Pfizer",
    doseLabel: "1ª dose",
    status: "aplicada",
    statusLabel: "Aplicada",
    date: "2024-03-15",
    batch: "ABC123",
    nextDoseDate: "2024-09-15",
  },
  {
    id: "vac-2",
    vaccineName: "Influenza 2024",
    doseLabel: "Dose única",
    status: "aplicada",
    statusLabel: "Aplicada",
    date: "2024-04-10",
    batch: "FLU456",
  },
  {
    id: "vac-3",
    vaccineName: "COVID-19",
    manufacturer: "Pfizer",
    doseLabel: "2ª dose",
    status: "agendada",
    statusLabel: "Agendada",
    date: "2024-09-15",
  },
];

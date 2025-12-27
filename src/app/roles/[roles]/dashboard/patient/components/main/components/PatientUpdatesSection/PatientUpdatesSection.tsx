"use client";
import { FileText } from "lucide-react";
import styles from "./PatientUpdatesSection.module.scss";

type UpdateItem = {
  id: string;
  title: string;
  date: string;
  available: boolean;
};

type Prescription = {
  id: string;
  title: string;
  note: string;
  doctor: string;
  status: string;
  validUntil: string;
};

const MOCK_UPDATES: UpdateItem[] = [
  {
    id: "u1",
    title: "Hemograma Completo",
    date: "08/11/2024",
    available: true,
  },
  { id: "u2", title: "Glicemia em Jejum", date: "05/11/2024", available: true },
  { id: "u3", title: "Colesterol Total", date: "01/11/2024", available: true },
];

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "p1",
    title: "Laosartana 500mg",
    note: "1 comprimido pela manhã",
    doctor: "Dr. João Santos",
    status: "Ativa",
    validUntil: "15/12/2024",
  },
];

export default function PatientUpdatesSection() {
  return (
    <section className={styles.root} aria-label="Atualizações do paciente">
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Resultados Recentes</h3>
          </div>
          <ul className={styles.itemList}>
            {MOCK_UPDATES.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <FileText className={styles.icon} />
                  <div className={styles.itemText}>
                    <strong>{item.title}</strong>
                    <p className={styles.itemDate}>{item.date}</p>
                  </div>
                </div>
                <span className={styles.badge}>
                  {item.available ? "Disponível" : "Indisponível"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Prescrições Ativas</h3>
          </div>
          {MOCK_PRESCRIPTIONS.map((p) => (
            <div key={p.id} className={styles.prescriptionCard}>
              <div>
                <strong>{p.title}</strong>
                <p className={styles.prescriptionNote}>{p.note}</p>
                <p className={styles.prescriptionDoctor}>{p.doctor}</p>
              </div>
              <div className={styles.prescriptionMeta}>
                <span className={styles.prescriptionStatus}>{p.status}</span>
                <p className={styles.prescriptionValid}>
                  Válida até {p.validUntil}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

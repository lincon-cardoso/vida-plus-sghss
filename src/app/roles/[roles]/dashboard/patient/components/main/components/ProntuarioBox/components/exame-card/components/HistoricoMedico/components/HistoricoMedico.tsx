"use client";
import { Download } from "lucide-react";
import { useState } from "react";
import styles from "./styles/HistoricoMedico.module.scss";

interface MedicalHistoryEntry {
  date: string;
  type: string;
  note: string;
  doctor: string;
}

// Dados de exemplo - em produção viriam de uma API ou props
const SAMPLE_HISTORY: MedicalHistoryEntry[] = [
  {
    date: "15/11/2024",
    type: "Consulta Cardiologia",
    note: "Avaliação de rotina, pressão arterial controlada",
    doctor: "Dr. João Santos Silva",
  },
  {
    date: "10/10/2024",
    type: "Exame de Sangue",
    note: "Hemograma completo - resultados normais",
    doctor: "Dra. Ana Costa Pereira",
  },
  {
    date: "22/09/2024",
    type: "Consulta Clínica Geral",
    note: "Check-up anual completo",
    doctor: "Dr. Carlos Mendes",
  },
];

export default function HistoricoMedico() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data: MedicalHistoryEntry[]) => {
    // Cabeçalho do CSV
    const headers = ["Data", "Tipo", "Observação", "Médico"];
    const csvContent = [
      headers.join(","),
      ...data.map((entry) =>
        [
          `"${entry.date}"`,
          `"${entry.type}"`,
          `"${entry.note}"`,
          `"${entry.doctor}"`,
        ].join(",")
      ),
    ].join("\n");

    // Criar blob e fazer download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `historico-medico-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExporting(true);

    try {
      exportToCSV(SAMPLE_HISTORY);
    } catch (error) {
      console.error("Erro ao exportar histórico:", error);
      alert("Erro ao exportar histórico. Por favor, tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className={styles.historico}>
      <div className={styles.header}>
        <h3 className={styles.title}>Linha do Tempo</h3>
        <a
          className={styles.exportLink}
          href="#"
          onClick={handleExport}
          aria-label="Exportar Histórico"
          aria-busy={isExporting}
        >
          <Download className={styles.icon} size={16} aria-hidden="true" />
          <span>{isExporting ? "Exportando..." : "Exportar Histórico"}</span>
        </a>
      </div>

      {/* Renderizar as entradas do histórico */}
      <div>
        {SAMPLE_HISTORY.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <div className={styles.entryDate}>{entry.date}</div>
            <div className={styles.entryContent}>
              <div className={styles.entryType}>{entry.type}</div>
              <div className={styles.entryNote}>{entry.note}</div>
              <div className={styles.entryDoctor}>{entry.doctor}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./TissOperadoras.module.scss";
import {
  GENERATE_BATCH_ICON,
  GLOSA_ALERT_ICON,
  GUIDE_DOWNLOAD_ICON,
  GUIDE_FILE_ICON,
  TISS_GUIDES,
  TISS_SUMMARY_CARDS,
  type TissSummaryCard,
} from "./data";

function SummaryCard({ card }: { card: TissSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.iconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>
      <div>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

export default function TissOperadoras() {
  const BatchIcon = GENERATE_BATCH_ICON as LucideIcon;
  const FileIcon = GUIDE_FILE_ICON as LucideIcon;
  const DownloadIcon = GUIDE_DOWNLOAD_ICON as LucideIcon;
  const AlertIcon = GLOSA_ALERT_ICON as LucideIcon;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected = selectedIds.length === TISS_GUIDES.length;

  function toggleGuide(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : TISS_GUIDES.map((item) => item.id));
  }

  return (
    <section className={styles.root} aria-labelledby="tiss-operadoras-title">
      <header className={styles.header}>
        <div>
          <h2 id="tiss-operadoras-title" className={styles.title}>
            TISS - Faturamento de Convênios
          </h2>
          <p className={styles.subtitle}>Geração e envio de guias TISS</p>
        </div>

        <button type="button" className={styles.batchButton}>
          <BatchIcon size={18} />
          Gerar Lote ({selectedIds.length})
        </button>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo financeiro TISS">
        {TISS_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Guias TISS</h3>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Selecionar todas as guias"
                  />
                </th>
                <th>Guia</th>
                <th>Tipo</th>
                <th>Paciente</th>
                <th>Convênio</th>
                <th>Procedimento</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {TISS_GUIDES.map((guide) => (
                <tr key={guide.id}>
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedIds.includes(guide.id)}
                      onChange={() => toggleGuide(guide.id)}
                      aria-label={`Selecionar guia ${guide.code}`}
                    />
                  </td>
                  <td>{guide.code}</td>
                  <td>
                    <span
                      className={`${styles.typeTag} ${styles[`type${guide.typeTone.charAt(0).toUpperCase()}${guide.typeTone.slice(1)}`]}`}
                    >
                      {guide.type}
                    </span>
                  </td>
                  <td>{guide.patient}</td>
                  <td>{guide.insurance}</td>
                  <td>{guide.procedure}</td>
                  <td>{guide.date}</td>
                  <td>{guide.value}</td>
                  <td>
                    <span
                      className={`${styles.statusTag} ${styles[`status${guide.statusTone.charAt(0).toUpperCase()}${guide.statusTone.slice(1)}`]}`}
                    >
                      {guide.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        aria-label={`Abrir documento da guia ${guide.code}`}
                      >
                        <FileIcon size={17} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionButton}
                        aria-label={`Baixar guia ${guide.code}`}
                      >
                        <DownloadIcon size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.alertBox} aria-label="Alerta de glosas">
        <div className={styles.alertContent}>
          <AlertIcon size={22} className={styles.alertIcon} />
          <div>
            <h3 className={styles.alertTitle}>Atenção: Glosas Detectadas</h3>
            <p className={styles.alertText}>
              Você tem R$ 200,00 em glosas. Acesse a Auditoria Médica para
              análise e recurso.
            </p>
          </div>
        </div>

        <button type="button" className={styles.alertButton}>
          Ver Glosas
        </button>
      </section>
    </section>
  );
}

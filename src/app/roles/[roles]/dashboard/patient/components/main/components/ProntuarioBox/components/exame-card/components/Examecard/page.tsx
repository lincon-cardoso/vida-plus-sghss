"use client";

import { useMemo } from "react";
import styles from "./styles/exame-card.module.scss";
import type { ProntuarItem } from "../../../../types/ProntuarioBox.types";

interface Props {
  examItems?: ProntuarItem[];
  exams?: ExamItem[];
}

type ExamStatus = "pending" | "in_process" | "completed";

type ExamItem = {
  id: string;
  status: ExamStatus;
  title: string;
  type?: string;
  requestedAt?: string; // ISO date string
  collectedAt?: string;
  expectedAt?: string;
  completedAt?: string;
  doctor?: string;
  code?: string;
  instructions?: string;
  priority?: "normal" | "alta" | "urgente";
  result?: { text: string; level?: "normal" | "alterado" | "critico" };
  attachments?: { url: string; label?: string }[];
};

const DEFAULT_EXAMS: ExamItem[] = [
  {
    id: "ex-1",
    status: "pending",
    title: "Hemograma Completo",
    type: "Laboratório",
    requestedAt: "2024-11-10",
    doctor: "Dr. Ana Souza",
    code: "HEM001",
    instructions: "Jejum de 8 horas",
    priority: "urgente",
  },
  {
    id: "ex-2",
    status: "in_process",
    title: "Ultrassonografia Abdominal",
    type: "Imagem",
    requestedAt: "2024-11-11",
    collectedAt: "2024-11-12",
    expectedAt: "2024-11-15",
    doctor: "Dr. Carlos Mendes",
    code: "EX002",
    instructions: "Bexiga cheia, jejum de 6 horas",
    priority: "alta",
  },
  {
    id: "ex-3",
    status: "in_process",
    title: "Eletrocardiograma (ECG)",
    type: "Eletro",
    requestedAt: "2024-11-09",
    collectedAt: "2024-11-09",
    expectedAt: "2024-11-14",
    doctor: "Dr. Paulo Lima",
    code: "ECG003",
    instructions: "Evitar cafeína antes do exame",
    priority: "urgente",
  },
  {
    id: "ex-4",
    status: "completed",
    title: "Eletrocardiograma (ECG)",
    type: "Eletro",
    requestedAt: "2024-10-01",
    completedAt: "2024-10-01",
    doctor: "Dr. Paulo Lima",
    code: "ECG002",
    priority: "normal",
    result: { text: "Normal", level: "normal" },
    attachments: [{ url: "/files/exam-ecg-ecg002.pdf", label: "Laudo" }],
  },
];

export default function ExameCard({ examItems, exams }: Props) {
  const sections: string[] = [
    "Exames Solicitados - Aguardando Realização",
    "Exames em Processo - Aguardando Resultado",
    "Exames Concluídos - Últimos Resultados",
  ];

  const iconMap = useMemo(() => {
    const map = new Map<string, ProntuarItem["Icon"]>();
    for (const it of examItems ?? []) {
      if (it.itemKey) map.set(it.itemKey, it.Icon);
      if (it.label) map.set(it.label, it.Icon);
    }
    return map;
  }, [examItems]);

  const iconByIndex = [
    iconMap.get("exam_pending") ?? iconMap.get("Exames Pendentes"),
    iconMap.get("exam_in_process") ?? iconMap.get("Em Processo"),
    iconMap.get("exam_completed") ?? iconMap.get("Concluídos"),
  ];

  const statusByIndex: Record<number, ExamStatus> = {
    0: "pending",
    1: "in_process",
    2: "completed",
  };

  const resolvedExams = exams?.length ? exams : DEFAULT_EXAMS;

  return (
    <div className={styles.exameCard}>
      {sections.map((text, id) => {
        const Icon = iconByIndex[id];
        const items = resolvedExams.filter(
          (it) => it.status === statusByIndex[id]
        );

        return (
          <section key={id}>
            {/* add status-based class so header icon can have the right color */}
            {(() => {
              const status = statusByIndex[id];
              const sectionRowClass = `${styles.sectionRow} ${
                styles["sectionRow_" + status]
              }`;
              return (
                <div className={sectionRowClass}>
                  {Icon ? (
                    <Icon aria-hidden="true" className={styles.sectionIcon} />
                  ) : null}
                  <span>{text}</span>
                </div>
              );
            })()}

            <div className={styles.panel}>
              {items.length ? (
                items.map((it) => {
                  if (it.status === "in_process") {
                    return (
                      <div
                        key={it.id}
                        className={`${styles.inProcessCard} ${
                          styles["examCardItem_" + it.status]
                        }`}
                      >
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>
                            {it.title}
                            {it.priority && (
                              <span
                                className={`${styles.priority} ${
                                  styles["priority_" + it.priority]
                                }`}
                              >
                                {it.priority === "urgente"
                                  ? "Urgente"
                                  : it.priority === "alta"
                                  ? "Alta"
                                  : "Normal"}
                              </span>
                            )}
                          </span>

                          <span
                            className={`${styles.statusBadge} ${styles.status_in_process}`}
                          >
                            Em análise
                          </span>
                        </div>

                        <div className={styles.inProcessRow}>
                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Tipo</div>
                            <div className={styles.rowValue}>{it.type}</div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Solicitado</div>
                            <div className={styles.rowValue}>
                              {it.requestedAt &&
                                new Date(it.requestedAt).toLocaleDateString(
                                  "pt-BR"
                                )}
                            </div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Coletado</div>
                            <div className={styles.rowValue}>
                              {it.collectedAt
                                ? new Date(it.collectedAt).toLocaleDateString(
                                    "pt-BR"
                                  )
                                : "-"}
                            </div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Previsão</div>
                            <div className={styles.rowValue}>
                              {it.expectedAt
                                ? new Date(it.expectedAt).toLocaleDateString(
                                    "pt-BR"
                                  )
                                : "-"}
                            </div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Código</div>
                            <div className={styles.rowValue}>{it.code}</div>
                          </div>

                          {it.instructions && (
                            <div className={styles.instructions}>
                              <strong>Instruções:</strong> {it.instructions}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (it.status === "completed") {
                    return (
                      <div
                        key={it.id}
                        className={`${styles.completedCard} ${
                          styles["examCardItem_" + it.status]
                        }`}
                      >
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>
                            {it.title}
                            {it.priority && (
                              <span
                                className={`${styles.priority} ${
                                  styles["priority_" + it.priority]
                                }`}
                              >
                                {it.priority === "urgente"
                                  ? "Urgente"
                                  : it.priority === "alta"
                                  ? "Alta"
                                  : "Normal"}
                              </span>
                            )}
                          </span>

                          <span
                            className={`${styles.statusBadge} ${styles.status_completed}`}
                          >
                            Concluído
                          </span>
                        </div>

                        <div className={styles.inProcessRow}>
                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Tipo</div>
                            <div className={styles.rowValue}>{it.type}</div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Data</div>
                            <div className={styles.rowValue}>
                              {it.completedAt
                                ? new Date(it.completedAt).toLocaleDateString(
                                    "pt-BR"
                                  )
                                : it.requestedAt &&
                                  new Date(it.requestedAt).toLocaleDateString(
                                    "pt-BR"
                                  )}
                            </div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Médico</div>
                            <div className={styles.rowValue}>{it.doctor}</div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Resultado</div>
                            <div
                              className={`${styles.rowValue} ${styles.resultValue}`}
                            >
                              <span
                                className={`${styles.resultLabel} ${
                                  styles[
                                    "result_" + (it.result?.level ?? "normal")
                                  ]
                                }`}
                              >
                                {it.result?.text ?? "Normal"}
                              </span>
                            </div>
                          </div>

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}>Código</div>
                            <div className={styles.rowValue}>{it.code}</div>
                          </div>

                          {it.instructions && (
                            <div className={styles.instructions}>
                              <strong>Instruções:</strong> {it.instructions}
                            </div>
                          )}

                          <div className={styles.rowItem}>
                            <div className={styles.rowLabel}> </div>
                            <div className={styles.rowValue}>
                              <div className={styles.actions}>
                                <button
                                  className={styles.actionBtn}
                                  aria-label="Ver resultado"
                                >
                                  👁️
                                </button>
                                <button
                                  className={styles.actionBtn}
                                  aria-label="Baixar resultado"
                                >
                                  ⬇️
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // default / pending
                  return (
                    <div
                      key={it.id}
                      className={`${styles.examCardItem} ${
                        styles["examCardItem_" + it.status]
                      }`}
                    >
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>
                          {it.title}
                          {it.priority && (
                            <span
                              className={`${styles.priority} ${
                                styles["priority_" + it.priority]
                              }`}
                            >
                              {it.priority === "urgente"
                                ? "Urgente"
                                : it.priority === "alta"
                                ? "Alta"
                                : "Normal"}
                            </span>
                          )}
                        </span>

                        <span
                          className={`${styles.statusBadge} ${styles.status_pending}`}
                        >
                          Solicitado
                        </span>
                      </div>

                      <div className={styles.inProcessRow}>
                        <div className={styles.rowItem}>
                          <div className={styles.rowLabel}>Tipo</div>
                          <div className={styles.rowValue}>
                            {it.type ?? "-"}
                          </div>
                        </div>

                        <div className={styles.rowItem}>
                          <div className={styles.rowLabel}>Solicitado</div>
                          <div className={styles.rowValue}>
                            {it.requestedAt &&
                              new Date(it.requestedAt).toLocaleDateString(
                                "pt-BR"
                              )}
                          </div>
                        </div>

                        <div className={styles.rowItem}>
                          <div className={styles.rowLabel}>Médico</div>
                          <div className={styles.rowValue}>
                            {it.doctor ?? "-"}
                          </div>
                        </div>

                        <div className={styles.rowItem}>
                          <div className={styles.rowLabel}>Código</div>
                          <div className={styles.rowValue}>
                            {it.code ?? "-"}
                          </div>
                        </div>

                        {it.instructions && (
                          <div className={styles.instructions}>
                            <strong>Instruções:</strong> {it.instructions}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>Nenhum exame</div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

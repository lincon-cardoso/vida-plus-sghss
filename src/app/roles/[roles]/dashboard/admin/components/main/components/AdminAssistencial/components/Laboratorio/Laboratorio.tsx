import {
  CheckCircle,
  Clock,
  Microscope,
  UploadCloud,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./Laboratorio.module.scss";
import { LAB_ITEMS, type LabItem, type LabStatus } from "./data";

/**
 * Formata uma data ISO para formato "dd/mm/yyyy hh:mm" (pt-BR).
 * @param iso string | undefined
 * @returns string formatada ou vazio
 */
function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  } catch {
    return iso;
  }
}

/**
 * Badge de status (pequeno) usado na listagem de exames.
 */
function StatusBadge({ status }: { status: LabStatus }) {
  const labelMap: Record<LabStatus, string> = {
    aguardando: "Aguardando Coleta",
    em_analise: "Em Análise",
    concluido: "Concluído",
  };
  return (
    <span className={`${styles.smallBadge} ${styles["status_" + status]}`}>
      {labelMap[status]}
    </span>
  );
}

/**
 * Cartão de resumo (contagem) do painel superior.
 */
function SummaryCard({
  icon,
  value,
  label,
  variant = "primary",
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  variant?: "primary" | "info" | "success";
}) {
  const iconClass =
    variant === "info"
      ? styles.iconInfo
      : variant === "success"
        ? styles.iconSuccess
        : styles.iconPrimary;

  return (
    <div className={styles.summaryCard} role="region" aria-live="polite">
      <div className={styles.summaryIcon} aria-hidden={true}>
        <div className={`${styles.iconBox} ${iconClass}`}>{icon}</div>
      </div>
      <div>
        <div className={styles.summaryNumber}>{value}</div>
        <div className={styles.summaryLabel}>{label}</div>
      </div>
    </div>
  );
}

/**
 * Componente principal do painel de Laboratório.
 * Renderiza resumo e a lista de solicitações conforme design.
 */
export default function Laboratorio() {
  const items: LabItem[] = LAB_ITEMS;

  // Ordenação: aguardando -> em_analise -> concluido (prioriza o que precisa ação)
  const sortedItems = [...items].sort((a, b) => {
    const order: Record<LabStatus, number> = {
      aguardando: 0,
      em_analise: 1,
      concluido: 2,
    };
    return (order[a.status] ?? 99) - (order[b.status] ?? 99);
  });

  const counts = {
    aguardando: items.filter((i) => i.status === "aguardando").length,
    em_analise: items.filter((i) => i.status === "em_analise").length,
    concluidos: items.filter((i) => i.status === "concluido").length,
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Laboratório - Gestão de Exames</h2>
          <p className={styles.subtitle}>
            Solicitações, coleta e liberação de resultados
          </p>
        </div>

        <div className={styles.summaryRow} aria-label="Resumo de exames">
          <SummaryCard
            icon={<Clock size={20} />}
            value={counts.aguardando}
            label="Aguardando Coleta"
            variant="primary"
          />
          <SummaryCard
            icon={<Microscope size={20} />}
            value={counts.em_analise}
            label="Em Análise"
            variant="info"
          />
          <SummaryCard
            icon={<CheckCircle size={20} />}
            value={counts.concluidos}
            label="Concluídos Hoje"
            variant="success"
          />
        </div>
      </header>

      <section className={styles.listWrapper} aria-labelledby="labs-stitle">
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 id="labs-title" className={styles.sectionTitle}>
              Solicitações de Exames
            </h3>
            <p className={styles.sectionSubtitle}>
              Exames solicitados pelos médicos durante atendimento
            </p>
          </div>

          <div
            className={styles.panelBody}
            role="list"
            aria-label="Lista de solicitações de exames"
          >
            {sortedItems.map((it) => {
              const Icon = it.icon as LucideIcon | undefined;
              const typeKey = it.type.toLowerCase().replace(/[^a-z0-9]+/g, "");
              return (
                <article
                  role="listitem"
                  key={it.id}
                  className={`${styles.itemRow} ${styles["itemRow_" + it.status]}`}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.patientRow}>
                      <strong className={styles.patientName}>
                        {it.patient}
                      </strong>

                      <div className={styles.badges}>
                        <StatusBadge status={it.status} />

                        {it.priority && (
                          <span
                            className={`${styles.smallBadge} ${styles.priorityBadge}`}
                          >
                            {it.priority === "urgente" ? "Urgente" : "Rotina"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.titleRow}>
                      {Icon ? (
                        <div
                          className={`${styles.typeTag} ${styles["type_" + typeKey]}`}
                        >
                          <div
                            className={styles.typeIconBox}
                            aria-hidden={true}
                          >
                            <Icon className={styles.typeIcon} />
                          </div>
                          <span className={styles.typeLabel}>{it.type}</span>
                        </div>
                      ) : null}
                      <div className={styles.testTitle}>{it.title}</div>
                    </div>

                    <div className={styles.metaLine}>
                      <span>
                        Solicitado por: <strong>{it.requestedBy}</strong>
                      </span>
                      <span className={styles.metaSep}>•</span>
                      <span>{formatDate(it.requestedAt)}</span>
                    </div>

                    {it.justification && (
                      <div className={styles.justification}>
                        Justificativa: {it.justification}
                      </div>
                    )}

                    {it.result && (
                      <div className={styles.resultBox}>
                        <strong>Resultado:</strong> {it.result}
                      </div>
                    )}
                  </div>

                  <div className={styles.itemRight}>
                    <div className={styles.actionWrap}>
                      {it.status === "aguardando" && (
                        <button
                          type="button"
                          className={styles.btnPrimary}
                          aria-label={`Iniciar análise ${it.title}`}
                        >
                          <span className={styles.btnIcon} aria-hidden={true}>
                            🔬
                          </span>
                          Iniciar Análise
                        </button>
                      )}

                      {it.status === "em_analise" && (
                        <button
                          type="button"
                          className={styles.btnSuccess}
                          aria-label={`Inserir resultado ${it.title}`}
                        >
                          <UploadCloud className={styles.btnSvg} />
                          Inserir Resultado
                        </button>
                      )}

                      {it.status === "concluido" && (
                        <button
                          type="button"
                          className={styles.btnConcluded}
                          aria-label={`Concluído ${it.title}`}
                          disabled
                        >
                          <Check className={styles.btnSvg} />
                          Concluído
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

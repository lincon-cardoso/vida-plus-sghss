"use client";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./RegrasNegocioAlertas.module.scss";
import {
  EMPTY_STATE_ICON,
  RULE_HISTORY,
  RULE_SETTINGS,
  RULE_SUMMARY_CARDS,
  RULE_TABS,
  type BusinessRuleSummaryCard,
  type RuleTabKey,
} from "./data";

function SummaryCard({ card }: { card: BusinessRuleSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryTop}>
        <span className={styles.summaryLabel}>{card.label}</span>
        <Icon size={18} className={styles.summaryIcon} />
      </div>

      <strong
        className={`${styles.summaryValue} ${card.valueTone === "danger" ? styles.dangerValue : ""}`}
      >
        {card.value}
      </strong>
      <span className={styles.summaryHelper}>{card.helper}</span>
    </article>
  );
}

export default function RegrasNegocioAlertas() {
  const [activeTab, setActiveTab] = useState<RuleTabKey>("alertas");
  const EmptyIcon = EMPTY_STATE_ICON as LucideIcon;

  return (
    <section className={styles.root} aria-labelledby="regras-alertas-title">
      <header className={styles.header}>
        <h2 id="regras-alertas-title" className={styles.title}>
          Regras de Negócio e Alertas
        </h2>
        <p className={styles.subtitle}>
          Gerenciamento de limites de tempo, priorização e conformidade
        </p>
      </header>

      <div
        className={styles.summaryGrid}
        aria-label="Resumo das regras e alertas"
      >
        {RULE_SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div
        className={styles.tabsBar}
        role="tablist"
        aria-label="Abas de regras"
      >
        {RULE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "alertas" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              Alertas e Violações Detectadas
            </h3>
            <p className={styles.panelSubtitle}>
              Pacientes que ultrapassaram os limites de tempo estabelecidos
            </p>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrap}>
              <EmptyIcon size={22} />
            </div>
            <h4 className={styles.emptyTitle}>Nenhuma violação detectada</h4>
            <p className={styles.emptyText}>
              Todos os pacientes dentro dos limites estabelecidos
            </p>
          </div>
        </section>
      )}

      {activeTab === "configuracoes" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Configurações Ativas</h3>
            <p className={styles.panelSubtitle}>
              Regras responsáveis pelo monitoramento de conformidade e
              prioridade
            </p>
          </div>

          <div className={styles.contentList}>
            {RULE_SETTINGS.map((item) => (
              <article key={item.id} className={styles.itemCard}>
                <div className={styles.itemMain}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>

                <div className={styles.itemMeta}>
                  <span
                    className={`${styles.badge} ${styles[item.statusTone]}`}
                  >
                    {item.statusLabel}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "historico" && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Histórico de Ajustes</h3>
            <p className={styles.panelSubtitle}>
              Últimas revisões aplicadas às regras e parâmetros do sistema
            </p>
          </div>

          <div className={styles.contentList}>
            {RULE_HISTORY.map((item) => (
              <article key={item.id} className={styles.itemCard}>
                <div className={styles.itemMain}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>

                <div className={styles.itemMeta}>
                  <span className={styles.timestamp}>{item.timestamp}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

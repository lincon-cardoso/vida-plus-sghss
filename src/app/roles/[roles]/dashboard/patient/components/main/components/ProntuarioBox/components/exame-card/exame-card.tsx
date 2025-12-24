"use client";
import { useMemo, useState } from "react";
import type {
  ProntuarioTabItem,
  ProntuarioTabKey,
} from "../../types/ProntuarioBox.types";
import styles from "./styles/exame-card.module.scss";
import ExameCardPage from "./components/Examecard/page";
import DadosPessoaisPage from "./components/DadosPessoais/page";
import type { ProntuarItem } from "../../types/ProntuarioBox.types";

interface Props {
  tabs?: ProntuarioTabItem[];
  examItems?: ProntuarItem[];
}

export default function ExameCard({ tabs, examItems }: Props) {
  const resolvedTabs: ProntuarioTabItem[] = useMemo(
    () =>
      tabs?.length
        ? tabs
        : [
            { key: "Meus Exames", label: "Meus Exames" },
            { key: "Dados Pessoais", label: "Dados Pessoais" },
            { key: "Histórico Médico", label: "Histórico Médico" },
          ],
    [tabs]
  );

  const [activeTab, setActiveTab] = useState<ProntuarioTabKey>("Meus Exames");
  const idify = (s: string) => s.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={styles.exameCard}>
      {/* Barra de guias */}
      <nav
        className={styles.tabs}
        aria-label="Guias do prontuário"
        role="tablist"
      >
        {resolvedTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.Icon;

          return (
            <button
              key={tab.key}
              id={`tab-${idify(tab.key)}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
            >
              {Icon ? (
                <Icon aria-hidden="true" className={styles.icon} />
              ) : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Conteúdo: 1 guia por vez */}
      <section
        role="tabpanel"
        id={`tabpanel-${idify(activeTab)}`}
        aria-labelledby={`tab-${idify(activeTab)}`}
        className={styles.tabPanel}
      >
        {activeTab === "Meus Exames" && <ExameCardPage examItems={examItems} />}

        {activeTab === "Dados Pessoais" && <DadosPessoaisPage />}

        {activeTab === "Histórico Médico" && (
          <div>
            <h2>Histórico Médico</h2>
            {/* Lista de consultas, diagnósticos, etc */}
          </div>
        )}
      </section>
    </div>
  );
}

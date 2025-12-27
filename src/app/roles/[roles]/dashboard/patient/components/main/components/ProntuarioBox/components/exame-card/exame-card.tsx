"use client";
import { FileText, TestTube, Users } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ProntuarioTabItem,
  ProntuarioTabKey,
} from "../../types/ProntuarioBox.types";
import styles from "./styles/exame-card.module.scss";
import ExameCardPage from "./components/Examecard/page";
import DadosPessoaisPage from "./components/DadosPessoais/page";
import HistoricoMedicoPage from "./components/HistoricoMedico/page";

interface Props {
  tabs?: ProntuarioTabItem[];
}

export default function ExameCard({ tabs }: Props) {
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

  function getTabIcon(tabKey: ProntuarioTabKey) {
    switch (tabKey) {
      case "Meus Exames":
        return TestTube;
      case "Dados Pessoais":
        return Users;
      case "Histórico Médico":
        return FileText;
    }
  }

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
          const Icon = getTabIcon(tab.key);

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
        {activeTab === "Meus Exames" && <ExameCardPage />}

        {activeTab === "Dados Pessoais" && <DadosPessoaisPage />}

        {activeTab === "Histórico Médico" && <HistoricoMedicoPage />}
      </section>
    </div>
  );
}

"use client";
import { useMemo, useState } from "react";
import type { ProntuarioTabItem, ProntuarioTabKey } from "../../types/ProntuarioBox.types";

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
  return (
    <div>
      {/* Barra de guias */}
      <nav aria-label="Guias do prontuário" role="tablist">
        {resolvedTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.Icon;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontWeight: isActive ? 600 : 400,
                textDecoration: isActive ? "underline" : "none",
                padding: "12px 16px",
              }}
            >
              {Icon ? <Icon aria-hidden="true" /> : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Conteúdo: 1 guia por vez */}
      <section role="tabpanel" style={{ marginTop: 16 }}>
        {activeTab === "Meus Exames" && (
          <div>
            <h2>Exames Solicitados - Aguardando Realização</h2>
            {/* Aqui você renderiza seus cards */}
            {/* <ExameCard /> */}
          </div>
        )}

        {activeTab === "Dados Pessoais" && (
          <div>
            <h2>Dados Pessoais</h2>
            {/* Form / informações do paciente */}
          </div>
        )}

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

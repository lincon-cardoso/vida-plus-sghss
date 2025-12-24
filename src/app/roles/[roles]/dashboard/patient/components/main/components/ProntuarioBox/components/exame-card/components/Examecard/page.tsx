"use client";

import { useMemo } from "react";
import styles from "./styles/exame-card.module.scss";
import type { ProntuarItem } from "../../../../types/ProntuarioBox.types";

interface Props {
  examItems?: ProntuarItem[];
}

export default function ExameCard({ examItems }: Props) {
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

  return (
    <main className={styles.exameCard}>
      {sections.map((text, id) => (
        <div key={id} className={styles.sectionRow}>
          {(() => {
            const Icon = iconByIndex[id];
            return Icon ? (
              <Icon aria-hidden="true" className={styles.sectionIcon} />
            ) : null;
          })()}
          <span>{text}</span>
        </div>
      ))}
    </main>
  );
}

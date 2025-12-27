"use client";
import type { ProntuarioBoxProps } from "./types/ProntuarioBox.types";
import WelcomeBox from "@/app/roles/[roles]/dashboard/patient/components/main/components/WelcomeBox/WelcomeBox";
import styles from "./ProntuarioBox.module.scss";
import ProntuarioItem from "./components/ProntuarioItem/ProntuarioItem";
import ExameCard from "./components/exame-card/exame-card";

export default function ProntuarioBox({
  items,
  title = "Meu Prontuário Médico",
  subtitle = "Acesse suas informações de saúde, exames e histórico médico",
  tabs,
}: ProntuarioBoxProps) {
  return (
    <div className={styles.prontuarioBox}>
      <div className={styles.prontuarioContent}>
        <WelcomeBox title={title} subtitle={subtitle} />
        <ProntuarioItem items={items} />
        <ExameCard tabs={tabs} />
      </div>
    </div>
  );
}

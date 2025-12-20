"use client";
import WelcomeBox from "@/app/roles/[roles]/dashboard/patient/components/main/components/WelcomeBox/WelcomeBox";
import styles from "./ProntuarioBox.module.scss";

export type ProntuarioBoxProps = {
  title?: string;
  subtitle?: string;
};

export default function ProntuarioBox({}: ProntuarioBoxProps) {
  return (
    <div className={styles.prontuarioBox}>
      <WelcomeBox
        title="Meu Prontuário Médico"
        subtitle="Acesse suas informações de saúde, exames e histórico médico"
      />
    </div>
  );
}

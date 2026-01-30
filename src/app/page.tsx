import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "VidaPlus - Plataforma de Gestão Hospitalar",
  description:
    "VidaPlus — Plataforma moderna e segura para gestão de serviços de saúde, telemedicina e atendimento ao paciente.",
  keywords: [
    "VidaPlus",
    "saúde",
    "hospital",
    "telemedicina",
    "prontuário eletrônico",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>VidaPlus</h1>
      <p className={styles.description}>
        Plataforma de Gestão Hospitalar (SGHSS) — soluções para hospitais,
        clínicas e profissionais de saúde. Acesse sua conta para gerenciar
        agendamentos, prontuários e teleconsulta.
      </p>
      <div
        style={{
          width: "800px",
          height: "400px",
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        <p>VidaPlus Logo Placeholder</p>
      </div>
      <p>
        <Link href="/login" className={styles.link}>
          Acessar Minha Conta
        </Link>
      </p>
    </main>
  );
}

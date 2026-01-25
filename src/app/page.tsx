import Link from "next/link";
import type { Metadata } from "next";

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
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <h1>VidaPlus</h1>
      <p>
        Plataforma de Gestão Hospitalar (SGHSS) — soluções para hospitais,
        clínicas e profissionais de saúde. Acesse sua conta para gerenciar
        agendamentos, prontuários e teleconsulta.
      </p>
      <p>
        <Link href="/login">Acessar Minha Conta</Link>
      </p>
    </main>
  );
}

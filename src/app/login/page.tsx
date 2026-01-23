import styles from "./style/login.module.scss";
import LoginForm from "./components/LoginForm"; // componente client local
import LoginHeader from "./components/LoginHeader"; // componente server local
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - VidaPlus",
  description:
    "Acesse sua conta no VidaPlus - Sistema de Gestão Hospitalar. Login seguro para pacientes, médicos e administradores.",
  keywords: ["login", "acesso", "VidaPlus", "saúde", "hospital"],
  robots: {
    index: false, // Não indexar página de login
    follow: false,
  },
};

export default async function login() {
  return (
    <div className={styles.estiloLogin}>
      <div className={styles.caixaLogin}>
        <div className={styles.textoLogin}>
          <LoginHeader />
        </div>
        <div className={styles.formularioLogin}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

import styles from "./styles/loginStyle.module.scss";
import { Heart, Stethoscope, Shield } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <Heart />
        </div>
        <div className={styles.text}>
          <h1 className={styles.title} id="vida-plus-title">
            VidaPlus
          </h1>
          <p className={styles.subtitle}>Cuidando de você com excelência</p>
        </div>
      </div>
      <div aria-label={styles.taglineGroup}>
        <h2 className={styles.tagline}>
          <span className={styles.taglineMain}>
            Sistema de Gestão Hospitalar
          </span>
          <br />
          <span className={styles.taglineHighlight}>Completo e Integrado</span>
        </h2>
        <p className={styles.description}>
          Plataforma moderna e segura para gestão de serviços de saúde,
          telemedicina e atendimento ao paciente.
        </p>
      </div>
    </div>
  );
}
// <Stethoscope />
// <Shield />
// <Heart />

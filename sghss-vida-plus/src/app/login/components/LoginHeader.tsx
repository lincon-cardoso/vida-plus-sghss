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
      <div className={styles.taglineGroup}>
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
      <div className={styles.information} aria-hidden="true">
        <div className={styles.informationItem}>
          <div className={styles.informationImage}>
            <Stethoscope />
          </div>
          <div className={styles.informationText}>
            <h3 className={styles.informationTitle}>Telemedicina Integrada</h3>
            <p className={styles.informationDescription}>
              Consultas online seguras e eficientes
            </p>
          </div>
        </div>
        <div className={styles.informationItem}>
          <div className={styles.informationImage}>
            <Shield />
          </div>
          <div className={styles.informationText}>
            <h3 className={styles.informationTitle}>Telemedicina Integrada</h3>
            <p className={styles.informationDescription}>
              Consultas online seguras e eficientes
            </p>
          </div>
        </div>
        <div className={styles.informationItem}>
          <div className={styles.informationImage}>
            <Stethoscope />
          </div>
          <div className={styles.informationText}>
            <h3 className={styles.informationTitle}>Telemedicina Integrada</h3>
            <p className={styles.informationDescription}>
              Consultas online seguras e eficientes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * LoginHeader — Server Component (padrão).
 * Componente estático de apresentação.
 * Motivo: não usa estado nem efeitos do browser; mantido como Server Component para performance.
 */
import styles from "./styles/loginStyle.module.scss";
import { Heart } from "lucide-react";
import { features } from "./data";

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
      <div
        className={styles.information}
        role="list"
        aria-label="Recursos do sistema"
      >
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div className={styles.informationItem} role="listitem" key={f.id}>
              <div className={styles.informationImage} aria-hidden="true">
                <Icon />
              </div>
              <div className={styles.informationText}>
                <h3 className={styles.informationTitle}>{f.title}</h3>
                <p className={styles.informationDescription}>{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

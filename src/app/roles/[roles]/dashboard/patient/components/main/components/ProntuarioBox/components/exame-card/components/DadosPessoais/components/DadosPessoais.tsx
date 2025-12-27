"use client";

import styles from "./styles/DadosPessoais.module.scss";
import {
  User,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Contact,
  Heart,
  Droplet,
  AlertCircle,
} from "lucide-react";

type Patient = {
  nome?: string;
  nascimento?: string;
  sexo?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
};

interface Props {
  patient?: Patient;
}

export default function DadosPessoais({ patient }: Props) {
  const {
    nome = "Maria Silva Santos",
    nascimento = "15/03/1985 (39 anos)",
    cpf = "123.456.789-00",
    telefone = "—",
    email = "—",
    endereco = "Rua das Flores, 123 - São Paulo/SP",
  } = patient || {};

  return (
    <section className={styles.dadosPessoais}>
      <div className={styles.dadosPessoais__sections}>
        <div className={styles["dadosPessoais__card--informacoes"]}>
          <div className={styles.dadosPessoais__header}>
            <User className={styles.dadosPessoais__headerIcon} />
            <div className={styles.dadosPessoais__headerTitle}>
              Informações Pessoais
            </div>
          </div>

          <div className={styles.dadosPessoais__lista}>
            <div className={styles.dadosPessoais__item}>
              <div className={styles.dadosPessoais__label}>Nome Completo</div>
              <div className={styles.dadosPessoais__value}>{nome}</div>
            </div>

            <div className={styles.dadosPessoais__item}>
              <div className={styles.dadosPessoais__label}>CPF</div>
              <div className={styles.dadosPessoais__value}>
                <Shield className={styles.dadosPessoais__itemIcon} /> {cpf}
              </div>
            </div>

            <div
              className={`${styles.dadosPessoais__item} ${styles["dadosPessoais__item--full"]}`}
            >
              <div className={styles.dadosPessoais__label}>Nascimento</div>
              <div className={styles.dadosPessoais__value}>
                <Calendar className={styles.dadosPessoais__itemIcon} />{" "}
                {nascimento}
              </div>
            </div>

            <div
              className={`${styles.dadosPessoais__item} ${styles["dadosPessoais__item--full"]}`}
            >
              <div className={styles.dadosPessoais__label}>Endereço</div>
              <div className={styles.dadosPessoais__value}>
                <MapPin className={styles.dadosPessoais__itemIcon} /> {endereco}
              </div>
            </div>
          </div>
        </div>

        <aside className={styles["dadosPessoais__card--contato"]}>
          <div className={styles.dadosPessoais__header}>
            <Contact className={styles.dadosPessoais__headerIcon} />
            <div className={styles.dadosPessoais__headerTitle}>Contato</div>
          </div>

          <div className={styles.dadosPessoais__contactItem}>
            <Phone className={styles.dadosPessoais__contactIcon} />
            <div className={styles.dadosPessoais__contactText}>
              <div className={styles.dadosPessoais__contactLabel}>Telefone</div>
              <div className={styles.dadosPessoais__contactValue}>
                {telefone}
              </div>
            </div>
          </div>

          <div className={styles.dadosPessoais__contactItem}>
            <Mail className={styles.dadosPessoais__contactIcon} />
            <div className={styles.dadosPessoais__contactText}>
              <div className={styles.dadosPessoais__contactLabel}>Email</div>
              <div className={styles.dadosPessoais__contactValue}>{email}</div>
            </div>
          </div>
        </aside>
      </div>

      <section className={styles.dadosPessoais__clinicos}>
        <div className={styles.dadosPessoais__clinicosHeader}>
          <Heart className={styles.dadosPessoais__clinicosHeaderIcon} />
          <div className={styles.dadosPessoais__clinicosTitle}>
            Dados Clínicos Importantes
          </div>
        </div>

        <div className={styles.dadosPessoais__clinicosGrid}>
          <div
            className={`${styles.dadosPessoais__clinicosCard} ${styles["dadosPessoais__clinicosCard--tipo"]}`}
          >
            <div className={styles.dadosPessoais__clinicosCardTop}>
              <Droplet className={styles.dadosPessoais__clinicosCardIcon} />
              <div className={styles.dadosPessoais__clinicosCardLabel}>
                Tipo Sanguíneo
              </div>
            </div>
            <div className={styles.dadosPessoais__bloodType}>O+</div>
          </div>

          <div
            className={`${styles.dadosPessoais__clinicosCard} ${styles["dadosPessoais__clinicosCard--alergias"]}`}
          >
            <div className={styles.dadosPessoais__clinicosCardTop}>
              <AlertCircle className={styles.dadosPessoais__clinicosCardIcon} />
              <div className={styles.dadosPessoais__clinicosCardLabel}>
                Alergias
              </div>
            </div>
            <div className={styles.dadosPessoais__pills}>
              <span className={styles.dadosPessoais__pill}>Penicilina</span>
              <span className={styles.dadosPessoais__pill}>Dipirona</span>
            </div>
          </div>

          <div
            className={`${styles.dadosPessoais__clinicosCard} ${styles["dadosPessoais__clinicosCard--emergencia"]}`}
          >
            <div className={styles.dadosPessoais__clinicosCardTop}>
              <Phone className={styles.dadosPessoais__clinicosCardIcon} />
              <div className={styles.dadosPessoais__clinicosCardLabel}>
                Em Caso de Emergência
              </div>
            </div>
            <div className={styles.dadosPessoais__emergencyText}>
              João Silva - (11) 99999-8888
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

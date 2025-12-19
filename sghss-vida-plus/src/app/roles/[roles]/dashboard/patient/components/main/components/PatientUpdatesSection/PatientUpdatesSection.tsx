"use client";
import styles from "./PatientUpdatesSection.module.scss";

export default function PatientUpdatesSection() {
  return (
    <section className={styles.root} aria-label="Atualizações do paciente">
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Resultados Recentes</h3>
          </div>
          <ul className={styles.itemList}>
            <li className={styles.item}>
              <div>
                <strong>Hemograma Completo</strong>
                <p className={styles.itemDate}>08/11/2024</p>
              </div>
              <span className={styles.badge}>Disponível</span>
            </li>
            <li className={styles.item}>
              <div>
                <strong>Glicemia em Jejum</strong>
                <p className={styles.itemDate}>05/11/2024</p>
              </div>
              <span className={styles.badge}>Disponível</span>
            </li>
            <li className={styles.item}>
              <div>
                <strong>Colesterol Total</strong>
                <p className={styles.itemDate}>01/11/2024</p>
              </div>
              <span className={styles.badge}>Disponível</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Prescrições Ativas</h3>
          </div>
          <div className={styles.prescriptionCard}>
            <div>
              <strong>Losartana 50mg</strong>
              <p className={styles.prescriptionNote}>1 comprimido pela manhã</p>
              <p className={styles.prescriptionDoctor}>Dr. João Santos</p>
            </div>
            <div className={styles.prescriptionMeta}>
              <span className={styles.prescriptionStatus}>Ativa</span>
              <p className={styles.prescriptionValid}>Válida até 15/12/2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

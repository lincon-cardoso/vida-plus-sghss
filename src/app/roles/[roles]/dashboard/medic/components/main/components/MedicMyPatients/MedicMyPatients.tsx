import styles from "./MedicMyPatients.module.scss";
import { defaultMyPatientsItems } from "./data";

/**
 * MedicMyPatients
 * Lista simples de pacientes atribuídos ao médico (placeholder).
 */
export default function MedicMyPatients() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Meus Pacientes</h2>
      <p className={styles.description}>Pacientes atribuídos a você.</p>

      <ul className={styles.list}>
        {defaultMyPatientsItems.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}

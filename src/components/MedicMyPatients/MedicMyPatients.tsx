import styles from "./MedicMyPatients.module.scss";

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
        <li>Ana Paula — 28 anos</li>
        <li>Roberto Carlos — 54 anos</li>
      </ul>
    </div>
  );
}

import styles from "./MedicInService.module.scss";
import { defaultInServiceItems } from "./data";

/**
 * MedicInService
 * Lista simples de atendimentos em andamento (placeholder).
 */
export default function MedicInService() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Em Atendimento</h2>
      <p className={styles.description}>
        Lista de pacientes em atendimento agora.
      </p>

      <ul className={styles.list}>
        {defaultInServiceItems.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}

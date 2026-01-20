import styles from "./MedicInService.module.scss";

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
        <li>João da Silva — Sala 1</li>
        <li>Maria Oliveira — Sala 2</li>
      </ul>
    </div>
  );
}

import styles from "./BancoSangue.module.scss";

/**
 * Placeholder para Banco de Sangue.
 */
export default function BancoSangue() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Banco de Sangue</h3>
      <div className={styles.content}>
        Componente inicial do banco de sangue.
      </div>
    </div>
  );
}

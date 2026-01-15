import styles from "./MedicHome.module.scss";
export default function MedicHome() {
  return (
    <div className={styles.dashboardContent}>
      <h2 className={styles.title}>Home</h2>
      <p className={styles.description}>
        Bem-vindo ao dashboard do médico. Aqui você pode acessar todas as
        funcionalidades principais.
      </p>
    </div>
  );
}

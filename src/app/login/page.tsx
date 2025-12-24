import styles from "./style/login.module.scss";
import LoginForm from "./components/LoginForm"; // componente client local
import LoginHeader from "./components/LoginHeader"; // componente server local


export default async function login() {
  return (
    <div className={styles.estiloLogin}>
      <div className={styles.caixaLogin}>
        <div className={styles.textoLogin}>
          <LoginHeader />
        </div>
        <div className={styles.formularioLogin}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

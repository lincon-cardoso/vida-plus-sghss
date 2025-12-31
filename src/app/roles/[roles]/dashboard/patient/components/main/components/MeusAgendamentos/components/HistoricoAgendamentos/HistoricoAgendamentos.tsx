import styles from "./styles/HistoricoAgendamentos.module.scss";
import {Filter} from "lucide-react";

export default function HistoricoAgendamentos() {
  return (
    <div className={styles.historicoContent}>
      <h2>Histórico de Agendamentos</h2>
      <Filter />
      <p>Você não tem agendamentos anteriores.</p>
    </div>
  );
}

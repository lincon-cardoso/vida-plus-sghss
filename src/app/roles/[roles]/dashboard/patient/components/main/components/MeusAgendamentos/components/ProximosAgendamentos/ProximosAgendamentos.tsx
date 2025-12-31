import styles from "./styles/ProximosAgendamentos.module.scss";
import { Calendar } from "lucide-react";
import ScheduleAppointmentDialog from "../../../ScheduleAppointmentDialog/ScheduleAppointmentDialog";

export default function ProximosAgendamentos() {
  return (
    <div className={styles.proximasContent}>
      <Calendar className={styles.icon} />
      <h2 className={styles.title}>Nenhuma consulta agendada</h2>
      <p className={styles.description}>
        Agende sua primeira consulta para começar
      </p>
      <ScheduleAppointmentDialog
        trigger={
          <button className={styles["nova-consulta-btn"]}>Nova Consulta</button>
        }
      />
    </div>
  );
}

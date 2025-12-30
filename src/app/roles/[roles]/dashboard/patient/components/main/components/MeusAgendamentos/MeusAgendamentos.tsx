import WelcomeBox from "../WelcomeBox/WelcomeBox";
import { Plus } from "lucide-react";
import styles from "./styles/MeusAgendamentos.module.scss";
import ScheduleAppointmentDialog from "../ScheduleAppointmentDialog/ScheduleAppointmentDialog";

export default function MeusAgendamentos() {
  return (
    <section className={styles["meus-agendamentos"]}>
      <WelcomeBox
        title="Meus Agendamentos"
        subtitle="Consulte e gerencie suas consultas."
        actions={
          <ScheduleAppointmentDialog
            trigger={
              <button className={styles["nova-consulta-btn"]}>
                <Plus className={styles.icon} />
                Nova Consulta
              </button>
            }
          />
        }
      />
    </section>
  );
}

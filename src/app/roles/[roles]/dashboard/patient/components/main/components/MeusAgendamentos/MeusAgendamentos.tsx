import WelcomeBox from "../WelcomeBox/WelcomeBox";
import { Plus, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "./styles/MeusAgendamentos.module.scss";
import ScheduleAppointmentDialog from "../ScheduleAppointmentDialog/ScheduleAppointmentDialog";

export default function MeusAgendamentos() {
  const items = [
    { text: "Próximas", icon: Calendar, number: 5 },
    { text: "Realizadas", icon: CheckCircle, number: 10 },
    { text: "Canceladas", icon: XCircle, number: 2 },
  ];

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

      <div className={styles.squaresContainer}>
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className={styles.square}>
              <IconComponent className={styles.squareIcon} />
              <span className={styles.squareText}>{item.text}</span>
              <span className={styles.squareNumber}>{item.number}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

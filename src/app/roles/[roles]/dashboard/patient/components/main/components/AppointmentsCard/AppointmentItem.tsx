import styles from "../../styles/PatientMenu.module.scss";

type Status = "Confirmada" | "Pendente";

export type Appointment = {
  avatar: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: Status;
};

type Props = {
  appointment: Appointment;
};

function getStatusClass(status: Status) {
  switch (status) {
    case "Confirmada":
      return styles.confirmed;
    case "Pendente":
      return styles.pending;
    default:
      return "";
  }
}

export default function AppointmentItem({ appointment }: Props) {
  return (
    <li className={styles.appointmentItem}>
      <div className={styles.appointmentLeft}>
        <div className={styles.appointmentAvatar}>{appointment.avatar}</div>
        <div className={styles.appointmentDetails}>
          <p className={styles.doctorName}>{appointment.doctorName}</p>
          <p className={styles.specialty}>{appointment.specialty}</p>
        </div>
      </div>

      <div className={styles.appointmentRight}>
        <p className={styles.appointmentDate}>{appointment.date}</p>
        <p className={styles.appointmentTime}>{appointment.time}</p>
        <p
          className={`${styles.appointmentStatus} ${getStatusClass(
            appointment.status,
          )}`}
        >
          {appointment.status}
        </p>
      </div>
    </li>
  );
}

"use client";

import type { ReactNode } from "react";
import styles from "../../styles/PatientMenu.module.scss";
import AppointmentItem, { type Appointment } from "./AppointmentItem";

type Props = {
  title: string;
  appointments: Appointment[];
  footer?: ReactNode;
};

export default function AppointmentsCard({
  title,
  appointments,
  footer,
}: Props) {
  return (
    <div className={styles.appointmentsRoot}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={styles.appointmentsCard}
        aria-label="Lista de próximas consultas"
      >
        <ul className={styles.appointmentList}>
          {appointments.map((appointment) => (
            <AppointmentItem
              key={`${appointment.doctorName}-${appointment.date}-${appointment.time}`}
              appointment={appointment}
            />
          ))}
        </ul>

        {footer ? (
          <div className={styles.appointmentFooter}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

"use client";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import { Plus, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "./styles/MeusAgendamentos.module.scss";
import ScheduleAppointmentDialog from "../ScheduleAppointmentDialog/ScheduleAppointmentDialog";
import { useState } from "react";

export default function MeusAgendamentos() {
  const items = [
    { text: "Próximas", icon: Calendar, number: 5 },
    { text: "Realizadas", icon: CheckCircle, number: 10 },
    { text: "Canceladas", icon: XCircle, number: 2 },
  ];

  const [activeTab, setActiveTab] = useState("Próximas");

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
              <div className={styles.squareContent}>
                <span className={styles.squareText}>{item.text}</span>
                <span className={styles.squareNumber}>{item.number}</span>
              </div>
              <IconComponent
                className={`${styles.squareIcon} ${
                  styles[
                    `${item.text
                      .toLowerCase()
                      .replace("ç", "c")
                      .replace("ã", "a")}-icon`
                  ]
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Próximas" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Próximas")}
        >
          Próximas (0)
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Histórico" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Histórico")}
        >
          Histórico (1)
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "Próximas" && (
          <div className={styles.proximasContent}>
            <h2>Próximos Agendamentos</h2>
            <p>Você não tem agendamentos futuros.</p>
          </div>
        )}

        {activeTab === "Histórico" && (
          <div className={styles.historicoContent}>
            <h2>Histórico de Agendamentos</h2>
            <p>Você não tem agendamentos anteriores.</p>
          </div>
        )}
      </div>
    </section>
  );
}

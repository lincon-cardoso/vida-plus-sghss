"use client";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import { Plus, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "./styles/MeusAgendamentos.module.scss";
import ScheduleAppointmentDialog from "../ScheduleAppointmentDialog/ScheduleAppointmentDialog";
import { useState } from "react";
import ProximosAgendamentos from "./components/ProximosAgendamentos/ProximosAgendamentos";
import HistoricoAgendamentos from "./components/HistoricoAgendamentos/HistoricoAgendamentos";

export default function MeusAgendamentos() {
  const items = [
    { text: "Próximas", icon: Calendar, number: 5 },
    { text: "Realizadas", icon: CheckCircle, number: 10 },
    { text: "Canceladas", icon: XCircle, number: 2 },
  ];

  // Array para as tabs, facilitando o map
  const tabs = [
    { label: "Próximas", count: 0 },
    { label: "Histórico", count: 1 },
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

      {/* Botões de tab usando map para reduzir código */}
      <div className={styles.tabButtons}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`${styles.tabButton} ${
              activeTab === tab.label ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeTab === "Próximas" && <ProximosAgendamentos />}

        {activeTab === "Histórico" && <HistoricoAgendamentos />}
      </div>
    </section>
  );
}

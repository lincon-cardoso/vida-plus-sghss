"use client";

import { useState, useEffect } from "react";
import styles from "./MedicHome.module.scss";

import { Check, Play, Circle, AlertCircle } from "lucide-react";

import {
  stats,
  appointments,
  pendencias,
  performance,
  recentPatients,
  actions,
  mockDoctorName,
} from "./data";

export default function MedicHome({
  nome = mockDoctorName,
}: {
  nome?: string;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Atualiza a cada 60 segundos (1 minuto)

    return () => clearInterval(interval);
  }, []);

  const dataatual = currentDate;
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const diaSemana = diasSemana[dataatual.getDay()];
  const mesesAno = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const mesAno = mesesAno[dataatual.getMonth()];
  const diaMes = dataatual.getDate();
  const ano = dataatual.getFullYear();
  const hora = dataatual.getHours().toString().padStart(2, "0");
  const minuto = dataatual.getMinutes().toString().padStart(2, "0");
  const todayIso = dataatual.toISOString().split("T")[0];

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Bom dia, {nome}!</h2>
        <p className={styles.description}>
          Hoje é {diaSemana}, {diaMes} de {mesAno} de {ano} às {hora}:{minuto}.
        </p>
      </div>

      <section className={styles.statsSection} aria-label="Resumo do dia">
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <article
              key={s.id}
              className={`${styles.statCard} ${styles[`statCard${s.variant}`]}`}
              role="group"
              aria-labelledby={`stat-title-${s.id}`}
            >
              <div className={styles.statIcon} aria-hidden="true">
                {s.icon}
              </div>

              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statTitle} id={`stat-title-${s.id}`}>
                {s.title}
              </p>
              {s.subtext && <p className={styles.statSubtext}>{s.subtext}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.agendaSection} aria-label="Agenda do dia">
        <div className={styles.agendaGrid}>
          <div
            className={styles.agendaCard}
            role="region"
            aria-labelledby="agenda-title"
          >
            <header className={styles.agendaHeader}>
              <h3 id="agenda-title">Agenda de Hoje</h3>
              <p className={styles.agendaCount}>
                {appointments.length} consultas agendadas
              </p>
            </header>

            <ul className={styles.appointmentList} role="list">
              {appointments.map((a) => (
                <li
                  key={a.id}
                  className={styles.appointmentItem}
                  role="listitem"
                  data-status={a.status}
                >
                  <time
                    className={styles.appointmentTime}
                    dateTime={`${todayIso}T${a.time}`}
                  >
                    {a.time}
                  </time>

                  <div className={styles.appointmentDetails}>
                    <p className={styles.appointmentPatient}>{a.patient}</p>
                    <p className={styles.appointmentType}>{a.type}</p>
                  </div>

                  <div className={styles.appointmentAction}>
                    <span aria-hidden>
                      {a.status === "done" && <Check size={18} />}
                      {a.status === "in-progress" && <Play size={18} />}
                      {a.status === "scheduled" && <Circle size={18} />}
                    </span>

                    <span className={styles.srOnly}>
                      {a.status === "done"
                        ? "Concluído"
                        : a.status === "in-progress"
                          ? "Em andamento"
                          : "Agendado"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.sideColumn} aria-label="Resumo lateral">
            <div className={styles.pendingCard}>
              <h4 className={styles.pendingTitle}>Pendências</h4>
              <ul className={styles.pendingList}>
                {pendencias.map((p) => (
                  <li key={p.id} className={styles.pendingItem}>
                    <span
                      className={`${styles.pendingIcon} ${styles[`pendingIcon${p.variant}`]}`}
                      aria-hidden
                    >
                      <AlertCircle size={16} />
                    </span>
                    <span className={styles.pendingText}>
                      {p.count} {p.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.performanceCard}>
              <h4 className={styles.performanceTitle}>Performance do Mês</h4>
              <dl className={styles.performanceList}>
                {performance.map((perf) => (
                  <div key={perf.id} className={styles.performanceItem}>
                    <dt className={styles.performanceLabel}>{perf.label}</dt>
                    <dd className={styles.performanceValue}>{perf.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section
        className={styles.recentPatientsSection}
        aria-label="Pacientes Recentes"
      >
        <div
          className={styles.recentPatientsCard}
          role="region"
          aria-labelledby="recent-patients-title"
        >
          <header className={styles.recentHeader}>
            <h3 id="recent-patients-title">Pacientes Recentes</h3>
          </header>

          <ul className={styles.recentList} role="list">
            {recentPatients.map((p) => (
              <li key={p.id} className={styles.recentItem} role="listitem">
                <article
                  className={styles.patientCard}
                  aria-label={`Paciente ${p.name}`}
                >
                  <div className={styles.patientInfo}>
                    <div className={styles.patientAvatar} aria-hidden>
                      {p.name.charAt(0)}
                    </div>
                    <p className={styles.patientName}>{p.name}</p>
                    <p className={styles.patientDiagnosis}>{p.diagnosis}</p>
                    <p className={styles.patientLastVisit}>
                      Última visita: {p.lastVisit}
                    </p>
                  </div>

                  <div
                    className={`${styles.patientStatus} ${styles[`status${p.status.variant}`]}`}
                    role="status"
                    aria-label={`Status: ${p.status.label}`}
                  >
                    {p.status.label}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actionsGrid} aria-label="Ações rápidas">
          {actions.map((a) => (
            <button
              key={a.id}
              type="button"
              className={styles.actionTile}
              aria-label={a.label}
              disabled
            >
              <span className={styles.actionIcon} aria-hidden>
                {a.icon}
              </span>
              <span className={styles.actionLabel}>{a.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

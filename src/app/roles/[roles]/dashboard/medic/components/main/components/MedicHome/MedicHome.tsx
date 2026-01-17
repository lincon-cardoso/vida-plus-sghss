import styles from "./MedicHome.module.scss";

import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Check,
  Play,
  Circle,
  AlertCircle,
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Tipos de dado e dados estáticos para os cards do Dashboard do Médico.
 * Mantidos fora do componente para facilitar testes e reutilização.
 */
export type StatItem = {
  id: string;
  title: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  variant: "Blue" | "Green" | "Purple" | "Yellow";
};

export const stats: StatItem[] = [
  {
    id: "consultas",
    title: "Consultas Hoje",
    value: 8,
    subtext: "3 pendentes",
    icon: <Calendar size={20} aria-hidden />,
    variant: "Blue",
  },
  {
    id: "pacientes",
    title: "Pacientes Ativos",
    value: 145,
    subtext: "+12 este mês",
    icon: <Users size={20} aria-hidden />,
    variant: "Green",
  },
  {
    id: "satisfacao",
    title: "Taxa de Satisfação",
    value: "4.8",
    subtext: "★ de 5.0",
    icon: <TrendingUp size={20} aria-hidden />,
    variant: "Purple",
  },
  {
    id: "horas",
    title: "Horas Trabalhadas",
    value: "32h",
    subtext: "Esta semana",
    icon: <Clock size={20} aria-hidden />,
    variant: "Yellow",
  },
];

type Appointment = {
  id: string;
  time: string;
  patient: string;
  type: string;
  status: "done" | "in-progress" | "scheduled";
};

const appointments: Appointment[] = [
  {
    id: "a1",
    time: "09:00",
    patient: "Maria Silva Santos",
    type: "Consulta",
    status: "done",
  },
  {
    id: "a2",
    time: "10:00",
    patient: "Carlos Oliveira",
    type: "Retorno",
    status: "done",
  },
  {
    id: "a3",
    time: "11:00",
    patient: "Ana Paula Costa",
    type: "Consulta",
    status: "in-progress",
  },
  {
    id: "a4",
    time: "14:00",
    patient: "Pedro Souza",
    type: "Teleconsulta",
    status: "scheduled",
  },
  {
    id: "a5",
    time: "15:00",
    patient: "Juliana Martins",
    type: "Consulta",
    status: "scheduled",
  },
  {
    id: "a6",
    time: "16:00",
    patient: "Roberto Silva",
    type: "Retorno",
    status: "scheduled",
  },
];

type Pending = {
  id: string;
  title: string;
  count: number;
  variant: "Danger" | "Warning" | "Neutral";
};

const pendencias: Pending[] = [
  { id: "p1", title: "laudos para assinar", count: 3, variant: "Danger" },
  { id: "p2", title: "prescrições pendentes", count: 5, variant: "Warning" },
  { id: "p3", title: "pacientes em espera", count: 2, variant: "Neutral" },
];

const performance = [
  { id: "pf1", label: "Consultas realizadas", value: "89" },
  { id: "pf2", label: "Avaliação média", value: "4.8 ★" },
  { id: "pf3", label: "Taxa de retorno", value: "78%" },
];

export default function MedicHome() {
  const nome = "Lincon";
  const dataatual = new Date();
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

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Bom dia, {nome}!</h2>
        <p className={styles.description}>
          Hoje é {diaSemana}, {diaMes} de {mesAno} de {ano}.
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
                    dateTime={`2026-01-17T${a.time}`}
                  >
                    {a.time}
                  </time>

                  <div className={styles.appointmentDetails}>
                    <p className={styles.appointmentPatient}>{a.patient}</p>
                    <p className={styles.appointmentType}>{a.type}</p>
                  </div>

                  <div className={styles.appointmentAction} aria-hidden="true">
                    {a.status === "done" && <Check size={18} />}
                    {a.status === "in-progress" && <Play size={18} />}
                    {a.status === "scheduled" && <Circle size={18} />}
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
    </div>
  );
}

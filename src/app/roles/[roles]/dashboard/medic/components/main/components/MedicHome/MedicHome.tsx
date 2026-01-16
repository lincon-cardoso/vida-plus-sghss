import styles from "./MedicHome.module.scss";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";
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
    </div>
  );
}

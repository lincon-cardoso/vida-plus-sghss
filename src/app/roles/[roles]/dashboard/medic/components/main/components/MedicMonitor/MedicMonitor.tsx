import {
  Phone,
  Bell,
  UserPlus,
  Search,
  Monitor,
  Volume2,
  Filter,
  ChevronDown,
} from "lucide-react";
import type { ReactElement } from "react";
import styles from "./MedicMonitor.module.scss";
import { type MedicMonitorProps, defaultStats, defaultQueue } from "./data";

/**
 * Monitor do médico (fila + painel de chamadas).
 *
 * Aceita `stats` e `queue` via props para facilitar preview/testes,
 * mas usa dados padrão quando não forem fornecidos.
 */
export default function MedicMonitor({
  stats: propStats,
  queue: propQueue,
}: MedicMonitorProps = {}): ReactElement {
  const stats = propStats || defaultStats;
  const queue = propQueue || defaultQueue;

  function capitalizeFirst(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

  return (
    <section
      className={styles.medicMonitor}
      aria-labelledby="medic-monitor-title"
    >
      <header className={styles.medicMonitorHeader}>
        <div>
          <h2 id="medic-monitor-title">Gestão de Fila e Painel de Chamadas</h2>
          <p className={styles.description}>
            Controle completo da fila de atendimento com chamadas inteligentes
          </p>
        </div>
      </header>

      <ul
        className={styles.serviceList}
        role="list"
        aria-label="Resumo da fila"
      >
        {stats.map((s) => {
          const Icon = s.Icon;
          const idSuffix = capitalizeFirst(s.id);
          const iconClass = `${styles.icon} ${styles[`icon${idSuffix}`]}`;
          const statValueClass = `${styles.statValue} ${styles[`statValue${idSuffix}`]}`;
          return (
            <li
              key={s.id}
              className={styles.serviceItem}
              role="listitem"
              aria-labelledby={`${s.id}-label`}
            >
              <div className={styles.serviceInfo}>
                <div className={styles.nameRow}>
                  <span className={iconClass} aria-hidden>
                    <Icon size={28} />
                  </span>
                  <strong className={statValueClass} id={`${s.id}-value`}>
                    {s.value}
                  </strong>
                </div>

                <div>
                  <div id={`${s.id}-label`} className={styles.statLabel}>
                    {s.label}
                  </div>
                  <div className={styles.statMeta}>{s.meta}</div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  aria-label={`Abrir detalhes de ${s.label}`}
                >
                  Ver
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.columns}>
        <div className={styles.leftPanel}>
          <div className={styles.panelTop}>
            <div className={styles.panelLeft}>
              <span className={styles.panelIcon} aria-hidden="true"></span>
              <div className={styles.panelText}>
                <h3 className={styles.panelTitle}>PAINEL DE CHAMADAS</h3>
                <p className={styles.panelSubtitle}>SGHSS VidaPlus</p>
              </div>
            </div>

            <div className={styles.panelRight}>
              <button
                type="button"
                className={styles.speakerButton}
                aria-label="Controle de áudio"
              >
                <span aria-hidden>
                  <Volume2 size={18} />
                </span>
              </button>

              <div className={styles.timeBlock}>
                <time
                  className={styles.clockValue}
                  dateTime="14:52"
                  aria-live="polite"
                >
                  14:52
                </time>
                <div className={styles.clockDate}>18 de jan. de 2026</div>
              </div>
            </div>
          </div>

          <div className={styles.monitorBox}>
            <div className={styles.monitorInner}>
              <span className={styles.monitorGlyph} aria-hidden>
                <Monitor size={56} />
              </span>
              <div className={styles.monitorText}>
                Aguardando próxima chamada...
              </div>
              <div className={styles.monitorSubtext}>
                2 pacientes aguardando
              </div>
            </div>
          </div>

          <div className={styles.queueSection}>
            <h4 className={styles.sectionTitle}>
              Próximos Pacientes{" "}
              <span className={styles.badge}>{queue.length} aguardando</span>
            </h4>

            <ul className={styles.queueList}>
              {queue.map((item) => (
                <li key={item.position} className={styles.queueItem}>
                  <span className={styles.position} aria-hidden>
                    {item.position}
                  </span>

                  <div className={styles.queueInfo}>
                    <div className={styles.queueName}>{item.name}</div>
                    <div className={styles.queueMeta}>{item.meta}</div>
                  </div>

                  <div className={styles.queueRight}>
                    <time className={styles.queueTime} dateTime={item.time}>
                      {item.time}
                    </time>
                    <span
                      className={`${styles.statusDot} ${
                        item.isUrgent
                          ? styles.statusUrgent
                          : styles.statusNormal
                      }`}
                      aria-hidden
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className={styles.rightPanel}>
          <div className={styles.actionBar}>
            <div className={styles.primaryActions}>
              <button aria-label="Chamar próximo paciente" type="button">
                <span aria-hidden>
                  <Bell size={16} />
                </span>
                Chamar Próximo
              </button>

              <button aria-label="Adicionar paciente" type="button">
                <span aria-hidden>
                  <UserPlus size={16} />
                </span>
                Adicionar
              </button>
            </div>
          </div>

          <div className={styles.filtersCard}>
            <div className={styles.filtersHeader}>
              <span className={styles.filtersIcon} aria-hidden>
                <Filter size={18} />
              </span>
              <h4 className={styles.filtersTitle}>Filtros</h4>
            </div>

            <div className={styles.searchRow}>
              <span className={styles.searchIcon} aria-hidden>
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Buscar por nome ou senha..."
                aria-label="Buscar"
              />
            </div>

            <div className={styles.selectRow}>
              <button
                className={styles.selectPill}
                type="button"
                aria-label="Filtrar por status"
              >
                <span>Todos Status</span>
                <span className={styles.selectIcon} aria-hidden>
                  <ChevronDown size={16} />
                </span>
              </button>

              <button
                className={styles.selectPill}
                type="button"
                aria-label="Filtrar por especialidade"
              >
                <span>Todas Especialidades</span>
                <span className={styles.selectIcon} aria-hidden>
                  <ChevronDown size={16} />
                </span>
              </button>

              <button
                className={styles.selectPill}
                type="button"
                aria-label="Filtrar por prioridade"
              >
                <span>Todas Prioridades</span>
                <span className={styles.selectIcon} aria-hidden>
                  <ChevronDown size={16} />
                </span>
              </button>
            </div>
          </div>

          <div className={styles.serviceCard}>
            <h4 className={styles.serviceCardTitle}>Fila de Atendimento</h4>

            <ul className={styles.appointmentList}>
              {queue.map((item) => (
                <li key={item.position} className={styles.appointmentItem}>
                  <div>
                    <div className={styles.appointmentHeader}>
                      <div className={styles.appointmentName}>{item.name}</div>
                      <span
                        className={`${styles.statusTag} ${
                          item.isUrgent
                            ? styles.statusTagUrgent
                            : styles.statusTagNormal
                        }`}
                      >
                        {item.isUrgent ? "Urgente" : "Normal"}
                      </span>
                    </div>

                    <div className={styles.appointmentMeta}>
                      <strong>Senha:</strong> {item.meta.split(" • ")[0]}{" "}
                      &nbsp;•&nbsp; {item.meta.split(" • ")[1]} &nbsp;•&nbsp;{" "}
                      {item.time}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className={styles.callButton}
                      aria-label={`Chamar ${item.name}`}
                    >
                      <Phone size={14} /> Chamar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

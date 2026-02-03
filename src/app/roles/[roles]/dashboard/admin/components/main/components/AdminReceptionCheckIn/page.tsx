"use client";

import React, { useMemo, useState } from "react";
import { Calendar, CheckCircle, Clock, Phone, Search } from "lucide-react";
import styles from "./AdminReceptionCheckIn.module.scss";
import type { Appointment } from "./data";
import { APPOINTMENTS, computeStats } from "./data";

/**
 * Componente Recepção & Check-in — estrutura base com busca e lista de agendamentos.
 */
export default function AdminReceptionCheckIn() {
  const [query, setQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter((a) =>
      `${a.name} ${a.cpf} ${a.phone}`.toLowerCase().includes(q),
    );
  }, [appointments, query]);

  const stats = useMemo(() => computeStats(appointments), [appointments]);

  function handleCheckIn(id: string) {
    setAppointments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "concluido" } : p)),
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Recepção &amp; Check-in</h1>
          <p className={styles.subtitle}>
            Gerenciar chegadas e cadastros de pacientes
          </p>
        </div>
        <div>
          <button
            type="button"
            className={styles.quickAction}
            aria-label="Cadastro rápido"
          >
            + Cadastro Rápido
          </button>
        </div>
      </header>

      <div className={styles.stats}>
        <article className={`${styles.card} ${styles.cardPrimary}`}>
          <div className={styles.cardIcon} aria-hidden>
            <Calendar />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNumber}>{stats.scheduled}</div>
            <div className={styles.cardLabel}>Agendados Hoje</div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardSuccess}`}>
          <div className={styles.cardIcon} aria-hidden>
            <CheckCircle />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNumber}>{stats.arrived}</div>
            <div className={styles.cardLabel}>Pacientes Chegaram</div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardWarning}`}>
          <div className={styles.cardIcon} aria-hidden>
            <Clock />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNumber}>{stats.inService}</div>
            <div className={styles.cardLabel}>Em Atendimento</div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardSuccessAlt}`}>
          <div className={styles.cardIcon} aria-hidden>
            <CheckCircle />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNumber}>{stats.completed}</div>
            <div className={styles.cardLabel}>Atendimentos Concluídos</div>
          </div>
        </article>
      </div>

      <div className={styles.searchWrapper}>
        <label htmlFor="reception-search" className="sr-only">
          Buscar por nome ou CPF
        </label>
        <div className={styles.searchInput}>
          <Search className={styles.searchIcon} />
          <input
            id="reception-search"
            type="search"
            placeholder="Buscar por nome ou CPF..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            aria-label="Buscar por nome ou CPF"
          />
        </div>
      </div>

      <section className={styles.list} aria-labelledby="agendamentos-today">
        <h2 id="agendamentos-today" className={styles.listTitle}>
          Agendamentos de Hoje
        </h2>

        <ul className={styles.items}>
          {filtered.map((a) => (
            <li key={a.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.avatar} aria-hidden>
                  {a.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.nameRow}>
                    <div className={styles.name}>{a.name}</div>
                    <span className={styles.badge}>Agendado</span>
                  </div>

                  <div className={styles.meta}>
                    <time className={styles.metaItem} dateTime={a.time}>
                      <Clock className={styles.metaIcon} /> {a.time}
                    </time>
                    <div className={styles.metaItem}>• {a.cpf}</div>
                    <div className={styles.metaItem}>
                      <Phone className={styles.metaIcon} /> {a.phone}
                    </div>
                  </div>

                  <div className={styles.clinic}>
                    {a.specialty} • {a.doctor} • Unimed
                  </div>
                </div>
              </div>

              <div className={styles.itemRight}>
                <button
                  type="button"
                  className={`${styles.actionButton} ${a.status === "concluido" ? styles.actionButtonDone : ""}`}
                  onClick={() => handleCheckIn(a.id)}
                  disabled={a.status === "concluido"}
                  aria-pressed={a.status === "concluido"}
                >
                  {a.status === "concluido" ? "Concluído" : "Fazer Check-in"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

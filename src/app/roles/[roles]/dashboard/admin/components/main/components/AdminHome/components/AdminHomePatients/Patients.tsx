"use client";

import React, { useMemo, useState } from "react";
import styles from "./Patients.module.scss";
import type { Patient } from "./data";
import { PATIENTS } from "./data";
import { Search, Plus, Filter, MoreVertical } from "lucide-react";

/**
 * Gestão de Pacientes — componente básico
 * - Busca por nome ou prontuário
 * - Botão "Novo Paciente"
 * - Tabela com colunas: Paciente, Prontuário, Idade, Última Visita, Ações
 */
export default function Patients() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PATIENTS;
    return PATIENTS.filter((p) =>
      `${p.name} ${p.recordNumber}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className={styles.root} aria-labelledby="patients-title">
      <div className={styles.headerRow}>
        <h2 id="patients-title" className={styles.title}>
          Gestão de Pacientes
        </h2>
        <button
          className={styles.addButton}
          type="button"
          aria-label="Novo paciente"
        >
          <Plus size={16} />
          <span>Novo Paciente</span>
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <label htmlFor="patients-search" className="sr-only">
              Buscar por nome ou prontuário
            </label>
            <input
              id="patients-search"
              type="search"
              className={styles.searchInput}
              placeholder="Buscar por nome ou prontuário..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.toolbarActions}>
            <button
              className={styles.filterButton}
              type="button"
              aria-label="Filtrar pacientes"
            >
              <Filter size={16} />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        <div
          className={styles.tableContainer}
          role="region"
          aria-label="Tabela de Pacientes"
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Paciente</th>
                <th scope="col">Prontuário</th>
                <th scope="col">Idade</th>
                <th scope="col">Última Visita</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    Nenhum paciente encontrado
                  </td>
                </tr>
              ) : (
                filtered.map((p: Patient) => (
                  <tr key={p.id} className={styles.row}>
                    <td className={styles.patientCell}>
                      <div className={styles.nameWrap}>
                        <div className={styles.avatar} aria-hidden>
                          {initials(p.name)}
                        </div>
                        <div>
                          <div className={styles.name}>{p.name}</div>
                          <div className={styles.muted}>{p.phone ?? ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.record}>{p.recordNumber}</td>
                    <td className={styles.age}>{p.age}</td>
                    <td className={styles.lastVisit}>{p.lastVisit}</td>
                    <td>
                      <button
                        className={styles.iconButton}
                        aria-label={`Ações para ${p.name}`}
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

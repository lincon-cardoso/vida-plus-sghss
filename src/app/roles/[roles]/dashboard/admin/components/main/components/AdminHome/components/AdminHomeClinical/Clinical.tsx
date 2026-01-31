"use client";

import { useMemo, useState } from "react";
import styles from "./Clinical.module.scss";
import type { Doctor } from "./data";
import { CLINICAL_DOCTORS } from "./data";
import { Search, Filter, Plus, MoreVertical } from "lucide-react";

/**
 * Componente de gestão do corpo clínico (visão em tabela).
 * - Inclui busca por nome/CRM/especialidade
 * - Botão "Novo Profissional"
 * - Filtro simples (placeholder)
 *
 * @returns JSX.Element
 */
export default function Clinical() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLINICAL_DOCTORS;
    return CLINICAL_DOCTORS.filter((d) =>
      `${d.name} ${d.specialty} ${d.crm ?? ""}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className={styles.root} aria-labelledby="clinical-title">
      <div className={styles.headerRow}>
        <h2 id="clinical-title" className={styles.title}>
          Gestão do Corpo Clínico
        </h2>
        <button
          className={styles.addButton}
          type="button"
          aria-label="Novo profissional"
        >
          <Plus size={16} />
          <span>Novo Profissional</span>
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <label htmlFor="clinical-search" className="sr-only">
              Buscar por nome, CRM ou especialidade
            </label>
            <input
              id="clinical-search"
              type="search"
              className={styles.searchInput}
              placeholder="Buscar por nome, CRM ou especialidade..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.toolbarActions}>
            <button
              className={styles.filterButton}
              type="button"
              aria-label="Filtrar"
            >
              <Filter size={16} />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        <div
          className={styles.tableContainer}
          role="region"
          aria-label="Tabela Corpo Clínico"
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Profissional</th>
                <th scope="col">Especialidade/Cargo</th>
                <th scope="col">Status Atual</th>
                <th scope="col">Pacientes na Fila</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                filtered.map((d: Doctor) => (
                  <tr key={d.id} className={styles.row}>
                    <td className={styles.professional}>
                      <div className={styles.nameWrap}>
                        <div className={styles.avatar} aria-hidden>
                          {d.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className={styles.name}>{d.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.specialty}>{d.specialty}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          styles[
                            `badge${capitalize(d.statusVariant ?? "Info")}`
                          ]
                        }`}
                      >
                        {d.statusLabel ??
                          (d.status === "active" ? "Ativo" : "Inativo")}
                      </span>
                    </td>
                    <td className={styles.patients}>{d.patients ?? 0}</td>
                    <td>
                      <button
                        className={styles.iconButton}
                        aria-label={`Ações para ${d.name}`}
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

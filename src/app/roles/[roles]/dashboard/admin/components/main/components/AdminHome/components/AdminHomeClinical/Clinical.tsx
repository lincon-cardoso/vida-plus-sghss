"use client";

import styles from "./Clinical.module.scss";
import type { Doctor } from "./data";
import { CLINICAL_DOCTORS } from "./data";
import { useState } from "react";

export default function Clinical() {
  const [query, setQuery] = useState("");

  const filtered = CLINICAL_DOCTORS.filter((d) =>
    `${d.name} ${d.specialty}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Corpo Clínico</h2>
        <div className={styles.search}>
          <label htmlFor="clinical-search" className="sr-only">
            Buscar profissionais
          </label>
          <input
            id="clinical-search"
            type="search"
            placeholder="Buscar por nome ou especialidade"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((doc: Doctor) => (
          <article
            key={doc.id}
            className={styles.card}
            aria-labelledby={`doc-${doc.id}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.avatar} aria-hidden>
                {doc.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div id={`doc-${doc.id}`} className={styles.name}>
                  {doc.name}
                </div>
                <div className={styles.specialty}>{doc.specialty}</div>
              </div>
            </div>

            <div className={styles.meta}>
              <div>{doc.shift ?? "-"}</div>
              <div aria-hidden>•</div>
              <div
                className={
                  doc.status === "active"
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {doc.status === "active" ? "Ativo" : "Inativo"}
              </div>
              <div aria-hidden>•</div>
              <div>{doc.lastActive}</div>
            </div>

            <div className={styles.actions}>
              <button type="button">Editar</button>
              <button type="button">Remover</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

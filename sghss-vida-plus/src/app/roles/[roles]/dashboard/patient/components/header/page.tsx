"use client";
import type { TokenPayload } from "@/lib/auth";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import styles from "@/app/roles/[roles]/dashboard/patient/components/header/styles/PatientHeader.module.scss";

export default function BarraNavegacao({
  payload,
}: {
  payload?: TokenPayload;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.menuToggle} aria-label="Menu lateral">
          <button className={styles.menuButton}>
            <Menu />
          </button>
          <div className={styles.brand}>
            <div className={styles.iconWrapper} aria-hidden="true">
              <svg
                className={styles.brandIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className={styles.text}>
              <h1 className={styles.title} id="vida-plus-title">
                VidaPlus
              </h1>
              <p className={styles.subtitle}>Cuidando de você com excelência</p>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.searchBox} role="search" aria-label="Buscar">
            <span className={styles.searchIcon} aria-hidden="true">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Buscar pacientes, médicos, prontuários..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        <div className={styles.actions}>Sino e informacoes do usuario</div>
      </div>
    </header>
  );
}

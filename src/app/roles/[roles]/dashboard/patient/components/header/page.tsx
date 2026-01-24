"use client";
import type { TokenPayload } from "@/lib/auth";
import { useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { usePatientMenuStore } from "@/lib/stores";
import styles from "@/app/roles/[roles]/dashboard/patient/components/header/styles/PatientHeader.module.scss";

export default function BarraNavegacao({
  payload,
}: {
  payload?: TokenPayload;
}) {
  const toggleMenu = usePatientMenuStore((s) => s.toggleMenu);
  const isMenuOpen = usePatientMenuStore((s) => s.isMenuOpen);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.menuToggle} aria-label="Menu lateral">
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="patient-menu"
            aria-label="Abrir/fechar menu"
          >
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
        <div className={styles.actions}>
          <button aria-label="Notificações" className={styles.bellButton}>
            <Bell />
          </button>
          <main className={styles.profile} aria-label="Perfil do usuário">
            <div className={styles.profileText}>
              <div className={styles.profileName}>{payload?.role}</div>
              <div className={styles.profileRole}>Paciente</div>
            </div>
            <div className={styles.avatar} aria-hidden="true">
              <span className={styles.avatarInitial}>P</span>
            </div>
          </main>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMedicMenuStore } from "@/lib/stores";
import MedicQuickActionsNav from "./components/MedicQuickActionsNav";
import MedicHome from "./components/MedicHome";
import { useMedicActiveItem, type MedicMenuItem } from "./useMedicActiveItem";
import styles from "./styles/MedicMenu.module.scss";

/**
 * Componente principal do dashboard do médico.
 * Gerencia a navegação e exibição do conteúdo ativo.
 */
export default function MedicDashboardMain() {
  const router = useRouter();
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);
  const closeMenu = useMedicMenuStore((s) => s.closeMenu);

  const menuRef = useRef<HTMLElement | null>(null);
  const [activeItem, setActiveItem] = useMedicActiveItem();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    if (isMenuOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (isMenuOpen) setTimeout(() => menuRef.current?.focus(), 0);
  }, [isMenuOpen]);

  function handleActionClick(action: { itemKey: string; label: string }) {
    if (action.itemKey === "nav_logout" || action.label === "Sair") {
      router.push("/login");
      return;
    }

    // Mapeia itemKey para activeItem
    const itemMap: Record<string, MedicMenuItem> = {
      nav_home: "Home",
      nav_monitor: "Monitor",
      nav_stetho: "Atendimento",
      nav_video: "Teleconsulta",
      nav_calendar: "Agenda",
      nav_settings: "Configurações",
    };

    const newActiveItem = itemMap[action.itemKey] || "Home";
    setActiveItem(newActiveItem);
  }

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <MedicQuickActionsNav
          menuRef={menuRef}
          activeLabel={activeItem}
          onActionClick={handleActionClick}
          isExpanded={isMenuOpen}
        />

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Home" && <MedicHome />}

          {activeItem === "Monitor" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Monitor de Pacientes</h2>
              <p className={styles.description}>
                Conteúdo do monitor de pacientes será exibido aqui.
              </p>
            </div>
          )}

          {activeItem === "Atendimento" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Atendimento</h2>
              <p className={styles.description}>
                Área para atendimento aos pacientes.
              </p>
            </div>
          )}

          {activeItem === "Teleconsulta" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Teleconsulta</h2>
              <p className={styles.description}>
                Consultas remotas e telemedicina.
              </p>
            </div>
          )}

          {activeItem === "Agenda" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Agenda</h2>
              <p className={styles.description}>
                Gerencie seus horários e consultas.
              </p>
            </div>
          )}

          {activeItem === "Configurações" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Configurações</h2>
              <p className={styles.description}>
                Ajustes de conta e preferências.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

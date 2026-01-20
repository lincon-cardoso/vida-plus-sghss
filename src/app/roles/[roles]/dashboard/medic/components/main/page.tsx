"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMedicMenuStore } from "@/lib/stores";
import MedicQuickActionsNav from "./components/MedicQuickActionsNav";
import MedicHome from "./components/MedicHome";
import MedicMonitor from "./components/MedicMonitor";
import MedicInService from "@/components/MedicInService";
import MedicMyPatients from "@/components/MedicMyPatients";
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

  const [activeSubItem, setActiveSubItem] = useState<string | undefined>(
    undefined,
  );

  function handleActionClick(action: {
    itemKey: string;
    label: string;
    subKey?: string;
  }) {
    if (action.itemKey === "nav_logout" || action.label === "Sair") {
      router.push("/login");
      return;
    }

    // Se for um subitem (ex.: Em Atendimento)
    if (action.subKey) {
      setActiveItem("Atendimento");
      setActiveSubItem(action.label);
      return;
    }

    // Item pai do Atendimento: ativa a seção e garante um subitem padrão
    if (action.itemKey === "nav_stetho") {
      setActiveItem("Atendimento");
      setActiveSubItem((prev) => prev ?? "Em Atendimento");
      return;
    }

    // Mapeia itemKey para activeItem (nav_stetho não mapeado como página — abre subitems apenas)
    const itemMap: Record<string, MedicMenuItem> = {
      nav_home: "Home",
      nav_monitor: "Monitor",
      nav_video: "Teleconsulta",
      nav_calendar: "Agenda",
      nav_settings: "Configurações",
    };

    // reset subitem when navigating to a main item
    setActiveSubItem(undefined);

    const newActiveItem = itemMap[action.itemKey] || "Home";
    setActiveItem(newActiveItem);
  }

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <MedicQuickActionsNav
          key={isMenuOpen ? "medic-menu-expanded" : "medic-menu-collapsed"}
          menuRef={menuRef}
          activeLabel={activeItem}
          activeSubLabel={activeSubItem}
          onActionClick={handleActionClick}
          isExpanded={isMenuOpen}
        />

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Home" && <MedicHome />}

          {activeItem === "Monitor" && <MedicMonitor />}

          {activeItem === "Atendimento" && (
            <>
              {activeSubItem === "Em Atendimento" && <MedicInService />}

              {activeSubItem === "Meus Pacientes" && <MedicMyPatients />}
            </>
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

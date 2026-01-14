"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMedicMenuStore } from "@/lib/stores";
import MedicQuickActionsNav from "./components/MedicQuickActionsNav";
import { useMedicActiveItem } from "./useMedicActiveItem";
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
    // atualmente só temos a view principal; manter compatibilidade
    setActiveItem("Home");
    closeMenu();
  }

  return (
    <div className={styles.root}>
      {isMenuOpen && (
        <div className={styles.overlay} aria-hidden="true">
          Menu aberto (implementação futura de overlay)
        </div>
      )}

      <div className={styles.layout}>
        <MedicQuickActionsNav
          menuRef={menuRef}
          activeLabel={activeItem}
          onActionClick={handleActionClick}
        />

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Home" && (
            <div className={styles.dashboardContent}>
              <h2 className={styles.title}>Dashboard do Médico</h2>
              <p className={styles.description}>
                Estrutura base criada. Componentes específicos serão
                adicionados.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

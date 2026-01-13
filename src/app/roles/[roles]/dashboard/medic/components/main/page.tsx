"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useMedicMenuStore } from "@/lib/stores";
import styles from "./styles/MedicMenu.module.scss";

type MedicMenuItem = "Meu Dashboard" | "Sair";

export default function MedicDashboardMain() {
  const router = useRouter();
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);
  const closeMenu = useMedicMenuStore((s) => s.closeMenu);

  const menuRef = useRef<HTMLElement | null>(null);

  const [activeItem, setActiveItem] = useState<MedicMenuItem>(() => {
    try {
      const raw = sessionStorage.getItem(
        "vida-plus:medic-dashboard:activeItem"
      );
      if (raw === "Meu Dashboard" || raw === "Sair") return raw;
    } catch {
      // ignore
    }
    return "Meu Dashboard";
  });

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

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "vida-plus:medic-dashboard:activeItem",
        String(activeItem)
      );
    } catch {
      // ignore
    }
  }, [activeItem]);

  function handleMenuClick(item: MedicMenuItem) {
    if (item === "Sair") {
      router.push("/login");
      return;
    }
    setActiveItem(item);
    closeMenu();
  }

  return (
    <div className={styles.root}>
      {isMenuOpen && (
        <div
          className={styles.overlay}
          role="presentation"
          onClick={closeMenu}
        />
      )}

      <div className={styles.layout}>
        <nav
          id="medic-menu"
          ref={menuRef}
          tabIndex={-1}
          className={styles.sidebarIcons}
          aria-label="Menu do médico"
        >
          <ul className={styles.iconList}>
            <li>
              <button
                type="button"
                className={styles.iconButton}
                data-active={activeItem === "Meu Dashboard"}
                onClick={() => handleMenuClick("Meu Dashboard")}
                aria-label="Meu Dashboard"
              >
                <LayoutDashboard className={styles.icon} />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={styles.iconButton}
                data-active={activeItem === "Sair"}
                onClick={() => handleMenuClick("Sair")}
                aria-label="Sair"
              >
                <LogOut className={styles.icon} />
              </button>
            </li>
          </ul>
        </nav>

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Meu Dashboard" && (
            <div>
              <h2 style={{ margin: 0 }}>Dashboard do Médico</h2>
              <p style={{ marginTop: 8, color: "#6b7280" }}>
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

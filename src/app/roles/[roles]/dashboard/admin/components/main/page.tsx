"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMedicMenuStore } from "@/lib/stores";
import styles from "./AdminMain.module.scss";
import AdminQuickActionsNav from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav";
import AdminHome from "./components/AdminHome/AdminHome";
import AdminReceptionCheckIn from "./components/AdminReceptionCheckIn";
import AdminPatients from "./components/AdminPatients";
import AdminAssistencial from "./components/AdminAssistencial";
import {
  ADMIN_ACTIONS,
  ADMIN_DASHBOARD_ACTIVE_LABEL_KEY,
  DEFAULT_ACTIVE_LABEL,
  DEFAULT_ACTIVE_HOME_KEY,
} from "./data";

export default function AdminDashboardMain() {
  const router = useRouter();
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);
  const closeMenu = useMedicMenuStore((s) => s.closeMenu);
  const menuRef = useRef<HTMLElement | null>(null);

  const [activeLabel, setActiveLabel] = useState<string>(() => {
    try {
      const raw = sessionStorage.getItem(ADMIN_DASHBOARD_ACTIVE_LABEL_KEY);
      // valida apenas rótulos válidos presentes em ADMIN_ACTIONS
      if (raw) {
        const validLabels = ADMIN_ACTIONS.map((a) => a.label);
        if (validLabels.includes(raw)) return raw;
      }
    } catch {
      // ignore
    }
    return DEFAULT_ACTIVE_LABEL;
  });

  const [activeSubLabel, setActiveSubLabel] = useState<string | undefined>(
    undefined,
  );

  const [activeHomeKey, setActiveHomeKey] = useState<string>(
    DEFAULT_ACTIVE_HOME_KEY,
  );

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

  // persist selected label across refresh
  useEffect(() => {
    try {
      sessionStorage.setItem(ADMIN_DASHBOARD_ACTIVE_LABEL_KEY, activeLabel);
    } catch {
      // ignore
    }
  }, [activeLabel]);

  function handleActionClick(action: {
    itemKey: string;
    label: string;
    subKey?: string;
    subItems?: { key: string; label: string }[];
  }) {
    if (action.itemKey === "nav_logout" || action.label === "Sair") {
      router.push("/login");
      return;
    }

    // Se um subitem específico foi clicado
    if (action.subKey) {
      const parent = ADMIN_ACTIONS.find((a) => a.itemKey === action.itemKey);
      setActiveLabel(parent?.label ?? action.label);
      setActiveSubLabel(action.label);
      return;
    }

    // Se um item pai com subitems foi clicado, direcionar para o primeiro subitem
    if (action.subItems && action.subItems.length > 0) {
      const parent = ADMIN_ACTIONS.find((a) => a.itemKey === action.itemKey);
      setActiveLabel(parent?.label ?? action.label);
      setActiveSubLabel(action.subItems[0].label);
      return;
    }

    setActiveSubLabel(undefined);
    setActiveLabel(action.label);
  }

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <AdminQuickActionsNav
          menuRef={menuRef}
          key={isMenuOpen ? "admin-menu-expanded" : "admin-menu-collapsed"}
          isExpanded={isMenuOpen}
          onActionClick={handleActionClick}
          actions={ADMIN_ACTIONS}
          activeLabel={activeLabel}
          activeSubLabel={activeSubLabel}
        />

        <section
          className={styles.content}
          aria-label="Conteúdo principal do Admin"
        >
          {activeLabel === "Dashboard Executivo" && (
            <AdminHome activeKey={activeHomeKey} onSelect={setActiveHomeKey} />
          )}
          {activeLabel === "Recepção & Check-in" && <AdminReceptionCheckIn />}
          {activeLabel === "Pacientes" && <AdminPatients />}
          {activeLabel === "Assistencial" && (
            <AdminAssistencial activeSubLabel={activeSubLabel} />
          )}
        </section>
      </div>
    </div>
  );
}

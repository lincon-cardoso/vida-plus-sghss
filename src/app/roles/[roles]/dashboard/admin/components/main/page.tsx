"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMedicMenuStore } from "@/lib/stores";
import styles from "./AdminMain.module.scss";
import AdminQuickActionsNav from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav";
import type { AdminAction } from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav";
import { ACTION_ICONS } from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav/data";

const ADMIN_ACTIONS: AdminAction[] = [
  {
    itemKey: "nav_dashboard",
    label: "Dashboard Executivo",
    icon: ACTION_ICONS.nav_dashboard,
  },
  {
    itemKey: "nav_reception",
    label: "Recepção & Check-in",
    icon: ACTION_ICONS.nav_reception,
  },
  {
    itemKey: "nav_patients",
    label: "Pacientes",
    icon: ACTION_ICONS.nav_patients,
  },
  {
    itemKey: "nav_assistance",
    label: "Assistencial",
    icon: ACTION_ICONS.nav_assistance,
    subItems: [
      { key: "atendimentos", label: "Atendimentos" },
      { key: "prontuarios", label: "Prontuários" },
    ],
  },
  {
    itemKey: "nav_management",
    label: "Gestão",
    icon: ACTION_ICONS.nav_management,
    subItems: [
      { key: "relatorios", label: "Relatórios" },
      { key: "cadastros", label: "Cadastros" },
    ],
  },
  {
    itemKey: "nav_quality",
    label: "Qualidade",
    icon: ACTION_ICONS.nav_quality,
  },
  {
    itemKey: "nav_billing",
    label: "Faturamento",
    icon: ACTION_ICONS.nav_billing,
  },
  { itemKey: "nav_system", label: "Sistema", icon: ACTION_ICONS.nav_system },
];

export default function AdminDashboardMain() {
  const router = useRouter();
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);
  const closeMenu = useMedicMenuStore((s) => s.closeMenu);
  const menuRef = useRef<HTMLElement | null>(null);

  const [activeLabel, setActiveLabel] = useState<string>("Início");
  const [activeSubLabel, setActiveSubLabel] = useState<string | undefined>(
    undefined,
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

  function handleActionClick(action: {
    itemKey: string;
    label: string;
    subKey?: string;
  }) {
    if (action.itemKey === "nav_logout" || action.label === "Sair") {
      router.push("/login");
      return;
    }

    if (action.subKey) {
      setActiveLabel("Cadastros");
      setActiveSubLabel(action.label);
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
          <div className={styles.placeholder}>
            <h2>{activeSubLabel ? activeSubLabel : activeLabel}</h2>
            <p>Área administrativa — conteúdo a ser implementado.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

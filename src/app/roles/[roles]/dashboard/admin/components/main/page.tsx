"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMedicMenuStore } from "@/lib/stores";
import styles from "./AdminMain.module.scss";
import AdminQuickActionsNav from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav";
import type { AdminAction } from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav";
import { ACTION_ICONS } from "@/app/roles/[roles]/dashboard/admin/components/main/components/AdminQuickActionsNav/data";
import AdminHome from "./components/AdminHome";

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
      { key: "gestao_leitos", label: "Gestão de Leitos" },
      { key: "triagem", label: "Triagem" },
      { key: "laboratorio", label: "Laboratório" },
      { key: "cuidados_enfermagem", label: "Cuidados de Enfermagem" },
      { key: "banco_sangue", label: "Banco de Sangue" },
      { key: "centro_cirurgico", label: "Centro Cirúrgico" },
      { key: "vacinacao", label: "Vacinação" },
    ],
  },
  {
    itemKey: "nav_management",
    label: "Gestão",
    icon: ACTION_ICONS.nav_management,
    subItems: [
      { key: "profissionais", label: "Profissionais" },
      { key: "agendamentos", label: "Agendamentos" },
      { key: "escalas_plantao", label: "Escalas/Plantões" },
      { key: "estoque_farmacia", label: "Estoque/Farmácia" },
      { key: "gestao_financeira", label: "Gestão Financeira" },
      { key: "relatorios_fluxo", label: "Relatórios de Fluxo" },
      { key: "regras_fluxo", label: "Regras de Fluxo" },
    ],
  },
  {
    itemKey: "nav_quality",
    label: "Qualidade",
    icon: ACTION_ICONS.nav_quality,
    subItems: [
      { key: "indicadores", label: "Indicadores" },
      { key: "satisfacao", label: "Satisfação" },
      { key: "auditoria", label: "Auditoria" },
      { key: "same_arquivo", label: "SAME (Arquivo)" },
    ],
  },
  {
    itemKey: "nav_billing",
    label: "Faturamento",
    icon: ACTION_ICONS.nav_billing,
    subItems: [
      { key: "relatorios_faturamento", label: "Relatórios" },
      { key: "tiss_operadoras", label: "TISS (Operadoras)" },
    ],
  },
  { itemKey: "nav_system", label: "Sistema", icon: ACTION_ICONS.nav_system },
];

export default function AdminDashboardMain() {
  const router = useRouter();
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);
  const closeMenu = useMedicMenuStore((s) => s.closeMenu);
  const menuRef = useRef<HTMLElement | null>(null);

  const [activeLabel, setActiveLabel] = useState<string>(() => {
    try {
      const raw = sessionStorage.getItem(
        "vida-plus:admin-dashboard:activeLabel",
      );
      // valida apenas rótulos válidos presentes em ADMIN_ACTIONS
      if (raw) {
        const validLabels = ADMIN_ACTIONS.map((a) => a.label);
        if (validLabels.includes(raw)) return raw;
      }
    } catch {
      // ignore
    }
    return ADMIN_ACTIONS[0]?.label ?? "Início";
  });

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

  // persist selected label across refresh
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "vida-plus:admin-dashboard:activeLabel",
        activeLabel,
      );
    } catch {
      // ignore
    }
  }, [activeLabel]);

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
          {activeLabel === "Dashboard Executivo" && <AdminHome />}
        </section>
      </div>
    </div>
  );
}

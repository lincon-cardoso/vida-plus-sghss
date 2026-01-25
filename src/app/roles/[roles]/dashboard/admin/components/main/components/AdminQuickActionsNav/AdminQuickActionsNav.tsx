"use client";

import {
  BarChart2,
  ChevronRight,
  FileText,
  Users,
  Activity,
  Bed,
  TestTube,
  Heart,
  Droplet,
  Scissors,
  Syringe,
  Calendar,
  Clock,
  Box,
  DollarSign,
  Settings,
  TrendingUp,
  Star,
  Shield,
  Folder,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from "react";
import styles from "./AdminQuickActionsNav.module.scss";

import { ACTION_ICONS, DEFAULT_ACTIONS, type AdminAction } from "./data";

export type { AdminAction, AdminActionKey } from "./data";
export type { AdminSubItem } from "./data";

const LOGOUT_ICON = ACTION_ICONS.nav_logout;

type Props = {
  id?: string;
  actions?: AdminAction[]; // optional, component has sensible defaults
  menuRef?: RefObject<HTMLElement | null>;
  activeLabel?: string;
  activeSubLabel?: string;
  onActionClick?: (action: AdminAction & { subKey?: string }) => void;
  isExpanded?: boolean;
};

export default function AdminQuickActionsNav({
  id,
  actions = DEFAULT_ACTIONS,
  menuRef,
  activeLabel,
  onActionClick,
  isExpanded = false,
  activeSubLabel,
}: Props) {
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);

  const openFocusModeRef = useRef<"none" | "first" | "last">("none");

  const parentButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const submenuItemRefs = useRef<
    Record<string, Array<HTMLButtonElement | null>>
  >({});

  const effectiveOpenSubmenuKey = openSubmenuKey;

  useEffect(() => {
    if (effectiveOpenSubmenuKey && isExpanded) {
      const focusMode = openFocusModeRef.current;
      if (focusMode === "none") return;

      const items = submenuItemRefs.current[effectiveOpenSubmenuKey] || [];
      if (items.length > 0) {
        const index = focusMode === "last" ? items.length - 1 : 0;
        openFocusModeRef.current = "none";

        const t = setTimeout(() => items[index]?.focus(), 0);
        return () => clearTimeout(t);
      }
    }
    return undefined;
  }, [effectiveOpenSubmenuKey, isExpanded]);

  function handleSubmenuKeyDown(
    e: ReactKeyboardEvent<HTMLElement>,
    actionKey: string,
  ) {
    const items = submenuItemRefs.current[actionKey] || [];
    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (el: HTMLButtonElement | null) => el === document.activeElement,
    );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = (currentIndex + 1) % items.length;
        items[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = (currentIndex - 1 + items.length) % items.length;
        items[prev]?.focus();
        break;
      }
      case "Home": {
        e.preventDefault();
        items[0]?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      }
      case "Escape": {
        e.preventDefault();
        setOpenSubmenuKey(null);
        parentButtonRefs.current[actionKey]?.focus();
        break;
      }
      default:
        break;
    }
  }

  function handleParentKeyDown(
    e: ReactKeyboardEvent<HTMLButtonElement>,
    action: AdminAction,
    hasSubs: boolean,
  ) {
    if (!hasSubs) return;

    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ": {
        e.preventDefault();
        openFocusModeRef.current = "first";
        setOpenSubmenuKey(action.itemKey);
        onActionClick?.(action);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        openFocusModeRef.current = "last";
        setOpenSubmenuKey(action.itemKey);
        onActionClick?.(action);
        break;
      }
      case "Escape": {
        e.preventDefault();
        setOpenSubmenuKey(null);
        break;
      }
      default:
        break;
    }
  }

  function getSubIcon(key: string) {
    switch (key) {
      case "profissionais":
        return Users;
      case "agendamentos":
        return Calendar;
      case "escalas_plantao":
        return Clock;
      case "estoque_farmacia":
        return Box;
      case "gestao_financeira":
        return DollarSign;
      case "relatorios_fluxo":
        return BarChart2;
      case "regras_fluxo":
        return Settings;
      case "indicadores":
        return TrendingUp;
      case "satisfacao":
        return Star;
      case "auditoria":
        return Shield;
      case "same_arquivo":
        return Folder;
      case "relatorios_faturamento":
        return BarChart2;
      case "tiss_operadoras":
        return DollarSign;
      case "gestao_leitos":
        return Bed;
      case "triagem":
        return Activity;
      case "laboratorio":
        return TestTube;
      case "cuidados_enfermagem":
        return Heart;
      case "banco_sangue":
        return Droplet;
      case "centro_cirurgico":
        return Scissors;
      case "vacinacao":
        return Syringe;
      case "atendimentos":
        return Activity;
      case "prontuarios":
        return FileText;
      case "relatorios":
        return BarChart2;
      case "cadastros":
        return Users;
      default:
        return null;
    }
  }

  return (
    <nav
      id={id ?? "admin-menu"}
      ref={menuRef}
      tabIndex={-1}
      className={`${styles.root} ${isExpanded ? styles.expanded : ""}`}
      aria-label="Navegação do administrador"
    >
      <div className={styles.top}>
        <ul className={styles.iconList}>
          {actions.map((action) => {
            const { label, subItems } = action;
            const Icon = action.icon ?? ACTION_ICONS[action.itemKey];
            const isOpen = effectiveOpenSubmenuKey === action.itemKey;

            const isActive =
              activeLabel === label ||
              (activeSubLabel &&
                !!subItems &&
                subItems.some((s) => s.label === activeSubLabel));

            return (
              <li key={action.itemKey}>
                <button
                  ref={(el: HTMLButtonElement | null) => {
                    parentButtonRefs.current[action.itemKey] = el;
                  }}
                  type="button"
                  className={styles.iconButton}
                  aria-label={label}
                  title={!isExpanded ? label : undefined}
                  aria-haspopup={
                    subItems && subItems.length > 0 ? "menu" : undefined
                  }
                  aria-controls={
                    subItems && subItems.length > 0
                      ? `submenu-${action.itemKey}`
                      : undefined
                  }
                  data-active={isActive ? "true" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onKeyDown={(e) => handleParentKeyDown(e, action, !!subItems)}
                  onClick={() => {
                    if (subItems && subItems.length > 0) {
                      setOpenSubmenuKey((prev) =>
                        prev === action.itemKey ? null : action.itemKey,
                      );
                      onActionClick?.(action);
                      return;
                    }

                    setOpenSubmenuKey(null);
                    onActionClick?.(action);
                  }}
                  aria-expanded={
                    subItems && subItems.length > 0
                      ? isOpen
                        ? "true"
                        : "false"
                      : undefined
                  }
                >
                  <span className={styles.iconWrap} aria-hidden="true">
                    {Icon ? <Icon className={styles.icon} /> : null}
                  </span>
                  {isExpanded ? (
                    <>
                      <span className={styles.label}>{label}</span>
                      {subItems && subItems.length > 0 ? (
                        <span className={styles.chevron} aria-hidden="true">
                          <ChevronRight className={styles.chevronIcon} />
                        </span>
                      ) : null}
                    </>
                  ) : subItems && subItems.length > 0 ? (
                    <span className={styles.chevronCollapsed} aria-hidden>
                      <ChevronRight className={styles.chevronIcon} />
                    </span>
                  ) : null}
                </button>

                {isExpanded && subItems && subItems.length > 0 && (
                  <ul
                    id={`submenu-${action.itemKey}`}
                    className={`${styles.submenu} ${isOpen ? styles.open : ""}`}
                    role="menu"
                    aria-label={`${label} submenu`}
                    aria-hidden={!isOpen}
                    onKeyDown={(e) => handleSubmenuKeyDown(e, action.itemKey)}
                  >
                    {subItems.map((s, idx) => {
                      const SubIcon = getSubIcon(s.key);
                      return (
                        <li key={s.key}>
                          <button
                            ref={(el: HTMLButtonElement | null) => {
                              submenuItemRefs.current[action.itemKey] =
                                submenuItemRefs.current[action.itemKey] || [];
                              submenuItemRefs.current[action.itemKey][idx] = el;
                            }}
                            type="button"
                            className={styles.submenuItem}
                            role="menuitem"
                            tabIndex={isOpen ? 0 : -1}
                            aria-label={s.label}
                            title={!isExpanded ? s.label : undefined}
                            data-active={
                              activeSubLabel === s.label ? "true" : undefined
                            }
                            onClick={() =>
                              onActionClick?.({
                                itemKey: action.itemKey,
                                label: s.label,
                                subKey: s.key,
                              })
                            }
                          >
                            {SubIcon ? (
                              <span className={styles.submenuIcon} aria-hidden>
                                <SubIcon className={styles.icon} />
                              </span>
                            ) : null}
                            <span className={styles.submenuLabel}>
                              {s.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {!isExpanded && subItems && subItems.length > 0 && isOpen && (
                  <ul
                    id={`submenu-${action.itemKey}`}
                    className={styles.submenuCollapsed}
                    role="menu"
                    aria-label={`${label} submenu`}
                    onKeyDown={(e) => handleSubmenuKeyDown(e, action.itemKey)}
                  >
                    {subItems.map((s) => {
                      const SubIcon = getSubIcon(s.key);

                      return (
                        <li key={s.key}>
                          <button
                            type="button"
                            className={styles.submenuItem}
                            role="menuitem"
                            aria-label={s.label}
                            title={s.label}
                            data-active={
                              activeSubLabel === s.label ? "true" : undefined
                            }
                            onClick={() => {
                              onActionClick?.({
                                itemKey: action.itemKey,
                                label: s.label,
                                subKey: s.key,
                              });
                              setOpenSubmenuKey(null);
                            }}
                          >
                            {SubIcon ? (
                              <span className={styles.submenuIcon} aria-hidden>
                                <SubIcon className={styles.icon} />
                              </span>
                            ) : null}
                            <span className={styles.submenuLabel}>
                              {s.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.separator} aria-hidden />

      <div className={styles.bottom}>
        <ul className={styles.iconList}>
          <li>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.logout}`}
              aria-label="Sair"
              title={!isExpanded ? "Sair" : undefined}
              onClick={() =>
                onActionClick?.({ itemKey: "nav_logout", label: "Sair" })
              }
            >
              <LOGOUT_ICON className={styles.icon} />
              {isExpanded && <span className={styles.label}>Sair</span>}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

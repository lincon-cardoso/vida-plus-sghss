"use client";

import { Activity, Users, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from "react";
import styles from "./MedicQuickActionsNav.module.scss";

import { ACTION_ICONS, DEFAULT_ACTIONS, type MedicAction } from "./data";

export type { MedicAction, MedicActionKey } from "./data";
export type { MedicSubItem } from "./data";

const LOGOUT_ICON = ACTION_ICONS.nav_logout;

type Props = {
  id?: string;
  actions?: MedicAction[]; // optional, component has sensible defaults
  menuRef?: RefObject<HTMLElement | null>;
  activeLabel?: string;
  activeSubLabel?: string;
  onActionClick?: (action: MedicAction & { subKey?: string }) => void;
  isExpanded?: boolean;
};

export default function MedicQuickActionsNav({
  id,
  actions = DEFAULT_ACTIONS,
  menuRef,
  activeLabel,
  onActionClick,
  isExpanded = false,
  activeSubLabel,
}: Props) {
  // Submenu abre apenas por interação do usuário (clique/teclado).
  // Evita comportamento automático ao expandir o menu (mostrar nomes).
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);

  const openFocusModeRef = useRef<"none" | "first" | "last">("none");

  // refs for buttons and submenu items for keyboard navigation
  const parentButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const submenuItemRefs = useRef<
    Record<string, Array<HTMLButtonElement | null>>
  >({});

  // No modo recolhido, permitimos abrir um flyout de subitens (ícone-only).
  const effectiveOpenSubmenuKey = openSubmenuKey;

  // When a submenu opens via keyboard, move focus to the first/last item
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
    action: MedicAction,
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

  return (
    <nav
      id={id ?? "medic-menu"}
      ref={menuRef}
      tabIndex={-1}
      className={`${styles.root} ${isExpanded ? styles.expanded : ""}`}
      aria-label="Navegação do médico"
    >
      <div className={styles.top}>
        <ul className={styles.iconList}>
          {actions.map((action) => {
            const { label, subItems } = action;
            const Icon = action.icon ?? ACTION_ICONS[action.itemKey];
            const isOpen = effectiveOpenSubmenuKey === action.itemKey;

            // mark parent as active if top-level label matches OR any of its subitems is active
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
                  <span className={styles.iconWrap} aria-hidden>
                    {Icon ? <Icon className={styles.icon} /> : null}
                  </span>
                  {isExpanded ? (
                    <>
                      <span className={styles.label}>{label}</span>
                      {subItems && subItems.length > 0 ? (
                        <span className={styles.chevron} aria-hidden>
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
                      // small helper to pick an icon for known subitems
                      function getSubIcon(key: string) {
                        switch (key) {
                          case "in_service":
                            return Activity;
                          case "my_patients":
                            return Users;
                          default:
                            return null;
                        }
                      }

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
                      function getSubIcon(key: string) {
                        switch (key) {
                          case "in_service":
                            return Activity;
                          case "my_patients":
                            return Users;
                          default:
                            return null;
                        }
                      }

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

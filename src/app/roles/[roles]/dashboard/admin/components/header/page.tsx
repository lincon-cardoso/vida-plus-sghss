"use client";

import type { TokenPayload } from "@/lib/auth";
import { Menu } from "lucide-react";
import { useMedicMenuStore } from "@/lib/stores";
import styles from "./AdminHeader.module.scss";

/**
 * Header simples para o Administrador.
 * Mantém padrão visual do Médico, porém reduzido (sem busca/notificações).
 */
export default function BarraNavegacaoAdmin({
  payload,
}: {
  payload?: TokenPayload;
}) {
  const toggleMenu = useMedicMenuStore((s) => s.toggleMenu);
  const isMenuOpen = useMedicMenuStore((s) => s.isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.menuToggle}>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="admin-menu"
            aria-label="Abrir/fechar menu"
          >
            <Menu />
          </button>

          <div className={styles.brand}>
            <div className={styles.iconWrapper} aria-hidden="true">
              <span className={styles.brandIcon}>A</span>
            </div>
            <div className={styles.text}>
              <h1 className={styles.title}>VidaPlus</h1>
              <p className={styles.subtitle}>Painel do Administrador</p>
            </div>
          </div>
        </div>

        <div className={styles.profile} aria-label="Perfil do usuário">
          <div className={styles.profileText}>
            <div className={styles.profileName}>{payload?.email}</div>
            <div className={styles.profileRole}>Administrador</div>
          </div>
          <div className={styles.avatar} aria-hidden="true">
            <span className={styles.avatarInitial}>A</span>
          </div>
        </div>
      </div>
    </header>
  );
}

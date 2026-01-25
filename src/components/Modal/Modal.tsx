"use client";
/**
 * Modal — Componente reutilizável (Client Component)
 * - Acessível: `role="dialog"`, `aria-modal`, foco no close button, fecha com ESC e clique no overlay
 * - Sem dependências externas (focus trap simples implementado)
 * - Comentários em PT-BR conforme as regras do repositório
 */
import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActive = document.activeElement as HTMLElement | null;

    // Focar no botão de fechar por padrão
    closeBtnRef.current?.focus();

    // Gerenciamento simples do trap de foco (wrap)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(Boolean);

        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // bloquear scroll de fundo

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousActive?.focus(); // restaurar foco
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onMouseDown={(e) => {
        // Fecha quando clicar no overlay (mas não quando clicar dentro do diálogo)
        if (e.target === overlayRef.current) onClose();
      }}
      role="presentation"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        ref={dialogRef}
      >
        <header className={styles.header}>
          {title && (
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
          )}

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.close}
            aria-label="Fechar diálogo"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { configItems as items } from "./data";

import Perfil from "./components/perfil/Perfil";
import Notificacoes from "./components/notificacoes/Notificacoes";
import Seguranca from "./components/seguranca/seguranca";
import Idioma from "./components/idioma/Idioma";
import Aparencia from "./components/aparencia/aparencia";

import styles from "./styles/Configuracoes.module.scss";

/**
 * Componente de Configurações.
 * Usa `configItems` (arquivo `data.ts`) para construir a navegação lateral.
 */
export default function Configuracoes() {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "perfil");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Configurações</h1>
        <p>Gerencie suas preferências e informações da conta</p>
      </div>
      <div className={styles.content}>
        <div className={`${styles.square} ${styles.navCard}`}>
          <ul className={styles.navList} aria-label="Seções de configurações">
            {items.map(({ id, label, Icon }) => (
              <li key={id} className={styles.navListItem}>
                <button
                  type="button"
                  className={`${styles.navItem} ${
                    activeId === id ? styles.active : ""
                  }`}
                  aria-pressed={activeId === id}
                  onClick={() => setActiveId(id)}
                >
                  <Icon className={styles.navIcon} aria-hidden="true" />
                  <span className={styles.navLabel}>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.square} ${styles.detailCard}`}>
          <div className={styles.detailContent}>
            {/* Conteúdo que muda conforme o item ativo */}
            {activeId === "perfil" && <Perfil />}

            {activeId === "notificacoes" && <Notificacoes />}

            {activeId === "seguranca" && <Seguranca />}

            {activeId === "idioma" && <Idioma />}

            {activeId === "aparencia" && <Aparencia />}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Bell, Globe, Moon, Shield, User } from "lucide-react";
import { useMemo, useState } from "react";

import Perfil from "./components/perfil/Perfil";

import styles from "./styles/Configuracoes.module.scss";

export default function Configuracoes() {
  const items = useMemo(
    () => [
      { id: "perfil", label: "Perfil", Icon: User },
      { id: "notificacoes", label: "Notificações", Icon: Bell },
      { id: "seguranca", label: "Segurança", Icon: Shield },
      { id: "idioma", label: "Idioma e Região", Icon: Globe },
      { id: "aparencia", label: "Aparência", Icon: Moon },
    ],
    []
  );

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
                  className={styles.navItem}
                  data-active={activeId === id}
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

            {activeId === "notificacoes" && (
              <div>
                <h2 className={styles.sectionTitle}>Notificações</h2>
                <p className={styles.sectionBody}>
                  Gerencie alertas por e-mail e notificações do aplicativo.
                </p>
              </div>
            )}

            {activeId === "seguranca" && (
              <div>
                <h2 className={styles.sectionTitle}>Segurança</h2>
                <p className={styles.sectionBody}>
                  Altere senha, configure autenticação em duas etapas e
                  dispositivos confiáveis.
                </p>
              </div>
            )}

            {activeId === "idioma" && (
              <div>
                <h2 className={styles.sectionTitle}>Idioma e Região</h2>
                <p className={styles.sectionBody}>
                  Selecione idioma, fuso horário e preferências regionais.
                </p>
              </div>
            )}

            {activeId === "aparencia" && (
              <div>
                <h2 className={styles.sectionTitle}>Aparência</h2>
                <p className={styles.sectionBody}>
                  Alterar tema, modo claro/escuro e preferências visuais.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

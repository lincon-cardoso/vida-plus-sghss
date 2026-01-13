"use client";

import styles from "./styles/Aparencia.module.scss";
import { Sun, Moon, Check, Save } from "lucide-react";

export default function Aparencia() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aparência</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tema do Sistema</h2>

        <div className={styles.optionGrid}>
          <button
            className={`${styles.optionCard} ${styles.active}`}
            aria-pressed="true"
            type="button"
            aria-label="Selecionar modo claro"
          >
            <div className={styles.optionIcon}>
              <Sun />
            </div>
            <div className={styles.optionContent}>
              <div className={styles.optionTitle}>Modo Claro</div>
              <div className={styles.optionDescription}>
                Interface clara e vibrante
              </div>
              <div className={styles.optionStatus}>
                <Check className={styles.statusIcon} />
                <span>Ativo</span>
              </div>
            </div>
          </button>

          <button
            className={styles.optionCard}
            aria-pressed="false"
            type="button"
            aria-label="Selecionar modo escuro"
          >
            <div className={styles.optionIcon}>
              <Moon />
            </div>
            <div className={styles.optionContent}>
              <div className={styles.optionTitle}>Modo Escuro</div>
              <div className={styles.optionDescription}>
                Reduz o brilho da tela
              </div>
            </div>
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Configurações de Exibição</h2>

        <div className={styles.fontSizeGroup}>
          <button className={styles.fontSizeButton} type="button">
            Pequeno
          </button>
          <button
            className={`${styles.fontSizeButton} ${styles.active}`}
            type="button"
          >
            Médio
          </button>
          <button className={styles.fontSizeButton} type="button">
            Grande
          </button>
        </div>

        <hr className={styles.divider} />

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.toggleLabel}>Modo de Alto Contraste</div>
            <div className={styles.toggleDescription}>
              Aumenta o contraste para melhor visualização
            </div>
          </div>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" aria-label="Modo de Alto Contraste" />
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.toggleLabel}>Animações Reduzidas</div>
            <div className={styles.toggleDescription}>
              Diminui efeitos visuais e transições
            </div>
          </div>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" aria-label="Animações Reduzidas" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Acessibilidade</h2>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.toggleLabel}>Leitor de Tela</div>
            <div className={styles.toggleDescription}>
              Optimiza a interface para leitores de tela
            </div>
          </div>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" aria-label="Leitor de Tela" />
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.toggleLabel}>Navegação por Teclado</div>
            <div className={styles.toggleDescription}>
              Destaca elementos ao navegar com Tab
            </div>
          </div>
          <div className={styles.toggleSwitch}>
            <input
              type="checkbox"
              aria-label="Navegação por Teclado"
              defaultChecked
            />
          </div>
        </div>
      </section>

      <div className={styles.saveRow}>
        <button className={styles.saveButton} type="button">
          <Save className={styles.saveIcon} /> Salvar Preferências
        </button>
      </div>
    </div>
  );
}

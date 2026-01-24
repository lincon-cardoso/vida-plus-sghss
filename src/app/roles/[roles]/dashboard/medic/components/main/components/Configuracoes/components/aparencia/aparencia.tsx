"use client";

import styles from "./styles/aparencia.module.scss";
import { Check, Save } from "lucide-react";
import { useState } from "react";
import { THEME_OPTIONS, FONT_SIZES } from "../../data";

export default function Aparencia() {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState<(typeof FONT_SIZES)[number]>(
    FONT_SIZES[1],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aparência</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tema do Sistema</h2>

        <div className={styles.optionGrid}>
          {THEME_OPTIONS.map((opt) => {
            const active = theme === opt.id;
            const Icon = opt.Icon;
            return (
              <button
                key={opt.id}
                className={`${styles.optionCard} ${active ? styles.active : ""}`}
                aria-pressed={active}
                type="button"
                aria-label={`Selecionar ${opt.title}`}
                onClick={() => setTheme(opt.id)}
              >
                <div className={styles.optionIcon}>
                  <Icon />
                </div>
                <div className={styles.optionContent}>
                  <div className={styles.optionTitle}>{opt.title}</div>
                  <div className={styles.optionDescription}>
                    {opt.description}
                  </div>
                  {active && (
                    <div className={styles.optionStatus}>
                      <Check className={styles.statusIcon} />
                      <span>Ativo</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Configurações de Exibição</h2>

        <div className={styles.fontSizeGroup}>
          {FONT_SIZES.map((fs) => (
            <button
              key={fs}
              className={`${styles.fontSizeButton} ${fontSize === fs ? styles.active : ""}`}
              type="button"
              onClick={() => setFontSize(fs)}
            >
              {fs}
            </button>
          ))}
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

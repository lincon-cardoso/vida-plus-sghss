"use client";

import { useState } from "react";
import styles from "./styles/Notificacoes.module.scss";
import { Save } from "lucide-react";
import { NOTIFICATION_GROUPS, NotificationGroup } from "../../data";

export default function Notificacoes() {
  const [saving, setSaving] = useState(false);

  // state shape: { [itemId]: boolean }
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    NOTIFICATION_GROUPS.forEach((g) =>
      g.items.forEach((it) => (map[it.id] = !!it.defaultValue)),
    );
    return map;
  });

  function toggle(id: string, value: boolean) {
    setPrefs((p) => ({ ...p, [id]: value }));
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  }

  return (
    <section
      className={styles.container}
      aria-label="Preferências de Notificação"
    >
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Preferências de Notificação</h3>
        </div>
      </header>

      {NOTIFICATION_GROUPS.map((group: NotificationGroup) => (
        <div key={group.id} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <group.icon className={styles.icon} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>{group.title}</h4>
              {group.id === "push" && (
                <p className={styles.sectionSubtitle}>
                  Notificações instantâneas no seu dispositivo
                </p>
              )}
            </div>
          </div>

          <ul className={styles.list}>
            {group.items.map((it) => (
              <li key={it.id} className={styles.item}>
                <div className={styles.itemText}>
                  <span className={styles.itemTitle}>{it.title}</span>
                  <small className={styles.itemDescription}>
                    {it.description}
                  </small>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={!!prefs[it.id]}
                    onChange={(e) => toggle(it.id, e.target.checked)}
                    aria-label={it.ariaLabel}
                  />
                  <span aria-hidden className={styles.knob} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className={styles.saveContainer}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={saving}
        >
          <Save className={styles.saveIcon} />
          {saving ? "Salvando..." : "Salvar Preferências"}
        </button>
      </div>
    </section>
  );
}

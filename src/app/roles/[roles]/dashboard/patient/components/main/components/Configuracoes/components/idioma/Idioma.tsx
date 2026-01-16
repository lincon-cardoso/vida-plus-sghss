"use client";

import { Globe, Clock, Save, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import styles from "./styles/Idioma.module.scss";

type Language = {
  code: string;
  label: string;
  sub: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "pt-BR", label: "Português (Brasil)", sub: "Portuguese", flag: "🇧🇷" },
  { code: "en-US", label: "Inglês (EUA)", sub: "English", flag: "🇺🇸" },
  { code: "es-ES", label: "Espanhol", sub: "Español", flag: "🇪🇸" },
  { code: "fr-FR", label: "Francês", sub: "Français", flag: "🇫🇷" },
];

const COUNTRIES = [
  { code: "BR", label: "Brasil" },
  { code: "US", label: "Estados Unidos" },
  { code: "ES", label: "Espanha" },
];

const STATES_BY_COUNTRY: Record<string, string[]> = {
  BR: ["São Paulo", "Rio de Janeiro"],
  US: ["New York", "California"],
  ES: ["Madrid"],
};

const CITIES_BY_STATE: Record<string, string[]> = {
  "São Paulo": ["São Paulo"],
  "Rio de Janeiro": ["Rio de Janeiro"],
  "New York": ["New York"],
  California: ["Los Angeles"],
  Madrid: ["Madrid"],
};

const DATE_FORMATS = [
  { id: "DD/MM/YYYY", label: "DD/MM/AAAA" },
  { id: "MM/DD/YYYY", label: "MM/DD/AAAA" },
  { id: "YYYY-MM-DD", label: "AAAA-MM-DD" },
];

const TIME_FORMATS = [
  { id: "24h", label: "24 horas" },
  { id: "12h", label: "12 horas" },
];

const WEEK_STARTS = [
  { id: "sunday", label: "Domingo" },
  { id: "monday", label: "Segunda-feira" },
];

export default function Idioma() {
  const [language, setLanguage] = useState("pt-BR");
  const [country, setCountry] = useState("BR");
  const [state, setState] = useState<string>(STATES_BY_COUNTRY["BR"][0]);
  const [city, setCity] = useState<string>(CITIES_BY_STATE[state][0]);
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24h");
  const [weekStart, setWeekStart] = useState("monday");
  const [saving, setSaving] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formattedCurrentTime = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timezone,
        hour12: timeFormat === "12h",
      }).format(now);
    } catch {
      return now.toLocaleTimeString();
    }
  }, [now, timezone, language, timeFormat]);

  function formatExampleDate(format: string) {
    const example = new Date(2024, 11, 31); // 31 Dec 2024
    const opts = {
      year: "numeric" as const,
      month: "2-digit" as const,
      day: "2-digit" as const,
    };
    const parts = new Intl.DateTimeFormat("en-CA", opts)
      .formatToParts(example)
      .reduce<Record<string, string>>((acc, p) => {
        if (p.type !== "literal") acc[p.type] = p.value;
        return acc;
      }, {});
    const day = parts.day;
    const month = parts.month;
    const year = parts.year;
    switch (format) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      // TODO: enviar preferências para o backend
      setSaving(false);
    }, 800);
  }

  return (
    <section
      className={styles.container}
      aria-label="Configurações de idioma e região"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Globe className={styles.icon} /> Idioma
        </h2>
        <p className={styles.sectionBody}>Selecione o idioma da interface</p>
      </div>

      <div className={styles.languageGrid} role="listbox" aria-label="Idiomas">
        {LANGUAGES.map((lang) => {
          const selected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={selected}
              className={`${styles.languageCard} ${
                selected ? styles.selected : ""
              }`}
              onClick={() => setLanguage(lang.code)}
            >
              <div className={styles.cardFlag}>{lang.flag}</div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>{lang.label}</div>
                <div className={styles.cardSubtitle}>{lang.sub}</div>
              </div>
              {selected && (
                <div className={styles.cardCheck} aria-hidden>
                  <Check />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <hr className={styles.separator} />

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Região e Localização</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>País</label>
          <select
            className={styles.select}
            value={country}
            onChange={(e) => {
              const c = e.target.value;
              setCountry(c);
              const newState = STATES_BY_COUNTRY[c]?.[0] ?? "";
              setState(newState);
              setCity(CITIES_BY_STATE[newState]?.[0] ?? "");
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Estado / Região</label>
          <select
            className={styles.select}
            value={state}
            onChange={(e) => {
              const s = e.target.value;
              setState(s);
              setCity(CITIES_BY_STATE[s]?.[0] ?? "");
            }}
          >
            {(STATES_BY_COUNTRY[country] || []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Cidade</label>
          <select
            className={styles.select}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {(CITIES_BY_STATE[state] || []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </section>

      <hr className={styles.separator} />

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>
          <Clock className={styles.icon} /> Formato de Data e Hora
        </h3>
        <div className={styles.formRow}>
          <label className={styles.label}>Fuso Horário</label>
          <select
            className={styles.select}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="America/Sao_Paulo">(UTC-03:00) Brasília</option>
            <option value="America/New_York">(UTC-05:00) New York</option>
            <option value="Europe/Madrid">(UTC+01:00) Madrid</option>
          </select>
          <div className={styles.currentTime}>
            Hora atual: {formattedCurrentTime}
          </div>
        </div>

        <div className={styles.subSection}>
          <label className={styles.label}>Formato de Data</label>
          <div className={styles.optionGrid}>
            {DATE_FORMATS.map((df) => (
              <label
                key={df.id}
                className={`${styles.optionCard} ${
                  dateFormat === df.id ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="dateFormat"
                  value={df.id}
                  checked={dateFormat === df.id}
                  onChange={() => setDateFormat(df.id)}
                />
                <div className={styles.optionTitle}>{df.label}</div>
                <div className={styles.optionExample}>
                  {formatExampleDate(df.id)}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.subSection}>
          <label className={styles.label}>Formato de Hora</label>
          <div className={styles.optionGrid}>
            {TIME_FORMATS.map((tf) => (
              <label
                key={tf.id}
                className={`${styles.optionCard} ${
                  timeFormat === tf.id ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="timeFormat"
                  value={tf.id}
                  checked={timeFormat === tf.id}
                  onChange={() => setTimeFormat(tf.id)}
                />
                <div className={styles.optionTitle}>{tf.label}</div>
                <div className={styles.optionExample}>
                  {tf.id === "24h" ? "23:16" : "11:16 PM"}
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.separator} />

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Configurações de Calendário</h3>
        <div className={styles.optionGrid}>
          {WEEK_STARTS.map((w) => (
            <label
              key={w.id}
              className={`${styles.optionCard} ${
                weekStart === w.id ? styles.selected : ""
              }`}
            >
              <input
                type="radio"
                name="weekStart"
                value={w.id}
                checked={weekStart === w.id}
                onChange={() => setWeekStart(w.id)}
              />
              <div className={styles.optionTitle}>{w.label}</div>
            </label>
          ))}
        </div>
      </section>

      <div className={styles.actions}>
        <button
          type="button"
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

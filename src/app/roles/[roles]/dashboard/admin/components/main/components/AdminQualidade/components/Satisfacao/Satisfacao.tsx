"use client";

import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import styles from "./Satisfacao.module.scss";
import { SATISFACTION_FORM, SATISFACTION_STARS } from "./data";

export default function Satisfacao() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      className={styles.root}
      aria-labelledby="qualidade-satisfacao-title"
    >
      <header className={styles.header}>
        <h2 id="qualidade-satisfacao-title" className={styles.title}>
          {SATISFACTION_FORM.title}
        </h2>
        <p className={styles.subtitle}>{SATISFACTION_FORM.subtitle}</p>
      </header>

      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.hero}>
            <ThumbsUp size={64} className={styles.heroIcon} />
            <h3 className={styles.heroTitle}>{SATISFACTION_FORM.heading}</h3>
            <p className={styles.heroText}>{SATISFACTION_FORM.helper}</p>
          </div>

          <p className={styles.prompt}>{SATISFACTION_FORM.prompt}</p>

          <div className={styles.stars}>
            {SATISFACTION_STARS.map((value) => (
              <button
                key={value}
                type="button"
                className={`${styles.starButton} ${rating >= value ? styles.starActive : ""}`}
                aria-label={`Avaliação ${value} de 5`}
                onClick={() => setRating(value)}
              >
                <Star size={44} fill="currentColor" />
              </button>
            ))}
          </div>

          <label className={styles.fieldLabel} htmlFor="satisfaction-comment">
            {SATISFACTION_FORM.label}
          </label>
          <textarea
            id="satisfaction-comment"
            className={styles.textarea}
            placeholder={SATISFACTION_FORM.placeholder}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => setSubmitted(true)}
          >
            <MessageSquare size={18} />
            {SATISFACTION_FORM.submitLabel}
          </button>

          {submitted ? (
            <div className={styles.submitted}>
              Avaliação mock registrada com {rating || 0} estrela(s).
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

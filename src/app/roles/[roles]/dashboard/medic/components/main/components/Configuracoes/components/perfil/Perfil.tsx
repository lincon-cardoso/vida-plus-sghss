"use client";

import { BadgeCheck, Save } from "lucide-react";

import styles from "./styles/Perfil.module.scss";

/**
 * Função auxiliar para obter as iniciais do nome completo.
 */
function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]?.[0] ?? "";
  const last =
    (parts.length > 1 ? parts[parts.length - 1] : parts[0])?.[0] ?? "";
  return (first + last).toUpperCase();
}

/**
 * Componente Perfil para o médico: exibe e permite editar informações básicas e profissionais.
 */
export default function Perfil() {
  const fullName = "Dr. João Pereira";
  const email = "joao.pereira@clinica.com";
  const initials = getInitials(fullName);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Informações do Perfil</h2>

      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          <span className={styles.avatarText}>{initials}</span>
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.name}>{fullName}</div>
          <div className={styles.email}>{email}</div>
          <button type="button" className={styles.changePhoto}>
            Alterar foto
          </button>
        </div>
      </div>

      <div className={styles.divider} role="separator" aria-hidden="true" />

      <form className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_fullName">
              Nome Completo
            </label>
            <input
              id="profile_fullName"
              name="fullName"
              className={styles.input}
              type="text"
              placeholder="Nome completo"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_crm">
              CRM
            </label>
            <input
              id="profile_crm"
              name="crm"
              className={styles.input}
              type="text"
              placeholder="CRM"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_email">
              E-mail
            </label>
            <div className={styles.withSuffix}>
              <input
                id="profile_email"
                name="email"
                className={`${styles.input} ${styles.inputWithSuffix}`}
                type="email"
                placeholder="seuemail@exemplo.com"
              />
              <span className={styles.suffix} aria-hidden="true">
                <BadgeCheck className={styles.suffixIcon} />
              </span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_phone">
              Telefone
            </label>
            <input
              id="profile_phone"
              name="phone"
              className={styles.input}
              type="tel"
              placeholder="(11) 98765-4321"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_specialty">
              Especialidade
            </label>
            <input
              id="profile_specialty"
              name="specialty"
              className={styles.input}
              type="text"
              placeholder="Especialidade"
            />
          </div>

          <div className={`${styles.field} ${styles.fullRow}`}>
            <label className={styles.label} htmlFor="profile_address">
              Endereço do Consultório
            </label>
            <input
              id="profile_address"
              name="address"
              className={styles.input}
              type="text"
              placeholder="Rua, número, bairro, cidade - UF"
            />
          </div>
        </div>
      </form>

      <div className={styles.divider} role="separator" aria-hidden="true" />

      <h2 className={styles.title}>Informações Profissionais</h2>

      <form className={styles.form}>
        <div className={styles.healthGrid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="prof_registration">
              Registro Profissional
            </label>
            <input
              id="prof_registration"
              name="registration"
              className={styles.input}
              type="text"
              placeholder="Ex: CRM 12345"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="prof_biography">
              Biografia
            </label>
            <textarea
              id="prof_biography"
              name="biography"
              className={styles.textarea}
              placeholder="Breve descrição profissional"
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="prof_consult">
              Observações sobre atendimentos
            </label>
            <textarea
              id="prof_consult"
              name="consultNotes"
              className={styles.textarea}
              placeholder="Ex: Atendimento preferencial para..."
              rows={4}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.saveButton}>
            <Save className={styles.saveIcon} />
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

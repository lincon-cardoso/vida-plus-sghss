"use client";

import { BadgeCheck, Calendar, Save } from "lucide-react";

import styles from "./style/Perfil.module.scss";

/**
 * Função auxiliar para obter as iniciais do nome completo.
 * Recebe uma string com o nome e retorna as iniciais em maiúsculo.
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
 * Componente Perfil: Exibe e permite editar as informações do perfil do paciente.
 * Inclui dados pessoais e de saúde.
 */
export default function Perfil() {
  const fullName = "Maria Silva Santos";
  const email = "maria.silva@email.com";
  const initials = getInitials(fullName);

  return (
    <div className={styles.root}>
      {/* Título da seção de informações do perfil */}
      <h2 className={styles.title}>Informações do Perfil</h2>

      {/* Cabeçalho com avatar e informações básicas */}
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

      {/* Divisor visual */}
      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* Formulário para editar informações pessoais */}
      <form className={styles.form}>
        <div className={styles.grid}>
          {/* Campo para nome completo */}
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

          {/* Campo para CPF (desabilitado) */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_cpf">
              CPF
            </label>
            <input
              id="profile_cpf"
              name="cpf"
              className={`${styles.input} ${styles.inputDisabled}`}
              type="text"
              defaultValue="123.456.789-00"
              disabled
            />
          </div>

          {/* Campo para e-mail */}
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

          {/* Campo para telefone */}
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

          {/* Campo para data de nascimento */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_birthDate">
              Data de Nascimento
            </label>
            <div className={styles.withSuffix}>
              <input
                id="profile_birthDate"
                name="birthDate"
                className={`${styles.input} ${styles.inputWithSuffix}`}
                type="text"
                inputMode="numeric"
                placeholder="dd/mm/aaaa"
              />
              <span
                className={`${styles.suffix} ${styles.suffixNeutral}`}
                aria-hidden="true"
              >
                <Calendar className={styles.suffixIcon} />
              </span>
            </div>
          </div>

          {/* Campo para gênero */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="profile_gender">
              Gênero
            </label>
            <select
              id="profile_gender"
              name="gender"
              className={styles.select}
            >
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não informar">Prefiro não informar</option>
            </select>
          </div>

          {/* Campo para endereço completo */}
          <div className={`${styles.field} ${styles.fullRow}`}>
            <label className={styles.label} htmlFor="profile_address">
              Endereço Completo
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

        {/* Botão para salvar alterações pessoais */}
        <div className={styles.actions}>
          <button type="button" className={styles.saveButton}>
            <Save className={styles.saveIcon} />
            Salvar Alterações
          </button>
        </div>
      </form>

      {/* Divisor visual */}
      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* Título da seção de informações de saúde */}
      <h2 className={styles.title}>Informações de Saúde</h2>

      {/* Formulário para editar informações de saúde */}
      <form className={styles.form}>
        <div className={styles.healthGrid}>
          {/* Campo para tipo sanguíneo */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="health_bloodType">
              Tipo Sanguíneo
            </label>
            <select
              id="health_bloodType"
              name="bloodType"
              className={styles.select}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Campo para alergias */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="health_allergies">
              Alergias
            </label>
            <textarea
              id="health_allergies"
              name="allergies"
              className={styles.textarea}
              placeholder="Ex: Penicilina, Dipirona, Látex..."
              rows={4}
            />
          </div>

          {/* Campo para condições crônicas */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="health_chronic">
              Condições Crônicas
            </label>
            <textarea
              id="health_chronic"
              name="chronicConditions"
              className={styles.textarea}
              placeholder="Ex: Hipertensão, Diabetes..."
              rows={4}
            />
          </div>
        </div>

        {/* Botão para salvar informações de saúde */}
        <div className={styles.actions}>
          <button type="button" className={styles.saveButton}>
            <Save className={styles.saveIcon} />
            Salvar Informações
          </button>
        </div>
      </form>
    </div>
  );
}

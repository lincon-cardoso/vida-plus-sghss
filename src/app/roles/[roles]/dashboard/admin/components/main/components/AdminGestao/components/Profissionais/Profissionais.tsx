"use client";

import {
  CalendarDays,
  Filter,
  Mail,
  PenLine,
  Phone,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";
import styles from "./Profissionais.module.scss";
import {
  PROFESSIONALS,
  SPECIALTY_OPTIONS,
  type ProfessionalRecord,
} from "./data";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function SummaryCard({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone?: "default" | "success" | "warning" | "primary";
}) {
  const toneClass =
    tone === "success"
      ? styles.summarySuccess
      : tone === "warning"
        ? styles.summaryWarning
        : tone === "primary"
          ? styles.summaryPrimary
          : "";

  return (
    <article className={styles.summaryCard}>
      <strong className={`${styles.summaryValue} ${toneClass}`}>{value}</strong>
      <span className={styles.summaryLabel}>{label}</span>
    </article>
  );
}

function ProfessionalCard({
  professional,
}: {
  professional: ProfessionalRecord;
}) {
  return (
    <article className={styles.professionalCard}>
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{getInitials(professional.name)}</div>

        <span
          className={`${styles.statusBadge} ${styles[professional.status]}`}
        >
          {professional.statusLabel}
        </span>

        <div className={styles.identityBlock}>
          <h3 className={styles.professionalName}>{professional.name}</h3>
          <p className={styles.professionalCrm}>{professional.crm}</p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoRows}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Especialidade:</span>
            <span className={styles.infoValue}>{professional.specialty}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Pacientes:</span>
            <span className={styles.infoValue}>
              {professional.patientsCount}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Avaliação:</span>
            <span className={styles.ratingValue}>
              <Star size={14} className={styles.ratingIcon} />
              {professional.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className={styles.contactsList}>
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <span>{professional.phone}</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} className={styles.contactIcon} />
            <span>{professional.email}</span>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.primaryButton}>
            <CalendarDays size={16} />
            Agenda
          </button>
          <button type="button" className={styles.secondaryButton}>
            <PenLine size={16} />
            Editar
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Profissionais() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("Todas Especialidades");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProfessionals = PROFESSIONALS.filter((professional) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      `${professional.name} ${professional.crm} ${professional.specialty}`
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesSpecialty =
      specialty === "Todas Especialidades" ||
      professional.specialty === specialty;

    return matchesQuery && matchesSpecialty;
  });

  const totalProfessionals = PROFESSIONALS.length;
  const availableProfessionals = PROFESSIONALS.filter(
    (professional) => professional.status === "available",
  ).length;
  const busyProfessionals = PROFESSIONALS.filter(
    (professional) => professional.status === "busy",
  ).length;
  const totalSpecialties = new Set(
    PROFESSIONALS.map((professional) => professional.specialty),
  ).size;

  return (
    <section
      className={styles.root}
      aria-labelledby="gestao-profissionais-title"
    >
      <header className={styles.header}>
        <div>
          <h2 id="gestao-profissionais-title" className={styles.title}>
            Profissionais de Saúde
          </h2>
          <p className={styles.subtitle}>Gerencie médicos e equipe de saúde</p>
        </div>

        <button type="button" className={styles.addButton}>
          <Plus size={18} />
          Novo Profissional
        </button>
      </header>

      <section
        className={styles.toolbarCard}
        aria-label="Filtros de profissionais"
      >
        <div className={styles.searchWrap}>
          <Search size={22} className={styles.searchIcon} />
          <label htmlFor="professionals-search" className={styles.srOnly}>
            Buscar por nome, CRM ou especialidade
          </label>
          <input
            id="professionals-search"
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nome, CRM ou especialidade..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className={styles.filtersGroup}>
          <label htmlFor="professionals-specialty" className={styles.srOnly}>
            Filtrar por especialidade
          </label>
          <select
            id="professionals-specialty"
            className={styles.selectField}
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            {SPECIALTY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.filterButton}
            aria-label="Filtrar profissionais"
          >
            <Filter size={20} />
          </button>
        </div>
      </section>

      <div className={styles.summaryGrid} aria-label="Resumo de profissionais">
        <SummaryCard
          value={totalProfessionals}
          label="Total de Profissionais"
        />
        <SummaryCard
          value={availableProfessionals}
          label="Disponíveis"
          tone="success"
        />
        <SummaryCard
          value={busyProfessionals}
          label="Em Atendimento"
          tone="warning"
        />
        <SummaryCard
          value={totalSpecialties}
          label="Especialidades"
          tone="primary"
        />
      </div>

      {filteredProfessionals.length > 0 ? (
        <div className={styles.grid}>
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>Nenhum profissional encontrado</h3>
          <p className={styles.emptyText}>
            Ajuste o termo da busca ou selecione outra especialidade para
            continuar.
          </p>
        </div>
      )}
    </section>
  );
}

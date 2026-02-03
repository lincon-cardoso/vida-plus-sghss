/**
 * Componente: AdminPatients
 * Descrição: Lista de pacientes com estatísticas, busca e ações.
 * Observação: Server Component por padrão.
 */

import {
  Search,
  Sparkles,
  Filter,
  Download,
  Plus,
  Pencil,
  FileText,
  Trash2,
} from "lucide-react";
import { PATIENTS } from "./data";
import type { Patient } from "./data";
import styles from "./AdminPatients.module.scss";

interface Props {
  patients?: Patient[];
}

/** Formata CPF de 11 dígitos para 000.000.000-00 */
function formatCPF(raw: string) {
  const onlyDigits = raw.replace(/\D/g, "");
  if (onlyDigits.length !== 11) return raw;
  return `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}.${onlyDigits.slice(6, 9)}-${onlyDigits.slice(9)}`;
}

/** Formata data ISO para dd/mm/aaaa */
function formatDateIso(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return iso;
  }
}

/** Extrai iniciais do nome (máx 1 letra) */
function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export default function AdminPatients({ patients = PATIENTS }: Props) {
  const total = patients.length;
  const activeCount = patients.filter((p) => p.isActive).length;
  const newThisWeek = 3;

  return (
    <section className={styles.container} aria-labelledby="patients-title">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 id="patients-title" className={styles.title}>
            Pacientes
          </h1>
          <p className={styles.subtitle}>
            Gerencie os pacientes cadastrados no sistema
          </p>
        </div>
        <button type="button" className={styles.btnPrimary}>
          <Plus size={18} />
          Novo Paciente
        </button>
      </header>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <label htmlFor="patients-search" className={styles.srOnly}>
            Buscar por nome, CPF ou e-mail
          </label>
          <input
            id="patients-search"
            type="text"
            placeholder="Buscar por nome, CPF ou e-mail..."
            className={styles.searchInput}
          />
          <button
            type="button"
            className={styles.aiButton}
            aria-label="Busca inteligente"
          >
            <Sparkles size={18} />
          </button>
        </div>
        <div className={styles.searchActions}>
          <button type="button" className={styles.btnOutline}>
            <Filter size={16} />
            Filtros
          </button>
          <button type="button" className={styles.btnOutline}>
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{total}</span>
          <span className={styles.statLabel}>Total de Pacientes</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statValue} ${styles.statBlue}`}>
            {activeCount}
          </span>
          <span className={styles.statLabel}>Pacientes Ativos</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{newThisWeek}</span>
          <span className={styles.statLabel}>Novos esta semana</span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} aria-label="Lista de pacientes">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>CPF</th>
              <th>Data Nasc.</th>
              <th>Contato</th>
              <th>Última Visita</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className={styles.patientCell}>
                    <div className={styles.avatar} aria-hidden="true">
                      {getInitial(p.name)}
                    </div>
                    <div className={styles.patientInfo}>
                      <span className={styles.patientName}>{p.name}</span>
                      <span className={styles.patientEmail}>{p.email}</span>
                      <span className={styles.patientEmail}>{p.phone}</span>
                    </div>
                  </div>
                </td>
                <td>{formatCPF(p.cpf)}</td>
                <td>{formatDateIso(p.birthDate)}</td>
                <td>{p.phone}</td>
                <td>{formatDateIso(p.lastVisit)}</td>
                <td>
                  <span
                    className={
                      p.isActive ? styles.statusActive : styles.statusInactive
                    }
                  >
                    {p.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      aria-label={`Editar ${p.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      aria-label={`Ver detalhes de ${p.name}`}
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${styles.actionDelete}`}
                      aria-label={`Excluir ${p.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className={styles.tableFooter}>
          <span className={styles.showingText}>
            Mostrando {patients.length} de {total} pacientes
          </span>
          <nav className={styles.pagination} aria-label="Paginação">
            <button type="button" className={styles.pageBtn}>
              Anterior
            </button>
            <button
              type="button"
              className={`${styles.pageBtn} ${styles.pageBtnActive}`}
              aria-current="page"
            >
              1
            </button>
            <button type="button" className={styles.pageBtn}>
              2
            </button>
            <button type="button" className={styles.pageBtn}>
              3
            </button>
            <button type="button" className={styles.pageBtn}>
              Próximo
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}

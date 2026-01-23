import styles from "./MedicMyPatients.module.scss";
import { type Patient, defaultPatients } from "./data";
import {
  Pencil,
  FileText,
  Trash,
  Search,
  Filter,
  Download,
} from "lucide-react";

interface Props {
  patients?: Patient[];
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * MedicMyPatients
 * Lista de pacientes atribuídos ao médico com ações básicas.
 */
export default function MedicMyPatients({
  patients = defaultPatients,
  className,
}: Props) {
  return (
    <section
      className={`${styles.root} ${className ?? ""}`}
      aria-labelledby="medic-my-patients"
    >
      <div className={styles.topBar}>
        <div className={styles.searchLarge}>
          <Search size={18} />
          <input
            type="search"
            placeholder="Buscar por nome, CPF ou e-mail..."
            aria-label="Buscar pacientes"
          />
        </div>

        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            type="button"
            aria-label="Filtros"
          >
            <Filter size={14} />
            <span>Filtros</span>
          </button>
          <button
            className={styles.controlBtn}
            type="button"
            aria-label="Exportar"
          >
            <Download size={14} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className={styles.statsRow} aria-hidden>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{patients.length}</div>
          <div className={styles.statLabel}>Total de Pacientes</div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.statPositive}`}>
            {patients.filter((x) => x.status === "Ativo").length}
          </div>
          <div className={styles.statLabel}>Pacientes Ativos</div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.statInfo}`}>3</div>
          <div className={styles.statLabel}>Novos esta semana</div>
        </div>
      </div>

      <div className={styles.tableHead} role="row">
        <div aria-hidden className={styles.colAvatar} />
        <div className={styles.colPaciente}>Paciente</div>
        <div>CPF</div>
        <div>Data Nasc.</div>
        <div>Contato</div>
        <div>Última Visita</div>
        <div>Status</div>
        <div className={styles.colActions}>Ações</div>
      </div>

      <ul className={styles.list} role="list">
        {patients.map((p) => (
          <li key={p.id} className={styles.item} role="listitem">
            <div className={styles.avatar} aria-hidden>
              <span className={styles.initials}>{getInitials(p.name)}</span>
            </div>

            <div className={styles.meta}>
              <div className={styles.name}>{p.name}</div>
              {p.email && <div className={styles.email}>{p.email}</div>}
            </div>

            <div className={styles.info}>
              <div className={styles.cell}>{p.cpf ?? "—"}</div>
              <div className={styles.cell}>{p.dob ?? "—"}</div>
              <div className={styles.cell}>{p.phone ?? "—"}</div>
              <div className={styles.cell}>{p.lastVisit ?? "—"}</div>
            </div>

            <div className={styles.status}>
              <span
                className={
                  p.status === "Ativo"
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {p.status ?? "—"}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.iconBtn} ${styles.editBtn}`}
                type="button"
                aria-label={`Editar ${p.name}`}
                title={`Editar ${p.name}`}
              >
                <Pencil size={16} />
              </button>
              <button
                className={`${styles.iconBtn} ${styles.docBtn}`}
                type="button"
                aria-label={`Prontuário de ${p.name}`}
                title={`Abrir prontuário de ${p.name}`}
              >
                <FileText size={16} />
              </button>
              <button
                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                type="button"
                aria-label={`Remover ${p.name}`}
                title={`Remover ${p.name}`}
              >
                <Trash size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footerRow}>
        <div className={styles.footerLeft}>
          Mostrando {patients.length} pacientes
        </div>
        <div className={styles.footerRight} aria-label="Paginação">
          <button className={styles.pageBtn} type="button">
            Anterior
          </button>
          <div className={styles.pageNumbers}>
            <button
              className={`${styles.pageNumber} ${styles.active}`}
              aria-current="page"
            >
              1
            </button>
            <button className={styles.pageNumber} type="button">
              2
            </button>
            <button className={styles.pageNumber} type="button">
              3
            </button>
          </div>
          <button className={styles.pageBtn} type="button">
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
}

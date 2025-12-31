// Componente: Histórico de Agendamentos
// Exibe uma lista de cartões com informações de agendamentos (avatar, nome, especialidade, data/hora e badge de status).

import styles from "./styles/HistoricoAgendamentos.module.scss";
import { CircleUser } from "lucide-react";

/**
 * Tipo que representa um agendamento exibido no histórico.
 * - `id`: identificador único do agendamento (usado como key na lista)
 * - `doctor`: nome do médico/profissional
 * - `specialty`: especialidade (opcional)
 * - `date`: data formatada para exibição
 * - `time`: hora exibida (opcional)
 * - `status`: status do agendamento (usado para label e estilo)
 */
type Appointment = {
  id: string;
  doctor: string;
  specialty?: string;
  date: string; // formatted date string
  time?: string;
  status?: "realizada" | "agendada" | "cancelada";
};

// Dados de exemplo (mock) — substituir por props ou fetch da API quando integrar com backend.
const mockData: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Pedro Lima",
    specialty: "Ortopedia",
    date: "19 de dezembro de 2024",
    time: "11:00",
    status: "realizada",
  },
];

// Mapeamento entre status (raw) e as informações de exibição:
// - `label`: texto a ser mostrado na badge
// - `className`: classe CSS para estilizar a badge conforme o status
const statusMap: Record<string, { label: string; className: string }> = {
  realizada: { label: "Realizada", className: styles.completed },
  agendada: { label: "Agendada", className: styles.scheduled },
  cancelada: { label: "Cancelada", className: styles.canceled },
};

export default function HistoricoAgendamentos() {
  // O componente renderiza uma lista (`ul`) de cartões (`li`).
  // Cada item usa `item.id` como `key` para manter estabilidade na renderização.
  return (
    <div className={styles.historicoContent}>
      <ul className={styles.list}>
        {mockData.map((item) => (
          <li key={item.id} className={styles.card}>
            <div className={styles.cardLeft}>
              {/*
                Avatar/ícone do usuário.
                Usamos `CircleUser` do pacote `lucide-react` para manter consistência visual.
                `aria-hidden` indica que o ícone é decorativo (não leitura por leitores de tela).
              */}
              <CircleUser size={44} className={styles.avatarIcon} aria-hidden />
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <h3 className={styles.name}>{item.doctor}</h3>

                {(() => {
                  // Determina o rótulo e a classe a partir do status do item.
                  // Se `status` estiver ausente, assumimos 'agendada' como padrão.
                  const key = item.status ?? "agendada";
                  const info = statusMap[key] ?? statusMap.agendada;
                  return (
                    <span className={`${styles.badge} ${info.className}`}>
                      {info.label}
                    </span>
                  );
                })()}
              </div>

              {/* Especialidade (texto secundário) */}
              <p className={styles.specialty}>{item.specialty}</p>

              {/*
                Metadados (data e hora). `min-width: 0` no container permite
                truncamento correto do título com `text-overflow: ellipsis`.
              */}
              <div className={styles.meta}>
                <time className={styles.date}>{item.date}</time>
                <span className={styles.time}>{item.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

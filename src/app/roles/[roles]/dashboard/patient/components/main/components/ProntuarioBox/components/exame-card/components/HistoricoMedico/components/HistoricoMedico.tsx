// Importações de ícones da biblioteca Lucide React para uso visual no componente
import { ChevronRight, Download, FileText, Stethoscope } from "lucide-react";
// Importação dos estilos modulares SCSS para este componente
import styles from "./styles/HistoricoMedico.module.scss";

// Este componente renderiza uma linha do tempo do histórico médico do paciente,
// exibindo consultas, exames, medicações e procedimentos em ordem cronológica.
// Ele usa dados mock para demonstração, mas pode receber itens via props.

// Tipo que define os possíveis tipos de entrada na linha do tempo (consulta ou exame)
type TimelineKind = "consulta" | "exame" | "Medicação" | "Procedimento";

// Tipo para anexos na linha do tempo, contendo nome e link do arquivo
type TimelineAttachment = {
  name: string;
  href: string;
};

// Tipo principal para cada entrada na linha do tempo, incluindo ID, tipo, data, título, médico, resumo e anexo opcional
type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  date: string; // ex: "10/11/2024"
  title: string;
  doctor: string;
  summary: string;
  attachment?: TimelineAttachment;
};

// Constante que mapeia os tipos de entrada para rótulos em português
const KIND_LABEL: Record<TimelineKind, string> = {
  consulta: "Consulta",
  exame: "Exame",
  Medicação: "Medicação",
  Procedimento: "Procedimento",
};

// Componente funcional para renderizar um item individual da linha do tempo
function TimelineItem({ entry }: { entry: TimelineEntry }) {
  // Determina o rótulo do badge com base no tipo de entrada
  const badgeLabel = KIND_LABEL[entry.kind];

  return (
    <li className={styles.item}>
      <article
        className={styles.card}
        aria-label={`${badgeLabel} em ${entry.date}`}
      >
        {/* Cabeçalho do cartão com metadados à esquerda e ícone à direita */}
        <header className={styles.cardHeader}>
          <div className={styles.metaLeft}>
            {/* Badge que indica o tipo de entrada, com classe condicional para estilo específico baseado no tipo */}
            <span
              className={`${styles.badge} ${
                entry.kind === "consulta"
                  ? styles.badgeConsulta
                  : entry.kind === "exame"
                    ? styles.badgeExame
                    : entry.kind === "Medicação"
                      ? styles.badgeMedicacao
                      : styles.badgeProcedimento
              }`}
            >
              {badgeLabel}
            </span>

            {/* Separador visual */}
            <span className={styles.dot} aria-hidden="true">
              •
            </span>

            {/* Data da entrada, com atributo dateTime para acessibilidade */}
            <time className={styles.date} dateTime={entry.date}>
              {entry.date}
            </time>
          </div>

          {/* Ícone de seta para indicar expansão ou navegação */}
          <span className={styles.chevron} aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        </header>

        {/* Conteúdo principal do cartão */}
        <div className={styles.content}>
          {/* Título da entrada */}
          <h4 className={styles.title}>{entry.title}</h4>

          {/* Linha com ícone e nome do médico */}
          <div className={styles.doctorRow}>
            <Stethoscope
              className={styles.doctorIcon}
              size={14}
              aria-hidden="true"
            />
            <span className={styles.doctor}>{entry.doctor}</span>
          </div>

          {/* Caixa com resumo da entrada */}
          <div className={styles.summaryBox}>
            <p className={styles.summary}>{entry.summary}</p>
          </div>

          {/* Seção de anexo, renderizada apenas se existir */}
          {entry.attachment ? (
            <div className={styles.attachmentRow}>
              <a className={styles.attachmentLink} href={entry.attachment.href}>
                <FileText size={14} aria-hidden="true" />
                <span>{entry.attachment.name}</span>
              </a>
            </div>
          ) : null}
        </div>
      </article>
    </li>
  );
}

// Componente principal que renderiza a seção de histórico médico com linha do tempo
export default function HistoricoMedico({
  items,
}: {
  items?: TimelineEntry[];
}) {
  // Dados mock para demonstração, usados se nenhum item for passado como prop
  // Em produção, esses dados viriam de uma API ou banco de dados
  const data: TimelineEntry[] = items ?? [
    {
      id: "1",
      kind: "consulta",
      date: "10/11/2024",
      title: "Consulta de Rotina - Cardiologia",
      doctor: "Dr. João Santos Silva",
      summary:
        "Paciente relatou leve cansaço. Pressão 12/8. Solicitado ECG e hemograma.",
    },
    {
      id: "2",
      kind: "exame",
      date: "10/11/2024",
      title: "Eletrocardiograma (ECG)",
      doctor: "Dr. João Santos Silva",
      summary: "Ritmo sinusal regular. Sem alterações isquêmicas.",
      attachment: { name: "laudo_ecg.pdf", href: "#" },
    },
    {
      id: "3",
      kind: "Medicação",
      date: "15/11/2024",
      title: "Prescrição de Medicação - Hipertensão",
      doctor: "Dra. Maria Oliveira",
      summary: "Paciente iniciou uso de losartana 50mg/dia.",
      attachment: { name: "receita_losartana.pdf", href: "#" },
    },
    {
      id: "4",
      kind: "Procedimento",
      date: "20/11/2024",
      title: "Procedimento de Fisioterapia Respiratória",
      doctor: "Fisioterapeuta Carlos Mendes",
      summary:
        "Sessão de fisioterapia para melhora da capacidade pulmonar pós-infecção.",
    },
  ];

  return (
    <section className={styles.historico}>
      {/* Cabeçalho da seção com título e link de exportação */}
      <div className={styles.header}>
        <h3 className={styles.title}>Linha do Tempo</h3>
        <a
          className={styles.exportLink}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: implementar exportação real - aqui seria chamada uma função para gerar e baixar um PDF ou arquivo do histórico
          }}
          aria-label="Exportar Histórico"
        >
          <Download className={styles.icon} size={16} aria-hidden="true" />
          <span>Exportar Histórico</span>
        </a>
      </div>

      {/* Lista não ordenada da linha do tempo, com acessibilidade - mapeia cada entrada para um componente TimelineItem */}
      <ul className={styles.timeline} aria-label="Eventos do histórico médico">
        {data.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </section>
  );
}

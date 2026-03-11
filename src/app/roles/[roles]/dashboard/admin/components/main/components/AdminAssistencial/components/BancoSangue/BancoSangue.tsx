import {
  AlertCircle,
  CircleCheck,
  Droplet,
  type LucideIcon,
} from "lucide-react";
import styles from "./BancoSangue.module.scss";
import {
  BLOOD_BANK_SUMMARY,
  BLOOD_TYPE_STOCK,
  HEMOCOMPONENT_DETAILS,
  TRANSFUSION_REQUESTS,
  type BloodBankSummaryCard,
  type BloodRequestTag,
  type BloodTypeStock,
  type HemocomponentDetail,
} from "./data";

function SummaryCard({ card }: { card: BloodBankSummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.summaryContent}>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

function BloodTypeCard({ item }: { item: BloodTypeStock }) {
  return (
    <article
      className={`${styles.stockCard} ${item.isCritical ? styles.stockCardCritical : ""}`}
    >
      <div className={styles.stockCardHeader}>
        <div className={styles.stockTypeWrap}>
          <Droplet size={16} className={styles.stockTypeIcon} />
          <strong className={styles.stockType}>{item.bloodType}</strong>
        </div>

        {item.isCritical ? (
          <AlertCircle size={16} className={styles.stockAlertIcon} />
        ) : null}
      </div>

      <strong className={styles.stockValue}>{item.availableBags}</strong>
      <span className={styles.stockLabel}>bolsas disponíveis</span>
    </article>
  );
}

function StatusBadge({ detail }: { detail: HemocomponentDetail }) {
  const isOk = detail.status === "ok";

  return (
    <span className={`${styles.statusBadge} ${isOk ? styles.ok : styles.low}`}>
      {isOk ? <CircleCheck size={14} /> : <AlertCircle size={14} />}
      {isOk ? "OK" : "Baixo"}
    </span>
  );
}

function RequestTag({ tag }: { tag: BloodRequestTag }) {
  return (
    <span className={`${styles.requestTag} ${styles[tag.tone]}`}>
      {tag.label}
    </span>
  );
}

export default function BancoSangue() {
  return (
    <section className={styles.root} aria-labelledby="banco-sangue-title">
      <header className={styles.header}>
        <div>
          <h2 id="banco-sangue-title" className={styles.title}>
            Banco de Sangue / Hemoterapia
          </h2>
          <p className={styles.subtitle}>Gestão de estoque e transfusões</p>
        </div>
      </header>

      <div
        className={styles.summaryGrid}
        aria-label="Resumo do banco de sangue"
      >
        {BLOOD_BANK_SUMMARY.map((card) => (
          <SummaryCard key={card.key} card={card} />
        ))}
      </div>

      <section
        className={styles.panel}
        aria-labelledby="estoque-hemocomponentes"
      >
        <div className={styles.panelHeader}>
          <h3 id="estoque-hemocomponentes" className={styles.panelTitle}>
            Estoque de Hemocomponentes
          </h3>
        </div>

        <div className={styles.stockGrid}>
          {BLOOD_TYPE_STOCK.map((item) => (
            <BloodTypeCard key={item.bloodType} item={item} />
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-labelledby="detalhamento-hemocomponente"
      >
        <div className={styles.panelHeader}>
          <h3 id="detalhamento-hemocomponente" className={styles.panelTitle}>
            Detalhamento por Hemocomponente
          </h3>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo Sanguíneo</th>
                <th>Componente</th>
                <th>Estoque</th>
                <th>Mínimo</th>
                <th>Vencendo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {HEMOCOMPONENT_DETAILS.map((detail) => (
                <tr
                  key={detail.id}
                  className={
                    detail.status === "baixo" ? styles.tableRowLow : ""
                  }
                >
                  <td>{detail.bloodType}</td>
                  <td>{detail.component}</td>
                  <td>{detail.stock}</td>
                  <td>{detail.minimum}</td>
                  <td
                    className={
                      detail.expiring > 0 ? styles.expiringCell : undefined
                    }
                  >
                    {detail.expiring}
                  </td>
                  <td>
                    <StatusBadge detail={detail} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={styles.panel}
        aria-labelledby="solicitacoes-transfusao"
      >
        <div className={styles.panelHeader}>
          <h3 id="solicitacoes-transfusao" className={styles.panelTitle}>
            Solicitações de Transfusão
          </h3>
        </div>

        <div className={styles.requestsList}>
          {TRANSFUSION_REQUESTS.map((request) => (
            <article key={request.id} className={styles.requestCard}>
              <div className={styles.requestTopRow}>
                <div className={styles.requestIdentity}>
                  <strong className={styles.requestId}>{request.id}</strong>
                  <div className={styles.requestTags}>
                    {request.tags.map((tag) => (
                      <RequestTag
                        key={`${request.id}-${tag.label}`}
                        tag={tag}
                      />
                    ))}
                  </div>
                </div>

                <button type="button" className={styles.processButton}>
                  Processar
                </button>
              </div>

              <div className={styles.requestGrid}>
                <div className={styles.requestInfo}>
                  <span className={styles.requestLabel}>Paciente</span>
                  <strong className={styles.requestValue}>
                    {request.patient}
                  </strong>
                </div>

                <div className={styles.requestInfo}>
                  <span className={styles.requestLabel}>Tipo Sanguíneo</span>
                  <strong className={styles.requestValueBlood}>
                    <Droplet size={15} className={styles.requestBloodIcon} />
                    {request.bloodType}
                  </strong>
                </div>

                <div className={styles.requestInfo}>
                  <span className={styles.requestLabel}>Componente</span>
                  <strong className={styles.requestValue}>
                    {request.component}
                  </strong>
                </div>

                <div className={styles.requestInfo}>
                  <span className={styles.requestLabel}>Bolsas</span>
                  <strong className={styles.requestValue}>
                    {request.bags}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

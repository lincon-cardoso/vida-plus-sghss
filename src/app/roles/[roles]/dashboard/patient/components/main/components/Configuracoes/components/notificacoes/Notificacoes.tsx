"use client";

import { useState } from "react";
import styles from "./styles/Notificacoes.module.scss";
import { Mail, Smartphone, Phone, Save } from "lucide-react";

export default function Notificacoes() {
  // E-mail
  const [confirmacaoConsultas, setConfirmacaoConsultas] = useState(true);
  const [lembretesConsultas, setLembretesConsultas] = useState(true);
  const [resultadosExames, setResultadosExames] = useState(true);
  const [receitasMedicas, setReceitasMedicas] = useState(true);

  // Push
  const [mensagensMedico, setMensagensMedico] = useState(true);
  const [atualizacoesFila, setAtualizacoesFila] = useState(false);
  const [promocoesNovidades, setPromocoesNovidades] = useState(false);

  // SMS
  const [lembretesUrgentes, setLembretesUrgentes] = useState(true);
  const [alteracoesHorario, setAlteracoesHorario] = useState(true);

  const [saving, setSaving] = useState(false);

  function handleSave() {
    setSaving(true);
    // Simula requisição de salvamento
    setTimeout(() => {
      console.log("Preferências salvas", {
        confirmacaoConsultas,
        lembretesConsultas,
        resultadosExames,
        receitasMedicas,
        mensagensMedico,
        atualizacoesFila,
        promocoesNovidades,
        lembretesUrgentes,
        alteracoesHorario,
      });
      setSaving(false);
      // Pode disparar um toast/feedback aqui
    }, 800);
  }

  return (
    <section
      className={styles.notificacoesContainer}
      aria-label="Preferências de Notificação"
    >
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Mail className={styles.icon} />
        </div>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Preferências de Notificação</h3>
          <p className={styles.subtitle}>
            Gerencie como você recebe alertas sobre consultas e resultados
          </p>
        </div>
      </header>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Mail className={styles.icon} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Notificações por E-mail</h4>
            <p className={styles.sectionSubtitle}>
              Receba notificações por e-mail sobre atualizações importantes
            </p>
          </div>
        </div>

        <ul className={styles.sectionList}>
          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Confirmação de consultas</span>
              <small className={styles.itemDescription}>
                Receba e-mail quando sua consulta for confirmada
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={confirmacaoConsultas}
                onChange={(e) => setConfirmacaoConsultas(e.target.checked)}
                aria-label="Ativar confirmações de consultas por e-mail"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Lembretes de consultas</span>
              <small className={styles.itemDescription}>
                Receba lembretes 24 horas antes de cada consulta
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={lembretesConsultas}
                onChange={(e) => setLembretesConsultas(e.target.checked)}
                aria-label="Ativar lembretes de consultas por e-mail"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Resultados de exames</span>
              <small className={styles.itemDescription}>
                Notificação quando novos resultados estiverem disponíveis
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={resultadosExames}
                onChange={(e) => setResultadosExames(e.target.checked)}
                aria-label="Ativar notificações de resultados de exames por e-mail"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Receitas médicas</span>
              <small className={styles.itemDescription}>
                Aviso quando uma nova prescrição for emitida
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={receitasMedicas}
                onChange={(e) => setReceitasMedicas(e.target.checked)}
                aria-label="Ativar notificações de receitas médicas por e-mail"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Smartphone className={styles.icon} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Notificações Push</h4>
            <p className={styles.sectionSubtitle}>
              Notificações instantâneas no seu dispositivo
            </p>
          </div>
        </div>

        <ul className={styles.sectionList}>
          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Mensagens do médico</span>
              <small className={styles.itemDescription}>
                Notificações instantâneas de mensagens da equipe médica
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={mensagensMedico}
                onChange={(e) => setMensagensMedico(e.target.checked)}
                aria-label="Ativar mensagens do médico por push"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Atualizações de fila</span>
              <small className={styles.itemDescription}>
                Atualizações sobre sua posição na fila de atendimento
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={atualizacoesFila}
                onChange={(e) => setAtualizacoesFila(e.target.checked)}
                aria-label="Ativar atualizações de fila por push"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Promoções e novidades</span>
              <small className={styles.itemDescription}>
                Receba informações sobre novos serviços e campanhas de saúde
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={promocoesNovidades}
                onChange={(e) => setPromocoesNovidades(e.target.checked)}
                aria-label="Ativar promoções e novidades por push"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Phone className={styles.icon} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Notificações por SMS</h4>
            <p className={styles.sectionSubtitle}>
              Mensagens SMS para alertas urgentes
            </p>
          </div>
        </div>

        <ul className={styles.sectionList}>
          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Lembretes urgentes</span>
              <small className={styles.itemDescription}>
                SMS para consultas e exames importantes
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={lembretesUrgentes}
                onChange={(e) => setLembretesUrgentes(e.target.checked)}
                aria-label="Ativar lembretes urgentes por SMS"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>

          <li className={styles.sectionItem}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Alterações de horário</span>
              <small className={styles.itemDescription}>
                Aviso por SMS em caso de remarcarão
              </small>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={alteracoesHorario}
                onChange={(e) => setAlteracoesHorario(e.target.checked)}
                aria-label="Ativar alterações de horário por SMS"
              />
              <span aria-hidden className={styles.toggleKnob} />
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.saveButtonContainer}>
        <button
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

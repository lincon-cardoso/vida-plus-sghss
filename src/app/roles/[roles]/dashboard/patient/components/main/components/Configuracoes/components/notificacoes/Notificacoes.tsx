"use client";

import { useState } from "react";
import styles from "./styles/Notificacoes.module.scss";
// Nota: mantenha os nomes de classes semânticos alinhados entre TSX e SCSS (ex.: styles.container ↔ .container)
import { Mail, Smartphone, Phone, Save } from "lucide-react";

// Componente principal que renderiza as preferências de notificação do usuário
export default function Notificacoes() {
  // -----------------------------
  // Estados (local component state)
  // -----------------------------
  // E-mail: flags que controlam cada tipo de notificação por e-mail
  const [confirmacaoConsultas, setConfirmacaoConsultas] = useState(true); // Confirmações de consulta
  const [lembretesConsultas, setLembretesConsultas] = useState(true); // Lembretes 24h antes
  const [resultadosExames, setResultadosExames] = useState(true); // Resultados de exames
  const [receitasMedicas, setReceitasMedicas] = useState(true); // Notificações sobre receitas

  // Push: flags para notificações push (no dispositivo)
  const [mensagensMedico, setMensagensMedico] = useState(true); // Mensagens da equipe médica
  const [atualizacoesFila, setAtualizacoesFila] = useState(false); // Atualizações de fila
  const [promocoesNovidades, setPromocoesNovidades] = useState(false); // Promoções e novidades

  // SMS: flags para mensagens SMS (alertas importantes)
  const [lembretesUrgentes, setLembretesUrgentes] = useState(true); // Lembretes urgentes por SMS
  const [alteracoesHorario, setAlteracoesHorario] = useState(true); // Avisos de alteração de horário

  // Estado que indica se estamos salvando as preferências (desabilita botão)
  const [saving, setSaving] = useState(false);

  // -----------------------------
  // Função de salvamento (simulada)
  // -----------------------------
  // Ao clicar em "Salvar Preferências" simulamos uma requisição assíncrona
  // que envia as preferências e fornece feedback visual (botão desabilitado).
  function handleSave() {
    setSaving(true);
    // Simula requisição de salvamento (ex.: chamada à API)
    setTimeout(() => {
      // Aqui você normalmente enviaria os dados ao backend via fetch/axios
      // TODO: enviar preferências para o backend
      setSaving(false);
      // Pode disparar um toast/feedback aqui (ex.: "Preferências salvas com sucesso")
    }, 800);
  }

  // -----------------------------------
  // Estrutura JSX: divisão por seções
  // -----------------------------------
  return (
    <section
      className={styles.container}
      aria-label="Preferências de Notificação"
    >
      {/* Header: título principal do bloco de preferências */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Preferências de Notificação</h3>
        </div>
      </header>

      {/* Seção: Notificações por E-mail */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Mail className={styles.icon} />
          <h4 className={styles.sectionTitle}>Notificações por E-mail</h4>
        </div>

        {/* Lista de opções de e-mail */}
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Confirmação de consultas</span>
              <small className={styles.itemDescription}>
                Receba e-mail quando sua consulta for confirmada
              </small>
            </div>

            {/* Toggle: ligação do checkbox ao estado `confirmacaoConsultas` */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={confirmacaoConsultas}
                onChange={(e) => setConfirmacaoConsultas(e.target.checked)}
                aria-label="Ativar confirmações de consultas por e-mail"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Lembretes de consultas</span>
              <small className={styles.itemDescription}>
                Receba lembretes 24 horas antes de cada consulta
              </small>
            </div>

            {/* Toggle: lembretes por e-mail */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={lembretesConsultas}
                onChange={(e) => setLembretesConsultas(e.target.checked)}
                aria-label="Ativar lembretes de consultas por e-mail"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Resultados de exames</span>
              <small className={styles.itemDescription}>
                Notificação quando novos resultados estiverem disponíveis
              </small>
            </div>

            {/* Toggle: resultados de exames */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={resultadosExames}
                onChange={(e) => setResultadosExames(e.target.checked)}
                aria-label="Ativar notificações de resultados de exames por e-mail"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Receitas médicas</span>
              <small className={styles.itemDescription}>
                Aviso quando uma nova prescrição for emitida
              </small>
            </div>

            {/* Toggle: receitas médicas */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={receitasMedicas}
                onChange={(e) => setReceitasMedicas(e.target.checked)}
                aria-label="Ativar notificações de receitas médicas por e-mail"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      {/* Seção: Notificações Push */}
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

        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Mensagens do médico</span>
              <small className={styles.itemDescription}>
                Notificações instantâneas de mensagens da equipe médica
              </small>
            </div>

            {/* Toggle: mensagens do médico por push */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={mensagensMedico}
                onChange={(e) => setMensagensMedico(e.target.checked)}
                aria-label="Ativar mensagens do médico por push"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Atualizações de fila</span>
              <small className={styles.itemDescription}>
                Atualizações sobre sua posição na fila de atendimento
              </small>
            </div>

            {/* Toggle: atualizações de fila */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={atualizacoesFila}
                onChange={(e) => setAtualizacoesFila(e.target.checked)}
                aria-label="Ativar atualizações de fila por push"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Promoções e novidades</span>
              <small className={styles.itemDescription}>
                Receba informações sobre novos serviços e campanhas de saúde
              </small>
            </div>

            {/* Toggle: promoções e novidades */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={promocoesNovidades}
                onChange={(e) => setPromocoesNovidades(e.target.checked)}
                aria-label="Ativar promoções e novidades por push"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      {/* Seção: Notificações por SMS */}
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

        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Lembretes urgentes</span>
              <small className={styles.itemDescription}>
                SMS para consultas e exames importantes
              </small>
            </div>

            {/* Toggle: lembretes urgentes por SMS */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={lembretesUrgentes}
                onChange={(e) => setLembretesUrgentes(e.target.checked)}
                aria-label="Ativar lembretes urgentes por SMS"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>

          <li className={styles.item}>
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>Alterações de horário</span>
              <small className={styles.itemDescription}>
                Aviso por SMS em caso de remarcarão
              </small>
            </div>

            {/* Toggle: alterações de horário por SMS */}
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={alteracoesHorario}
                onChange={(e) => setAlteracoesHorario(e.target.checked)}
                aria-label="Ativar alterações de horário por SMS"
              />
              <span aria-hidden className={styles.knob} />
            </label>
          </li>
        </ul>
      </div>

      {/* Botão de salvar: chama `handleSave` e fica desabilitado enquanto `saving` for true */}
      <div className={styles.saveContainer}>
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

"use client";

import { useMemo, useState } from "react";
import {
  Shield,
  Lock,
  Key,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";

import styles from "./styles/seguranca.module.scss";

type Session = {
  id: string;
  device: string;
  location: string;
  time: string;
  current?: boolean;
};

export default function Seguranca() {
  /**
   * Mapa de classes (TSX -> SCSS)
   * A ideia é manter a hierarquia visual igual nos dois arquivos.
   *
   * container {
   *   section {
   *     sectionTitle
   *     sectionBody
   *     row { label, inputGroup { inputIcon, input }, smallNote }
   *     error / success
   *     actionsRow { btn + btnPrimary }
   *   }
   *
   *   section (2FA) {
   *     cardInline { cardIconWrap { cardIcon }, cardContent { cardSub }, cardAction { btn + btnOutline } }
   *   }
   *
   *   section (Sessões) {
   *     sessionsList { sessionItem { sessionInfo { sessionTitle, sessionMeta }, sessionActions { sessionBadge | endLink } } }
   *     endAllRow { endAllLink }
   *   }
   *
   *   section (LGPD) {
   *     alertBox
   *     privacyList { privacyItem { privacyButton { iconSmall } } }
   *     deleteRow { dangerLink }
   *   }
   * }
   */

  // Senha
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorProcessing, setTwoFactorProcessing] = useState(false);

  // Sessões
  const [sessions, setSessions] = useState<Session[]>(() => [
    {
      id: "s1",
      device: "Chrome no Windows",
      location: "São Paulo, Brasil",
      time: "Agora",
      current: true,
    },
    {
      id: "s2",
      device: "Safari no iPhone",
      location: "São Paulo, Brasil",
      time: "2 horas atrás",
    },
    {
      id: "s3",
      device: "Firefox no Windows",
      location: "São Paulo, Brasil",
      time: "1 dia atrás",
    },
  ]);

  const canUpdatePassword = useMemo(() => {
    if (!currentPassword || !newPassword || !confirmPassword) return false;
    if (newPassword.length < 8) return false;
    if (!/[0-9]/.test(newPassword) || !/[A-Za-z]/.test(newPassword))
      return false;
    return newPassword === confirmPassword;
  }, [currentPassword, newPassword, confirmPassword]);

  function validateAndUpdatePassword() {
    setPasswordError(null);
    setPasswordSaved(false);

    if (!currentPassword) {
      setPasswordError("Informe sua senha atual");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("A nova senha precisa ter ao menos 8 caracteres");
      return;
    }

    if (!/[0-9]/.test(newPassword) || !/[A-Za-z]/.test(newPassword)) {
      setPasswordError("A nova senha precisa conter letras e números");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    // Simula chamada para salvar
    setTimeout(() => {
      setPasswordSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 500);
  }

  function toggleTwoFactor() {
    setTwoFactorProcessing(true);
    // Simula ativação/desativação
    setTimeout(() => {
      setTwoFactorEnabled((v) => !v);
      setTwoFactorProcessing(false);
    }, 600);
  }

  function endSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function endAllOtherSessions() {
    setSessions((prev) => prev.filter((s) => s.current));
  }

  function handleDownload(policy: string) {
    // Placeholder: disparar download / abrir PDF
    if (typeof window !== "undefined") {
      window.open(`/docs/${policy}.pdf`, "_blank");
    }
  }

  function handleManageConsents() {
    // TODO: implementar workflow de gerenciamento de consentimentos
  }

  function handleRequestDeletion() {
    // TODO: implementar fluxo de solicitação de exclusão de dados com confirmação
  }

  return (
    // container: wrapper geral do módulo de segurança
    <div className={styles.container}>
      {/* Alterar Senha */}
      <section className={styles.section} aria-labelledby="alterar-senha">
        <h2 id="alterar-senha" className={styles.sectionTitle}>
          Alterar Senha
        </h2>

        {/* row: linha com label + inputGroup (ícone + input) */}
        <div className={styles.row}>
          <label className={styles.label}>Senha Atual</label>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} aria-hidden="true" />
            <input
              type="password"
              className={styles.input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              aria-label="Senha atual"
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Nova Senha</label>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} aria-hidden="true" />
            <input
              type="password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              aria-describedby="nova-senha-note"
            />
          </div>
          <small id="nova-senha-note" className={styles.smallNote}>
            Mínimo 8 caracteres, com letras e números
          </small>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Confirmar Nova Senha</label>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} aria-hidden="true" />
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* error/success: feedback de validação */}
        {passwordError && (
          <div className={styles.error} role="alert">
            <XCircle className={styles.errorIcon} /> {passwordError}
          </div>
        )}

        {passwordSaved && (
          <div className={styles.success} role="status">
            <CheckCircle className={styles.successIcon} /> Senha atualizada com
            sucesso
          </div>
        )}

        {/* actionsRow: ações do formulário */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={validateAndUpdatePassword}
            disabled={!canUpdatePassword}
          >
            Atualizar Senha
          </button>
        </div>
      </section>

      {/* Autenticação de Dois Fatores */}
      <section className={styles.section} aria-labelledby="dois-fatores">
        <h2 id="dois-fatores" className={styles.sectionTitle}>
          Autenticação de Dois Fatores
        </h2>

        <p className={styles.sectionBody}>
          Adicione uma camada extra de segurança à sua conta. Você precisará de
          um código do seu celular além da senha para fazer login.
        </p>

        {/* cardInline: cartão de status/ação do 2FA */}
        <div className={styles.cardInline}>
          <div className={styles.cardIconWrap}>
            <Key className={styles.cardIcon} />
          </div>
          <div className={styles.cardContent}>
            <strong>Autenticação de 2 Fatores</strong>
            <div className={styles.cardSub}>
              {" "}
              {twoFactorEnabled ? "Ativada" : "Desativada"}
            </div>
          </div>
          <div className={styles.cardAction}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={toggleTwoFactor}
              disabled={twoFactorProcessing}
            >
              {twoFactorEnabled ? "Desativar" : "Ativar"}
            </button>
          </div>
        </div>
      </section>

      {/* Sessões Ativas */}
      <section className={styles.section} aria-labelledby="sessoes-ativas">
        <h2 id="sessoes-ativas" className={styles.sectionTitle}>
          Sessões Ativas
        </h2>

        <p className={styles.sectionBody}>
          Gerencie os dispositivos onde você está conectado
        </p>

        {/* sessionsList: lista de sessões/dispositivos conectados */}
        <ul className={styles.sessionsList}>
          {sessions.map((s) => (
            <li key={s.id} className={styles.sessionItem}>
              <div className={styles.sessionInfo}>
                <div className={styles.sessionTitle}>{s.device}</div>
                <div className={styles.sessionMeta}>
                  {s.location} • {s.time}
                </div>
              </div>

              <div className={styles.sessionActions}>
                {s.current ? (
                  <span className={styles.sessionBadge}>Atual</span>
                ) : (
                  <button
                    type="button"
                    className={styles.endLink}
                    onClick={() => endSession(s.id)}
                  >
                    Encerrar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* endAllRow: ação para encerrar todas as sessões exceto a atual */}
        <div className={styles.endAllRow}>
          <button
            type="button"
            className={styles.endAllLink}
            onClick={endAllOtherSessions}
          >
            Encerrar todas as outras sessões
          </button>
        </div>
      </section>

      {/* Privacidade e LGPD */}
      <section className={styles.section} aria-labelledby="privacidade">
        <h2 id="privacidade" className={styles.sectionTitle}>
          Privacidade e LGPD
        </h2>

        {/* alertBox: resumo informativo de LGPD */}
        <div className={styles.alertBox}>
          <p>
            <strong>
              De acordo com a Lei Geral de Proteção de Dados (LGPD)
            </strong>
          </p>
          <p>
            Seus dados são protegidos e utilizados apenas para fins médicos e
            administrativos. Você tem direito ao acesso, correção e exclusão de
            seus dados pessoais.
          </p>
        </div>

        {/* privacyList: ações (políticas/consentimento) */}
        <ul className={styles.privacyList}>
          <li className={styles.privacyItem}>
            <button
              type="button"
              className={styles.privacyButton}
              onClick={() => handleDownload("politica-de-privacidade")}
            >
              <span>Política de Privacidade</span>
              <Download className={styles.iconSmall} />
            </button>
          </li>

          <li className={styles.privacyItem}>
            <button
              type="button"
              className={styles.privacyButton}
              onClick={() => handleDownload("termos-de-uso")}
            >
              <span>Termos de Uso</span>
              <Download className={styles.iconSmall} />
            </button>
          </li>

          <li className={styles.privacyItem}>
            <button
              type="button"
              className={styles.privacyButton}
              onClick={() => handleManageConsents()}
            >
              <span>Gerenciar Consentimentos</span>
              <Shield className={styles.iconSmall} />
            </button>
          </li>
        </ul>

        {/* deleteRow: ação sensível (exclusão de dados) */}
        <div className={styles.deleteRow}>
          <button
            type="button"
            className={styles.dangerLink}
            onClick={() => handleRequestDeletion()}
          >
            Solicitar exclusão de todos os meus dados
          </button>
        </div>
      </section>
    </div>
  );
}

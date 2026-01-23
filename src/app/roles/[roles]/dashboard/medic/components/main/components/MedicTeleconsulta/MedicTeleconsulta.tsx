"use client";

import { useState, useEffect } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MessageSquare,
  Camera,
  PhoneOff,
} from "lucide-react";
import styles from "./MedicTeleconsulta.module.scss";
import { mockPatient } from "./data";

/**
 * Tela de Teleconsulta para médicos
 * - Client Component: estado e efeitos para simular chamada
 * - Acessível: roles, aria-labels e aria-pressed
 */
export default function MedicTeleconsulta() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected"
  >("idle");

  const isConnecting = callStatus === "connecting";
  const isConnected = callStatus === "connected";

  function toggleCamera() {
    setIsCameraOn((v) => !v);
  }

  function toggleMic() {
    setIsMicOn((v) => !v);
  }

  function handleStartCall() {
    setCallStatus("connecting");
  }

  function handleEndCall() {
    setCallStatus("idle");
  }

  useEffect(() => {
    if (callStatus === "connecting") {
      const t = setTimeout(() => setCallStatus("connected"), 1800);
      return () => clearTimeout(t);
    }
  }, [callStatus]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>Telemedicina</h2>
        <p className={styles.subtitle}>
          Realize consultas online com seus pacientes
        </p>
      </header>

      <div className={styles.grid}>
        <main className={styles.main} aria-label="Área da chamada">
          <section
            className={styles.videoCard}
            role="region"
            aria-label="Tela da chamada"
          >
            {callStatus === "idle" ? (
              <div className={styles.videoPlaceholder}>
                <Camera size={64} className={styles.videoIcon} />
                <div className={styles.videoText}>
                  <strong>Consulta agendada para 14:00</strong>
                  <span>
                    Clique em <strong>Iniciar Chamada</strong> para começar
                  </span>
                </div>
              </div>
            ) : isConnecting ? (
              <div className={styles.videoPlaceholder}>
                <Video size={64} className={styles.videoIcon} />
                <div className={styles.videoText}>
                  <strong>Conectando...</strong>
                  <span>Aguarde enquanto estabelecemos a conexão</span>
                </div>
              </div>
            ) : (
              <div className={styles.videoActive} aria-hidden>
                <div className={styles.callHeader}>
                  <div className={styles.callStatusIndicator} aria-hidden />
                  <div className={styles.callMeta}>
                    <strong>Chamada em andamento</strong>
                    <span>Paciente: {mockPatient.name}</span>
                  </div>
                </div>
                <div className={styles.videoStream} />
              </div>
            )}
          </section>

          <div
            className={styles.controlsBar}
            role="toolbar"
            aria-label="Controles da chamada"
          >
            <div className={styles.controlsInner}>
              <div className={styles.iconGroup}>
                <button
                  type="button"
                  className={styles.roundButton}
                  onClick={toggleCamera}
                  aria-pressed={!isCameraOn}
                  aria-label={isCameraOn ? "Desligar câmera" : "Ligar câmera"}
                >
                  {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
                </button>

                <button
                  type="button"
                  className={styles.roundButton}
                  onClick={toggleMic}
                  aria-pressed={!isMicOn}
                  aria-label={
                    isMicOn ? "Desligar microfone" : "Ligar microfone"
                  }
                >
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
              </div>

              <div className={styles.primaryGroup}>
                {callStatus === "idle" ? (
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleStartCall}
                    disabled={isConnecting}
                    aria-label="Iniciar chamada"
                  >
                    <Video size={16} />
                    <span>Iniciar Chamada</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${styles.primaryButton} ${styles.endCall}`}
                    onClick={handleEndCall}
                    aria-label="Encerrar chamada"
                  >
                    <PhoneOff size={16} />
                    <span>Encerrar Chamada</span>
                  </button>
                )}
              </div>

              <div className={styles.iconGroup}>
                <button
                  type="button"
                  className={styles.roundButton}
                  aria-label="Compartilhar tela"
                  disabled={!isConnected}
                >
                  <Monitor size={18} />
                </button>

                <button
                  type="button"
                  className={styles.roundButton}
                  aria-label="Abrir chat"
                  disabled={!isConnected}
                >
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <aside className={styles.aside} aria-label="Painel do paciente">
          <div className={styles.patientCard}>
            <div className={styles.patientTop}>
              <div className={styles.patientAvatar} aria-hidden>
                {mockPatient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className={styles.patientInfo}>
                <h3 className={styles.patientName}>{mockPatient.name}</h3>
                <p className={styles.patientMeta}>{mockPatient.age} anos</p>
              </div>
            </div>

            <dl className={styles.patientDetails}>
              <div>
                <dt>CPF</dt>
                <dd>123.456.789-00</dd>
              </div>
              <div>
                <dt>Telefone</dt>
                <dd>(11) 98765-4321</dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd>14:00</dd>
              </div>
              <div>
                <dt>Motivo da Consulta</dt>
                <dd>{mockPatient.condition}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.historyCard}>
            <h4>Histórico Médico</h4>
            <ul className={styles.historyList}>
              <li className={styles.historyItem}>
                <div className={styles.historyMeta}>
                  <time>05/10/2024</time>
                  <span className={styles.historyType}>Consulta</span>
                </div>
                <div className={styles.historyBody}>
                  <strong>Dr. João Santos</strong>
                  <p>Pressão arterial normal</p>
                </div>
              </li>

              <li className={styles.historyItem}>
                <div className={styles.historyMeta}>
                  <time>15/09/2024</time>
                  <span className={styles.historyType}>Exame</span>
                </div>
                <div className={styles.historyBody}>
                  <strong>Laboratório Central</strong>
                  <p>Hemograma completo - Normal</p>
                </div>
              </li>

              <li className={styles.historyItem}>
                <div className={styles.historyMeta}>
                  <time>20/08/2024</time>
                  <span className={styles.historyType}>Consulta</span>
                </div>
                <div className={styles.historyBody}>
                  <strong>Dr. João Santos</strong>
                  <p>Acompanhamento pós-operatório</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className={styles.footerSpacing} aria-hidden />
    </div>
  );
}

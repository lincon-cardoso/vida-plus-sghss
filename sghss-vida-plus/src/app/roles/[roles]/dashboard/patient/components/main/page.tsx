"use client";
import {
  Home,
  Users,
  Calendar,
  Settings,
  LogOut,
  FileText,
  Activity,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { usePatientMenuStore } from "@/lib/stores";
import styles from "./styles/PatientMenu.module.scss";

export default function PatientDashboardMain() {
  const isMenuOpen = usePatientMenuStore((s) => s.isMenuOpen);
  const closeMenu = usePatientMenuStore((s) => s.closeMenu);

  const menuRef = useRef<HTMLElement | null>(null);

  const quickActions = [
    { label: "Início", Icon: Home },
    { label: "Pacientes", Icon: Users },
    { label: "Agenda", Icon: Calendar },
    { label: "Configurações", Icon: Settings },
    { label: "sair", Icon: LogOut, color: "#ff0000" },
  ];

  // Fecha com Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    if (isMenuOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen, closeMenu]);

  // Move foco para o menu quando aberto
  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => menuRef.current?.focus(), 0);
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <nav
          id="patient-menu"
          className={styles.sidebarIcons}
          aria-label="Navegação rápida"
        >
          <ul className={styles.iconList}>
            {quickActions.map(({ label, Icon, color }) => (
              <li key={label}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={label}
                >
                  <Icon
                    className={styles.icon}
                    style={color ? { color } : undefined}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className={styles.content} aria-label="Conteúdo principal">
          <div className={styles.welcomeBox}>
            {/* caixa nome e apresentacao */}
            <h1 className={styles.contentTitle}>Olá, João!</h1>
            <p className={styles.editable}>
              Bem-vinda ao seu portal do paciente.
            </p>
          </div>
          <div className={styles.infoBoxes}>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxTop}>
                <Calendar className={styles.icon} />
                <h2 className={styles.infoNumber}>2</h2>
              </div>
              <p className={styles.infoLabel}>Próximas Consultas</p>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxTop}>
                <FileText className={styles.icon} />
                <h2 className={styles.infoNumber}>3</h2>
              </div>
              <p className={styles.infoLabel}>Resultados de Exames</p>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxTop}>
                <Activity className={styles.icon} />
                <h2 className={styles.infoNumber}>1</h2>
              </div>
              <p className={styles.infoLabel}>Prescrição Ativa</p>
            </div>
          </div>
          <div className={styles.appointmentsRoot}>
            {/* Consultas */}
            <h2 className={styles.sectionTitle}>Próximas Consultas</h2>

            <div
              className={styles.appointmentsCard}
              aria-label="Lista de próximas consultas"
            >
              <ul className={styles.appointmentList}>
                {/* Exemplo de item de consulta */}
                <li className={styles.appointmentItem}>
                  <div className={styles.appointmentLeft}>
                    <div className={styles.appointmentAvatar}>JS</div>
                    <div className={styles.appointmentDetails}>
                      <p className={styles.doctorName}>Dr. João Santos Silva</p>
                      <p className={styles.specialty}>Cardiologia</p>
                    </div>
                  </div>

                  <div className={styles.appointmentRight}>
                    <p className={styles.appointmentDate}>15/11/2024</p>
                    <p className={styles.appointmentTime}>09:00</p>
                    <p
                      className={`${styles.appointmentStatus} ${styles.confirmed}`}
                    >
                      Confirmada
                    </p>
                  </div>
                </li>

                <li className={styles.appointmentItem}>
                  <div className={styles.appointmentLeft}>
                    <div className={styles.appointmentAvatar}>AC</div>
                    <div className={styles.appointmentDetails}>
                      <p className={styles.doctorName}>
                        Dra. Ana Costa Pereira
                      </p>
                      <p className={styles.specialty}>Check-up Geral</p>
                    </div>
                  </div>

                  <div className={styles.appointmentRight}>
                    <p className={styles.appointmentDate}>22/11/2024</p>
                    <p className={styles.appointmentTime}>14:30</p>
                    <p
                      className={`${styles.appointmentStatus} ${styles.pending}`}
                    >
                      Pendente
                    </p>
                  </div>
                </li>
              </ul>

              <div className={styles.appointmentFooter}>
                <button type="button" className={styles.scheduleButton}>
                  Agendar Nova Consulta
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

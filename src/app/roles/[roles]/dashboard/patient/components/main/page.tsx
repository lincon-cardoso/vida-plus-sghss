"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePatientMenuStore } from "@/lib/stores";
import styles from "./styles/PatientMenu.module.scss";
import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog/ScheduleAppointmentDialog";
import PatientUpdatesSection from "./components/PatientUpdatesSection/PatientUpdatesSection";
import QuickActionsBanner from "./components/QuickActionsBanner/QuickActionsBanner";
import QuickActionsNav, {
  type QuickAction,
} from "./components/QuickActionsNav/QuickActionsNav";
import WelcomeBox from "./components/WelcomeBox/WelcomeBox";
import ProntuarioBox from "./components/ProntuarioBox/ProntuarioBox";
import InfoBoxes, { type InfoBoxItem } from "./components/InfoBoxes/InfoBoxes";
import AppointmentsCard from "./components/AppointmentsCard/AppointmentsCard";
import MeusAgendamentos from "./components/MeusAgendamentos/MeusAgendamentos";
import Configuracoes from "./components/Configuracoes/Configuracoes";
import type { Appointment } from "./components/AppointmentsCard/AppointmentItem";

type PatientMenuItem =
  | "Meu Dashboard"
  | "Meu Prontuário"
  | "Meus Agendamentos"
  | "Configurações"
  | "Sair";

const INFO_BOXES: InfoBoxItem[] = [
  {
    itemKey: "upcoming_appointments",
    count: 2,
    label: "Próximas Consultas",
  },
  {
    itemKey: "exam_results",
    count: 3,
    label: "Resultados de Exames",
  },
  {
    itemKey: "active_prescription",
    count: 1,
    label: "Prescrição Ativa",
  },
];

const APPOINTMENTS: Appointment[] = [
  {
    avatar: "JS",
    doctorName: "Dr. João Santos Silva",
    specialty: "Cardiologia",
    date: "15/11/2024",
    time: "09:00",
    status: "Confirmada",
  },
  {
    avatar: "AC",
    doctorName: "Dra. Ana Costa Pereira",
    specialty: "Check-up Geral",
    date: "22/11/2024",
    time: "14:30",
    status: "Pendente",
  },
];

export default function PatientDashboardMain() {
  const router = useRouter();
  const isMenuOpen = usePatientMenuStore((s) => s.isMenuOpen);
  const closeMenu = usePatientMenuStore((s) => s.closeMenu);

  const menuRef = useRef<HTMLElement | null>(null);

  const [activeItem, setActiveItem] = useState<PatientMenuItem>(() => {
    try {
      const raw = sessionStorage.getItem(
        "vida-plus:patient-dashboard:activeItem"
      );
      if (
        raw === "Meu Dashboard" ||
        raw === "Meu Prontuário" ||
        raw === "Meus Agendamentos" ||
        raw === "Configurações" ||
        raw === "Sair"
      ) {
        return raw;
      }
    } catch {
      // ignore
    }
    return "Meu Dashboard";
  });

  const quickActions: QuickAction[] = useMemo(
    () => [
      { itemKey: "nav_dashboard", label: "Meu Dashboard" },
      { itemKey: "nav_prontuario", label: "Meu Prontuário" },
      {
        itemKey: "nav_agendamentos",
        label: "Meus Agendamentos",
      },
      { itemKey: "nav_config", label: "Configurações" },
      { itemKey: "nav_logout", label: "Sair", color: "#ff0000" },
    ],
    []
  );

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

  // Mantém a aba selecionada após refresh (F5)
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "vida-plus:patient-dashboard:activeItem",
        String(activeItem)
      );
    } catch {
      // ignore
    }
  }, [activeItem]);

  function handleActionClick(action: QuickAction) {
    const label = action.label as PatientMenuItem;

    if (label === "Sair") {
      // Obs.: o cookie de token é httpOnly; para logout real, crie um endpoint
      // que limpe o cookie. Por enquanto, apenas redireciona para o login.
      router.push("/login");
      return;
    }

    setActiveItem(label);
    closeMenu();
  }

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <QuickActionsNav
          actions={quickActions}
          menuRef={menuRef}
          activeLabel={activeItem}
          onActionClick={handleActionClick}
        />

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Meu Dashboard" && (
            <>
              <WelcomeBox
                title="Olá, João!"
                subtitle="Bem-vinda ao seu portal do paciente."
              />
              <InfoBoxes items={INFO_BOXES} />

              <AppointmentsCard
                title="Próximas Consultas"
                appointments={APPOINTMENTS}
                footer={<ScheduleAppointmentDialog />}
              />

              <PatientUpdatesSection />
              <QuickActionsBanner
                items={[
                  { itemKey: "banner_exames", label: "Exames" },
                  {
                    itemKey: "banner_horarios",
                    label: "Horários",
                  },
                  {
                    itemKey: "banner_atividades",
                    label: "Atividades",
                  },
                  { itemKey: "banner_agenda", label: "Agenda" },
                ]}
              />
            </>
          )}

          {activeItem === "Meu Prontuário" && (
            <>
              <ProntuarioBox
                tabs={[
                  {
                    key: "Meus Exames",
                    label: "Meus Exames",
                  },
                  {
                    key: "Dados Pessoais",
                    label: "Dados Pessoais",
                  },
                  {
                    key: "Histórico Médico",
                    label: "Histórico Médico",
                  },
                ]}
                items={[
                  {
                    itemKey: "exam_pending",
                    label: "Exames Pendentes",
                    value: 5,
                  },
                  {
                    itemKey: "exam_in_process",
                    label: "Em Processo",
                    value: 2,
                  },
                  {
                    itemKey: "exam_completed",
                    label: "Concluídos",
                    value: 12,
                  },
                  {
                    itemKey: "exam_urgent",
                    label: "Urgente",
                    value: 5,
                  },
                ]}
              />
            </>
          )}

          {activeItem === "Meus Agendamentos" && <MeusAgendamentos />}

          {activeItem === "Configurações" && <Configuracoes />}
        </section>
      </div>
    </div>
  );
}

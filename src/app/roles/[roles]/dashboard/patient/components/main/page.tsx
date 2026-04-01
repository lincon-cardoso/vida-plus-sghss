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

type DashboardSummary = {
  upcomingAppointments: number;
  examResults: number;
  activePrescriptions: number;
};

const INFO_BOXES: InfoBoxItem[] = [
  {
    itemKey: "upcoming_appointments",
    count: "...",
    label: "Próximas Consultas",
  },
  {
    itemKey: "exam_results",
    count: "...",
    label: "Resultados de Exames",
  },
  {
    itemKey: "active_prescription",
    count: "...",
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
  const [infoBoxes, setInfoBoxes] = useState<InfoBoxItem[]>(() => INFO_BOXES);

  const [activeItem, setActiveItem] = useState<PatientMenuItem>(() => {
    try {
      const raw = sessionStorage.getItem(
        "vida-plus:patient-dashboard:activeItem",
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
    [],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardSummary() {
      try {
        const response = await fetch("/api/patient/dashboard-summary", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data: { summary?: DashboardSummary } = await response.json();

        if (!data.summary || !isMounted) {
          return;
        }

        setInfoBoxes((current) =>
          current.map((item) => {
            if (item.itemKey === "upcoming_appointments") {
              return {
                ...item,
                count: data.summary?.upcomingAppointments ?? item.count,
              };
            }

            if (item.itemKey === "exam_results") {
              return {
                ...item,
                count: data.summary?.examResults ?? item.count,
              };
            }

            if (item.itemKey === "active_prescription") {
              return {
                ...item,
                count: data.summary?.activePrescriptions ?? item.count,
              };
            }

            return item;
          }),
        );
      } catch {
        // ignore
      }
    }

    void loadDashboardSummary();
    const intervalId = window.setInterval(() => {
      void loadDashboardSummary();
    }, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

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
        String(activeItem),
      );
    } catch {
      // ignore
    }
  }, [activeItem]);

  async function handleActionClick(action: QuickAction) {
    const label = action.label as PatientMenuItem;

    if (label === "Sair") {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          cache: "no-store",
        });
      } catch {
        // ignore
      } finally {
        try {
          sessionStorage.removeItem("vida-plus:patient-dashboard:activeItem");
        } catch {
          // ignore
        }

        router.replace("/login");
        router.refresh();
      }
      return;
    }

    setActiveItem(label);
  }

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <QuickActionsNav
          actions={quickActions}
          menuRef={menuRef}
          activeLabel={activeItem}
          onActionClick={handleActionClick}
          isExpanded={isMenuOpen}
        />

        <section className={styles.content} aria-label="Conteúdo principal">
          {activeItem === "Meu Dashboard" && (
            <>
              <WelcomeBox
                title="Olá, João!"
                subtitle="Bem-vinda ao seu portal do paciente."
              />
              <InfoBoxes items={infoBoxes} />

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

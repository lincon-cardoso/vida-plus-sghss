"use client";
import {
  Home,
  Users,
  Calendar,
  Settings,
  LogOut,
  FileText,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  TestTube,
} from "lucide-react";
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
import type { Appointment } from "./components/AppointmentsCard/AppointmentItem";

type PatientMenuItem =
  | "Meu Dashboard"
  | "Meu Prontuário"
  | "Meus Agendamentos"
  | "Configurações"
  | "Sair";

const INFO_BOXES: InfoBoxItem[] = [
  { Icon: Calendar, count: 2, label: "Próximas Consultas" },
  { Icon: FileText, count: 3, label: "Resultados de Exames" },
  { Icon: Activity, count: 1, label: "Prescrição Ativa" },
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
  const [activeItem, setActiveItem] =
    useState<PatientMenuItem>("Meu Dashboard");

  const quickActions: QuickAction[] = useMemo(
    () => [
      { label: "Meu Dashboard", Icon: Home },
      { label: "Meu Prontuário", Icon: Users },
      { label: "Meus Agendamentos", Icon: Calendar },
      { label: "Configurações", Icon: Settings },
      { label: "Sair", Icon: LogOut, color: "#ff0000" },
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

              <PatientUpdatesSection FileTextIcon={FileText} />
              <QuickActionsBanner
                items={[
                  { Icon: FileText, label: "Exames" },
                  { Icon: Clock, label: "Horários" },
                  { Icon: Activity, label: "Atividades" },
                  { Icon: Calendar, label: "Agenda" },
                ]}
              />
            </>
          )}

          {activeItem === "Meu Prontuário" && (
            <>
              <ProntuarioBox
                tabs={[
                  { key: "Meus Exames", label: "Meus Exames", Icon: TestTube },
                  {
                    key: "Dados Pessoais",
                    label: "Dados Pessoais",
                    Icon: Users,
                  },
                  {
                    key: "Histórico Médico",
                    label: "Histórico Médico",
                    Icon: FileText,
                  },
                ]}
                items={[
                  { Icon: AlertCircle, label: "Exames Pendentes", value: 5 },
                  { Icon: Clock, label: "Em Processo", value: 2 },
                  { Icon: CheckCircle, label: "Concluídos", value: 12 },
                  { Icon: Activity, label: "Urgente", value: 5 },
                ]}
              />
            </>
          )}

          {activeItem === "Meus Agendamentos" && (
            <>
              <WelcomeBox
                title="Meus Agendamentos"
                subtitle="Consulte e gerencie suas consultas."
              />
              <AppointmentsCard
                title="Próximas Consultas"
                appointments={APPOINTMENTS}
                footer={<ScheduleAppointmentDialog />}
              />
            </>
          )}

          {activeItem === "Configurações" && (
            <>
              <WelcomeBox
                title="Configurações"
                subtitle="Ajuste suas preferências de conta e notificações."
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

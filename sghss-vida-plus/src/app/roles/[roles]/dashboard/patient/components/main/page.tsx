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
import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog/ScheduleAppointmentDialog";
import PatientUpdatesSection from "./components/PatientUpdatesSection/PatientUpdatesSection";
import QuickActionsNav, {
  type QuickAction,
} from "./components/QuickActionsNav/QuickActionsNav";
import WelcomeBox from "./components/WelcomeBox/WelcomeBox";
import InfoBoxes, { type InfoBoxItem } from "./components/InfoBoxes/InfoBoxes";
import AppointmentsCard from "./components/AppointmentsCard/AppointmentsCard";
import type { Appointment } from "./components/AppointmentsCard/AppointmentItem";

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Início", Icon: Home },
  { label: "Pacientes", Icon: Users },
  { label: "Agenda", Icon: Calendar },
  { label: "Configurações", Icon: Settings },
  { label: "sair", Icon: LogOut, color: "#ff0000" },
];

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
  const isMenuOpen = usePatientMenuStore((s) => s.isMenuOpen);
  const closeMenu = usePatientMenuStore((s) => s.closeMenu);

  const menuRef = useRef<HTMLElement | null>(null);

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
        <QuickActionsNav actions={QUICK_ACTIONS} menuRef={menuRef} />

        <section className={styles.content} aria-label="Conteúdo principal">
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
        </section>
      </div>
    </div>
  );
}

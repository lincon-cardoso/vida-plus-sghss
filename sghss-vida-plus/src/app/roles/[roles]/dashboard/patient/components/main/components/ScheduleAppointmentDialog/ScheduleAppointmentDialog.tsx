"use client";
// Componente: diálogo para agendar consultas.
// Usa Radix UI para o diálogo e react-day-picker para seleção de datas.
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./ScheduleAppointmentDialog.module.scss";
import { useMemo, useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";

export default function ScheduleAppointmentDialog() {
  // Estado local do componente:
  // - open: controla visibilidade do diálogo
  // - selectedDate / selectedTime: data e hora escolhidas
  // - isSubmitting: flag enquanto confirmamos o agendamento
  // - successMessage: mensagem de confirmação exibida ao usuário
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Gera lista de horários (08:00 a 17:30, passo 30min).
  // Mantido em useMemo para não recalcular a cada render.
  const times = useMemo<string[]>(() => {
    const result: string[] = [];
    const start = new Date();
    start.setHours(8, 0, 0, 0);
    const end = new Date();
    end.setHours(17, 30, 0, 0);
    const cursor = new Date(start);
    while (cursor <= end) {
      const hh = String(cursor.getHours()).padStart(2, "0");
      const mm = String(cursor.getMinutes()).padStart(2, "0");
      result.push(`${hh}:${mm}`);
      cursor.setMinutes(cursor.getMinutes() + 30);
    }
    return result;
  }, []);

  // Simula disponibilidade (exemplo/demo)
  // Em produção, substituir por verificação real via API.
  function isAvailable(date: Date | undefined, time: string) {
    if (!date) return false;
    const daySeed = date.getDate() % 4; // varia por dia
    const idx = times.indexOf(time);
    if (idx < 0) return false;
    // marca indisponível quando idx % 4 === daySeed (simulação)
    return !(idx % 4 === daySeed);
  }

  // Tenta selecionar/deselecionar um horário.
  // Ignora cliques em horários indisponíveis.
  function handleSelectTime(time: string) {
    if (!isAvailable(selectedDate, time)) return;
    setSelectedTime((prev) => (prev === time ? null : time));
  }

  // Valida seleção e realiza "envio" do agendamento (simulado).
  // Em produção, chamar API e tratar erros.
  function handleConfirm() {
    if (!selectedDate || !selectedTime || isSubmitting) return;
    setIsSubmitting(true);

    // simula chamada à API
    setTimeout(() => {
      console.log("Confirmando:", {
        date: selectedDate.toISOString(),
        time: selectedTime,
      });

      setSuccessMessage(
        `Agendamento confirmado para ${selectedDate.toLocaleDateString(
          "pt-BR",
          {
            day: "numeric",
            month: "long",
          }
        )} às ${selectedTime}`
      );

      setIsSubmitting(false);

      // mostra feedback rapidamente antes de fechar e resetar
      setTimeout(() => {
        setSuccessMessage(null);
        setOpen(false);
        setSelectedDate(undefined);
        setSelectedTime(null);
      }, 900);
    }, 700);
  }
  // Reseta estado quando o diálogo é fechado (pequeno timeout para garantir transição)
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSelectedDate(undefined);
        setSelectedTime(null);
        setIsSubmitting(false);
        setSuccessMessage(null);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Botão que abre o diálogo */}
      <Dialog.Trigger asChild>
        <button type="button" className={styles.scheduleButton}>
          Agendar Nova Consulta
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <div className={styles.dialogTitle}>Agendar Nova Consulta</div>
            <p>
              Selecione a especialidade, médico e horário de sua preferência.
            </p>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              className={styles.dialogClose}
              aria-label="Fechar"
            >
              ×
            </button>
          </Dialog.Close>
          <div className={styles.editRow}>
            {/* Campos: especialidade e médico (podem vir via props ou API no futuro) */}
            <div className={styles.editField}>
              <label htmlFor="specialty">Especialidade:</label>
              <select
                id="specialty"
                name="specialty"
                defaultValue={""}
                required
              >
                <option value="" disabled>
                  Selecione a especialidade
                </option>
                <option value="cardiology">Cardiologia</option>
                <option value="dermatology">Dermatologia</option>
                <option value="pediatrics">Pediatria</option>
              </select>
            </div>
            <div className={styles.editField}>
              <label htmlFor="doctor">Médico:</label>
              <select id="doctor" name="doctor" defaultValue={""} required>
                <option value="" disabled>
                  Selecione o médico
                </option>
                <option value="dr-smith">Dr. Smith</option>
                <option value="dr-jones">Dra. Jones</option>
                <option value="dr-brown">Dr. Brown</option>
              </select>
            </div>
          </div>
          {/* Data e hora */}
          <div className={styles.dateTimeRow}>
            {/* Calendário: escolha uma data (poderia suportar restrições como fromDate/toDate) */}
            <div className={styles.calendarWrap}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                // pode adicionar "fromDate"/"toDate" ou dias desabilitados
              />
            </div>

            {/* Lista de horários: botões desabilitados quando indisponíveis */}
            <div className={styles.timeList} aria-label="Horários disponíveis">
              {times.map((time: string) => {
                const disabled = !isAvailable(selectedDate, time);
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    className={`${styles.timeButton} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectTime(time)}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-label={`Horário ${time} ${
                      disabled
                        ? "indisponível"
                        : isSelected
                        ? "selecionado"
                        : ""
                    }`}
                  >
                    <Clock className={styles.timeIcon} size={16} />
                    <span className={styles.timeLabel}>{time}</span>
                  </button>
                );
              })}
            </div>
          </div>{" "}
          {/* Resumo / feedback (aria-live para leitores de tela) */}{" "}
          <div className={styles.summary} aria-live="polite" role="status">
            {successMessage ? (
              <strong>{successMessage}</strong>
            ) : selectedDate && selectedTime ? (
              <>
                <span>Agendando para: </span>
                <strong>
                  {selectedDate.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  às {selectedTime}
                </strong>
              </>
            ) : (
              <span>Selecione data e horário</span>
            )}
          </div>
          {/* Ações: cancelar fecha, confirmar envia (desabilitado até data+hora) */}
          <div className={styles.dialogActions}>
            <Dialog.Close asChild>
              <button type="button" className={styles.cancelButton}>
                Cancelar
              </button>
            </Dialog.Close>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || isSubmitting}
              aria-busy={isSubmitting}
              aria-disabled={!selectedDate || !selectedTime || isSubmitting}
            >
              {isSubmitting ? "Confirmando..." : "Confirmar"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import { useState } from "react";
import { Calendar, XIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

interface DateFilterProps {
  selectedDate?: Date;
  onChange: (date: Date | undefined) => void;
}

export const DateFilter = ({ selectedDate, onChange }: DateFilterProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <button
        className={`p-3 rounded-md border flex items-center gap-2 transition-colors cursor-pointer ${
          selectedDate
            ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
            : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        aria-label="Filtrar por data"
        title="Filtrar por data"
        onClick={() => setShowCalendar(true)}
      >
        <Calendar className="h-4 w-4" />
        {selectedDate && (
          <span className="text-sm">{format(selectedDate, "dd/MM/yyyy")}</span>
        )}
      </button>

      {showCalendar && (
        <>
          {/* Fundo escuro com blur */}
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
            onClick={() => setShowCalendar(false)}
          />

          {/* Calendário centralizado no mobile e desktop */}
          <div
            className={`
              fixed z-50 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg
              flex flex-col gap-4 items-start w-auto max-w-sm
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              rounded-lg
            `}
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                Selecione uma data
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    onChange(undefined);
                    setShowCalendar(false);
                  }}
                  className="text-xs text-emerald-500 cursor-pointer"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label="Fechar calendário"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="single"
              navLayout="around"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  const utcDate = new Date(
                    Date.UTC(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    )
                  );
                  onChange(utcDate);
                } else {
                  onChange(undefined);
                }
                setShowCalendar(false);
              }}
              locale={ptBR}
              formatters={{
                formatCaption: (date, options) => {
                  const formatted = format(date, "MMMM yyyy", {
                    locale: options?.locale,
                  });
                  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
                },
              }}
              classNames={{
                selected: "bg-emerald-500 text-white rounded-full",
                today: "text-emerald-100 dark:text-emerald-800",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

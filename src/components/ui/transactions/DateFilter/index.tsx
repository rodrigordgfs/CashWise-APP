"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
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
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="h-4 w-4" />
        {selectedDate && (
          <span className="text-sm">{format(selectedDate, "dd/MM/yyyy")}</span>
        )}
      </button>

      {showCalendar && (
        <div className="absolute z-50 top-14 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
              Selecione uma data
            </span>
            <button
              onClick={() => {
                onChange(undefined);
                setShowCalendar(false);
              }}
              className="text-xs text-emerald-500 cursor-pointer"
            >
              Limpar
            </button>
          </div>
          <DayPicker
            mode="single"
            navLayout="around"
            selected={selectedDate}
            onSelect={(date) => {
              onChange(date);
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
      )}
    </>
  );
};

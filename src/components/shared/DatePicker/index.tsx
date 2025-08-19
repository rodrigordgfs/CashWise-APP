"use client";

import { useState, useId, useRef, useEffect } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { XIcon } from "lucide-react";

interface DatePickerProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  error?: string;
  label?: string;
  placeholder?: string;
}

export const DatePicker = <TFormValues extends FieldValues>({
  field,
  error,
  label = "Data",
  placeholder = "Selecione a data",
}: DatePickerProps<TFormValues>) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!field.value) {
      setSelectedDate(undefined);
      return;
    }

    try {
      const [year, month, day] = field.value
        .split("T")[0]
        .split("-")
        .map(Number);
      const localDate = new Date(year, month - 1, day);
      if (isValid(localDate)) {
        setSelectedDate(localDate);
      } else {
        setSelectedDate(undefined);
      }
    } catch {
      setSelectedDate(undefined);
    }
  }, [field.value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        readOnly
        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600
          ${error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
        onClick={() => setShowCalendar((v) => !v)}
        value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
        placeholder={placeholder}
      />

      {showCalendar && (
        <>
          <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" />

          <div
            ref={calendarRef}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg p-4 w-[320px] max-w-full"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                Selecione uma data
              </span>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  className="text-xs text-emerald-500 cursor-pointer"
                  onClick={() => {
                    field.onChange("");
                    setShowCalendar(false);
                  }}
                >
                  Limpar
                </button>
                <button
                  type="button"
                  className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 text-sm cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
                  onClick={() => setShowCalendar(false)}
                  aria-label="Fechar calendário"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="single"
              navLayout="around"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  const localDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    12,
                    0,
                    0
                  );
                  const yyyy = localDate.getFullYear();
                  const mm = String(localDate.getMonth() + 1).padStart(2, "0");
                  const dd = String(localDate.getDate()).padStart(2, "0");
                  const formattedDate = `${yyyy}-${mm}-${dd}`;

                  field.onChange(formattedDate);
                } else {
                  field.onChange("");
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

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};
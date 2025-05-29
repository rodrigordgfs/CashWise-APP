"use client";

import { useState, useId, useRef, useEffect } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DatePickerFieldProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  error?: string;
  label?: string;
}

export function DatePickerField<TFormValues extends FieldValues>({
  field,
  error,
  label = "Data",
}: DatePickerFieldProps<TFormValues>) {
  const [showCalendar, setShowCalendar] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = field.value
    ? new Date(field.value as unknown as string)
    : undefined;

  // Fecha o calendário se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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
        placeholder="Selecione a data"
        // removido onBlur para não fechar imediatamente
      />

      {showCalendar && (
        <div className="absolute z-50 top-[calc(100%+0.25rem)] bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
              Selecione uma data
            </span>
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
          </div>
          <DayPicker
            mode="single"
            navLayout="around"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                field.onChange(date.toISOString().slice(0, 10));
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
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}

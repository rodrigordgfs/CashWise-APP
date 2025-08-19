"use client";

import { useState } from "react";
import { Calendar, XIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

interface DateRangeProps {
  selectedRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  labels: {
    filterByDate?: string;
    clear?: string;
    selectDate?: string;
    closeCalendar?: string;
  };
}

export const DateRange = ({ selectedRange, onChange, labels }: DateRangeProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatRange = (from?: Date, to?: Date) => {
    if (!from) return "";
    if (!to) return format(from, "dd/MM/yyyy");
    return `${format(from, "dd/MM/yyyy")} a ${format(to, "dd/MM/yyyy")}`;
  };

  return (
    <>
      <button
        className={`p-3 rounded-md border flex items-center gap-2 transition-colors cursor-pointer ${
          selectedRange?.from
            ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
            : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        aria-label={labels.filterByDate}
        title={labels.filterByDate}
        onClick={() => setShowCalendar(true)}
      >
        <Calendar className="h-4 w-4" />
        {selectedRange?.from && (
          <span className="text-sm">
            {formatRange(selectedRange.from, selectedRange.to)}
          </span>
        )}
      </button>

      {showCalendar && (
        <>
          <div
            data-testid="backdrop"
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
            onClick={() => setShowCalendar(false)}
          />

          <div
            data-testid="calendar-container"
            className="
              fixed z-50 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg
              flex flex-col gap-4 items-start w-auto max-w-sm
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              rounded-lg
            "
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                {labels.selectDate}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    onChange({ from: undefined, to: undefined });
                    setShowCalendar(false);
                  }}
                  className="text-xs text-emerald-500 cursor-pointer"
                >
                  {labels.clear}
                </button>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label={labels.closeCalendar}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={(range) => {
                if (range) {
                  onChange({
                    from: range.from ?? undefined,
                    to: range.to ?? undefined,
                  });
                }
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
                today:
                  "text-emerald-100 dark:text-white rounded-full bg-emerald-500",
                range_start: "bg-emerald-200 dark:bg-emerald-800 rounded-full",
                range_end: "bg-emerald-200 dark:bg-emerald-800 rounded-full",
                range_middle:
                  "bg-emerald-200 dark:bg-emerald-200 rounded-full text-emerald-800 dark:text-emerald-800",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

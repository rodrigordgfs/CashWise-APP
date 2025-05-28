import React, { useState, useEffect } from "react";

interface MonthYearPickerProps {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
}

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  fullWidth = false,
}) => {
  const today = new Date();

  const initialYear = selectedDate?.getFullYear() || today.getFullYear();
  const [year, setYear] = useState(initialYear);

  useEffect(() => {
    if (selectedDate) setYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const changeYear = (delta: number) => {
    setYear((prev) => prev + delta);
  };

  const isDisabled = (year: number, month: number) => {
    if (!minDate && !maxDate) return false;

    const date = new Date(year, month, 1);

    if (
      minDate &&
      date < new Date(minDate.getFullYear(), minDate.getMonth(), 1)
    ) {
      return true;
    }
    if (
      maxDate &&
      date > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`bg-white dark:bg-zinc-800 rounded-md border border-zinc-300 dark:border-zinc-700 shadow-lg p-4 ${
        fullWidth ? "w-full" : "max-w-xs"
      }`}
    >
      {/* Navegação do ano */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeYear(-1)}
          className="px-3 py-1 cursor-pointer rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
          aria-label="Ano anterior"
          type="button"
        >
          &lt;
        </button>
        <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
          {year}
        </span>
        <button
          onClick={() => changeYear(1)}
          className="px-3 py-1 cursor-pointer rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
          aria-label="Ano seguinte"
          type="button"
        >
          &gt;
        </button>
      </div>

      {/* Grade de meses */}
      <div className="grid grid-cols-3 gap-2">
        {monthNames.map((monthName, index) => {
          const disabled = isDisabled(year, index);
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === index;

          return (
            <button
              key={monthName}
              disabled={disabled}
              onClick={() => onChange(new Date(year, index, 1))}
              className={`py-2 rounded-md text-center cursor-pointer ${
                disabled
                  ? "text-zinc-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-emerald-100 dark:hover:bg-emerald-700"
              }`}
              type="button"
            >
              {monthName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

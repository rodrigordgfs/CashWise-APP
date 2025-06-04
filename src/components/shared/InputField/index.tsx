import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSettings } from "@/context/settingsContext";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string; // 'money', 'password', etc
  onChange?: (value: number | React.ChangeEvent<HTMLInputElement>) => void;
  headerRight?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, id, error, type = "text", onChange, value, headerRight, ...props },
    ref
  ) => {
    const { currency, language } = useSettings();
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const [moneyValue, setMoneyValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Memoize para não recriar a função a cada render
    const formatCurrency = useCallback(
      (num: number) => {
        if (isNaN(num) || num === null) return "";
        return new Intl.NumberFormat(language, {
          style: "currency",
          currency,
        }).format(num);
      },
      [currency, language]
    );

    const parseNumber = (str: string) => {
      if (!str) return 0;
      const onlyNumbers = str.replace(/[^\d,.-]/g, "").replace(",", ".");
      const parsed = parseFloat(onlyNumbers);
      return isNaN(parsed) ? 0 : parsed;
    };

    useEffect(() => {
      if (type === "money") {
        if (typeof value === "number") {
          setMoneyValue(formatCurrency(value));
        } else if (typeof value === "string") {
          const numeric = parseNumber(value);
          setMoneyValue(formatCurrency(numeric));
        }
      }
    }, [value, type, formatCurrency]);

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const onlyDigits = rawValue.replace(/\D/g, "");
      const numericValue = parseFloat(onlyDigits) / 100;
      setMoneyValue(formatCurrency(numericValue));
      if (onChange) {
        onChange(numericValue);
      }
    };

    const renderLabel = () => (
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
        </label>
        {headerRight && <div>{headerRight}</div>}
      </div>
    );

    if (type === "money") {
      return (
        <div>
          {renderLabel()}
          <input
            id={inputId}
            ref={ref}
            type="text"
            value={moneyValue}
            onChange={handleMoneyChange}
            placeholder={formatCurrency(0)}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
              error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
            }`}
            {...props}
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      );
    }

    if (type === "password") {
      return (
        <div>
          {renderLabel()}
          <div className="relative">
            <input
              id={inputId}
              ref={ref}
              type={showPassword ? "text" : "password"}
              value={value ?? ""}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              className={`w-full px-3 py-2 pr-10 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
                error
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-zinc-500 cursor-pointer hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-live="polite"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      );
    }

    return (
      <div>
        {renderLabel()}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value ?? ""}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
            error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
          }`}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

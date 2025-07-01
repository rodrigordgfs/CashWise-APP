import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string;
  onChange?: (value: number | React.ChangeEvent<HTMLInputElement>) => void;
  headerRight?: React.ReactNode;
  centerContent?: boolean;
  currency?: string;
  language?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      error,
      type = "text",
      onChange,
      value,
      headerRight,
      centerContent,
      maxLength,
      currency = "BRL",
      language = "pt-BR",
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const [moneyValue, setMoneyValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
      <div
        className={`flex mb-2 ${
          centerContent
            ? "flex-col items-center text-center gap-1"
            : "items-center justify-between"
        }`}
      >
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
        </label>
        {headerRight && <div>{headerRight}</div>}
      </div>
    );

    const baseInputClass = `w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
      error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
    } ${centerContent ? "text-center" : ""}`;

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
            className={baseInputClass}
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
              className={`${baseInputClass} pr-10`}
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

    if (type === "number") {
      return (
        <div>
          {renderLabel()}
          <input
            id={inputId}
            ref={ref}
            type="text" // use texto para controlar maxLength
            value={value ?? ""}
            maxLength={maxLength}
            onChange={(e) => {
              let val = e.target.value;
              // só permite dígitos
              val = val.replace(/[^0-9]/g, "");
              // aplica maxLength se definido
              if (maxLength && val.length > maxLength) {
                val = val.slice(0, maxLength);
              }
              // cria um evento de input com o valor filtrado
              const syntheticEvent = {
                ...e,
                target: {
                  ...e.target,
                  value: val,
                },
              } as React.ChangeEvent<HTMLInputElement>;

              if (onChange) {
                onChange(syntheticEvent);
              }
            }}
            className={baseInputClass}
            {...props}
          />
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
          className={baseInputClass}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

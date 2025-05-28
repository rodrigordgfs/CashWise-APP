import React, { useState, useEffect } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string; // vamos reconhecer 'money' aqui
  onChange?: (value: number | React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, type = "text", onChange, value, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

    const [moneyValue, setMoneyValue] = useState("");

    const isControlled = value !== undefined;

    useEffect(() => {
      if (type === "money") {
        if (typeof value === "number") {
          setMoneyValue(formatBRL(value));
        } else if (typeof value === "string") {
          const numeric = parseNumber(value);
          setMoneyValue(formatBRL(numeric));
        }
      }
    }, [value, type]);

    const formatBRL = (num: number) => {
      if (isNaN(num) || num === null) return "";
      return num.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    };

    const parseNumber = (str: string) => {
      if (!str) return 0;
      const onlyNumbers = str.replace(/[^\d,.-]/g, "").replace(",", ".");
      const parsed = parseFloat(onlyNumbers);
      return isNaN(parsed) ? 0 : parsed;
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const onlyDigits = rawValue.replace(/\D/g, "");
      const numericValue = parseFloat(onlyDigits) / 100;
      setMoneyValue(formatBRL(numericValue));
      if (onChange) {
        onChange(numericValue);
      }
    };

    if (type === "money") {
      return (
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium mb-2">
            {label}
          </label>
          <input
            id={inputId}
            ref={ref}
            type="text"
            value={isControlled ? moneyValue : moneyValue}
            onChange={handleMoneyChange}
            placeholder="R$ 0,00"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
              error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
            }`}
            {...props}
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      );
    }

    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
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

import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          {...props}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 ${
            error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

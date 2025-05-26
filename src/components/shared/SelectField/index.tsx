import React from "react";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const SelectField = ({
  label,
  options,
  id,
  ...props
}: SelectFieldProps) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        id={selectId}
        {...props}
        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

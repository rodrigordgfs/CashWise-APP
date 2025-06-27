import { useId } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
}

export const RadioGroup = ({
  name,
  label,
  value,
  options,
  onChange,
}: RadioGroupProps) => {
  const groupId = useId();

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}
      {options.map((option) => {
        const id = `${groupId}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-emerald-600 border-zinc-300 dark:border-zinc-700 focus:ring-emerald-500 dark:focus:ring-emerald-600"
            />
            <span className="text-sm capitalize">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  name: string;
  disabled?: boolean;
  onClick: () => void;
}

export const IconButton = ({
  icon: Icon,
  name,
  onClick,
  disabled,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={name}
      className="p-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon className="h-5 w-5" />
      <span className="sr-only">{name}</span>
    </button>
  );
};
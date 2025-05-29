"use client";

import { ArrowDownUp, ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";

interface SortButtonProps {
  sortOrder: "none" | "asc" | "desc";
  setSortOrder: (order: "none" | "asc" | "desc") => void;
}

export const SortButton = ({ sortOrder, setSortOrder }: SortButtonProps) => {
  const toggleSort = () => {
    setSortOrder(
      sortOrder === "none" ? "desc" : sortOrder === "desc" ? "asc" : "none"
    );
  };

  const iconProps = "h-4 w-4";
  const isActive = sortOrder !== "none";

  const buttonClasses = clsx(
    "p-3 rounded-md border flex items-center gap-2 transition-colors cursor-pointer",
    isActive
      ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
      : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
  );

  const renderIcon = () => {
    switch (sortOrder) {
      case "asc":
        return <ArrowUp className={iconProps} />;
      case "desc":
        return <ArrowDown className={iconProps} />;
      default:
        return <ArrowDownUp className={iconProps} />;
    }
  };

  return (
    <button
      onClick={toggleSort}
      className={buttonClasses}
      aria-label="Ordenar transações"
      title="Ordenar transações"
    >
      {renderIcon()}
      {isActive && (
        <span className="text-sm capitalize">
          {sortOrder === "asc" ? "Crescente" : "Decrescente"}
        </span>
      )}
    </button>
  );
};

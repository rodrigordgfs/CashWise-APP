import { ReactNode } from "react";

interface FilterCardProps {
  children?: ReactNode;
}

export const FilterCard = ({ children }: FilterCardProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6 pb-3">
        <h3 className="text-lg font-semibold">Filtros</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

import { Budget } from "@/types/Budge.type";
import { Edit, Trash } from "lucide-react";
import { parseISO, format } from "date-fns";

import { ptBR } from "date-fns/locale";

interface BudgetCardHeaderProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
  onDelete?: (budget: Budget) => void;
}

export const BudgetCardHeader = ({
  budget,
  onEdit,
  onDelete,
}: BudgetCardHeaderProps) => {
  console.log("BudgetCardHeader", budget);

  const date = budget.date ? parseISO(budget.date) : null;
  const isValidDate = date instanceof Date && !isNaN(date.getTime());

  return (
    <div className="p-6 pb-2">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium">{budget.category.name}</h3>
        <div className="flex gap-1">
          <button
            title="Editar orçamento"
            onClick={() => onEdit?.(budget)}
            className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 cursor-pointer"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            title="Excluir orçamento"
            onClick={() => onDelete?.(budget)}
            className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 cursor-pointer"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {isValidDate
          ? format(date, "MMMM 'de' yyyy", { locale: ptBR }).replace(
              /^./,
              (c) => c.toUpperCase()
            )
          : "Data inválida"}
      </p>
    </div>
  );
};

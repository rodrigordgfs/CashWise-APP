import { Budget } from "@/types/BudgeType";
import { Edit, Trash } from "lucide-react";

interface BudgetCardHeaderProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
  onDelete?: (budget: Budget) => void;
}

export const BudgetCardHeader = ({
  budget,
  onEdit,
  onDelete,
}: BudgetCardHeaderProps) => (
  <div className="p-6 pb-2">
    <div className="flex items-center justify-between">
      <h3 className="text-md font-medium">{budget.category}</h3>
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
      {new Date(budget.month).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })}
    </p>
  </div>
);

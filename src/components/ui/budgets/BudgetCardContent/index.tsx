import { Budget } from "@/types/Budge.type";
import { BudgetProgressBar } from "../BudgetProgressBar";
import { colorOptions } from "../../categories/CategoryModal";

interface BudgetCardContentProps {
  budget: Budget;
}

const formatBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const BudgetCardContent = ({ budget }: BudgetCardContentProps) => {
  const percentage = Math.round(
    ((budget.spent || 0) / (budget.limit || 0)) * 100
  );

  const categoryColor = budget.category?.color;
  const bgColorClass =
    categoryColor && colorOptions[categoryColor]
      ? colorOptions[categoryColor]
      : "bg-zinc-300";

  return (
    <div className="p-6 pt-0">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${bgColorClass}`}
          aria-label={`Ícone da categoria ${budget.category?.name}`}
        >
          {budget.category?.icon}
        </div>

        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gasto / Limite
          </p>
          <p className="font-medium">
            {formatBRL(budget.spent || 0)} / {formatBRL(budget.limit || 0)}
          </p>
        </div>
      </div>

      <BudgetProgressBar percentage={percentage} />
    </div>
  );
};

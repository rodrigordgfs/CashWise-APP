import { Budget } from "@/types/Budge.type";
import { Edit, Trash } from "lucide-react";
import { parseISO } from "date-fns";
import { useSettings } from "@/context/settingsContext";
import { formatDate } from "@/utils/formatDate";
import { useTranslation } from "react-i18next";

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
  const { language } = useSettings();
  const { t } = useTranslation();

  const date = budget.date ? parseISO(budget.date) : null;
  const isValidDate = date instanceof Date && !isNaN(date.getTime());

  return (
    <div className="p-6 pb-2">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium">{budget.category.name}</h3>
        <div className="flex gap-1">
          <button
            title={t("budgets.editBudget")}
            onClick={() => onEdit?.(budget)}
            className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 cursor-pointer"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            title={t("budgets.deleteBudget")}
            onClick={() => onDelete?.(budget)}
            className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 cursor-pointer"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {isValidDate
          ? formatDate(date, "MMMM 'de' yyyy", language)
          : t("budgets.invalidDate")}
      </p>
    </div>
  );
};

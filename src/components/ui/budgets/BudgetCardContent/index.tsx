import { Budget } from "@/types/Budge.type";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { colorOptions } from "../../categories/CategoryModal";
import { useSettings } from "@/context/settingsContext";
import { formatCurrency } from "@/utils/formatConvertCurrency";
import { useTranslation } from "react-i18next";

interface BudgetCardContentProps {
  budget: Budget;
}

export const BudgetCardContent = ({ budget }: BudgetCardContentProps) => {
  const { currency, language } = useSettings();
  const { t } = useTranslation();

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
            {t("budgets.spentLimit")}
          </p>
          <p className="font-medium">
            {formatCurrency(budget.spent || 0, currency, language)} /{" "}
            {formatCurrency(budget.limit || 0, currency, language)}
          </p>
        </div>
      </div>

      <ProgressBar percentage={percentage} />
    </div>
  );
};

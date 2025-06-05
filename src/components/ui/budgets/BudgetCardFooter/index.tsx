import { Budget } from "@/types/Budge.type";
import { useTranslation } from "react-i18next";

interface BudgetCardFooterProps {
  budget: Budget;
}

export const BudgetCardFooter = ({ budget }: BudgetCardFooterProps) => {
  const { t } = useTranslation();
  
  const percentage = Math.round(((budget.spent || 0) / budget.limit) * 100);
  const isWarning = percentage >= 80 && percentage < 100;
  const isDanger = percentage >= 100;

  return (
    <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
      {isDanger ? (
        <p className="text-sm text-red-500">{t("budgets.budgetLimiteExceeded")}</p>
      ) : isWarning ? (
        <p className="text-sm text-amber-500">{t("budgets.budgetCloseToLimit")}</p>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("budgets.withinBudget")}
        </p>
      )}
    </div>
  );
};

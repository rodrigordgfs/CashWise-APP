import { Budget } from "@/types/BudgeType";

interface BudgetCardFooterProps {
  budget: Budget;
}

export const BudgetCardFooter = ({ budget }: BudgetCardFooterProps) => {
  const percentage = Math.round((budget.spent / budget.limit) * 100);
  const isWarning = percentage >= 80 && percentage < 100;
  const isDanger = percentage >= 100;

  return (
    <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
      {isDanger ? (
        <p className="text-sm text-red-500">Você ultrapassou o limite!</p>
      ) : isWarning ? (
        <p className="text-sm text-amber-500">Você está próximo do limite!</p>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Dentro do orçamento
        </p>
      )}
    </div>
  );
};

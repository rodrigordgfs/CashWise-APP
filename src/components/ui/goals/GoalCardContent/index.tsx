import { ProgressBar } from "@/components/shared/ProgressBar";
import { useSettings } from "@/context/settingsContext";
import { Goal } from "@/types/Goal.type";
import { formatCurrency } from "@/utils/formatConvertCurrency";

interface GoalCardContentProps {
  goal: Goal;
}

export const GoalCardContent = ({ goal }: GoalCardContentProps) => {
  const { currency, language } = useSettings();
  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);

  return (
    <div className="p-6 pt-0">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-xl`}
          style={{ backgroundColor: goal.category.color }}
          aria-label={`Ícone da categoria ${goal.category.name}`}
        >
          {goal.category.icon}
        </div>

        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Progresso / Meta
          </p>
          <p className="font-medium">
            {formatCurrency(goal.currentAmount, currency, language)} /{" "}
            {formatCurrency(goal.targetAmount, currency, language)}
          </p>
        </div>
      </div>

      <ProgressBar percentage={percentage} />
    </div>
  );
};
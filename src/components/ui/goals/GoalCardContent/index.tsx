import { useSettings } from "@/context/settingsContext";
import { formatCurrency } from "@/utils/formatConvertCurrency";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: {
    id: string;
    name: string;
    type: string;
    icon: string;
    color: string;
  };
}

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

      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 mb-1">
        <div
          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-zinc-500 dark:text-zinc-400">
        {percentage}%
      </p>
    </div>
  );
};
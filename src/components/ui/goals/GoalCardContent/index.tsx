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

  const getProgressColor = () => {
    if (percentage <= 60) return "bg-emerald-500";
    if (percentage <= 80) return "bg-amber-500";
    return "bg-red-500";
  };

  const getProgressBackground = () => {
    if (percentage <= 60) return "bg-emerald-100 dark:bg-emerald-950";
    if (percentage <= 80) return "bg-amber-100 dark:bg-amber-950";
    return "bg-red-100 dark:bg-red-950";
  };

  const getTextColor = () => {
    if (percentage <= 60) return "text-emerald-500";
    if (percentage <= 80) return "text-amber-500";
    return "text-red-500";
  };

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

      <div className={`w-full ${getProgressBackground()} rounded-full h-2.5 mb-1`}>
        <div
          className={`${getProgressColor()} h-2.5 rounded-full transition-all duration-300 relative overflow-hidden`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <div 
            className="absolute inset-0 bg-white/20 animate-progress-wave"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              backgroundSize: '200% 100%',
              animation: 'progress-wave 2s infinite linear'
            }}
          />
        </div>
      </div>
      <p className={`text-right text-sm ${getTextColor()}`}>
        {percentage}%
      </p>
    </div>
  );
};
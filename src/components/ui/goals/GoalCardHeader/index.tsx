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

interface GoalCardHeaderProps {
  goal: Goal;
}

export const GoalCardHeader = ({ goal }: GoalCardHeaderProps) => {
  return (
    <div>
      <h3 className="text-md font-medium">{goal.title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {goal.description}
      </p>
    </div>
  );
};
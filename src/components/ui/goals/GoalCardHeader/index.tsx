import { Goal } from "@/types/Goal.type";

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
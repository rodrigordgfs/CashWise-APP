import { BudgetCardHeader } from "../BudgetCardHeader";
import { BudgetCardContent } from "../BudgetCardContent";
import { BudgetCardFooter } from "../BudgetCardFooter";
import { Budget } from "@/types/Budge.type";

interface BudgetCardProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
  onDelete?: (budget: Budget) => void;
}

export const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <BudgetCardHeader budget={budget} onEdit={onEdit} onDelete={onDelete} />
      <BudgetCardContent budget={budget} />
      <BudgetCardFooter budget={budget} />
    </div>
  );
};

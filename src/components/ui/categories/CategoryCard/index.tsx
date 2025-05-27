import { Edit, Trash } from "lucide-react";
import { Category } from "@/types/CategoryType";
import { colorOptions } from "../CategoryModal";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <h3 className="text-md font-medium">{category.name}</h3>
        <div className="flex gap-1">
          <button
            title="Editar categoria"
            onClick={() => onEdit?.(category)}
            className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 cursor-pointer transition-all"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            title="Excluir categoria"
            onClick={() => onDelete?.(category)}
            className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 cursor-pointer transition-all"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
              (category.color && colorOptions[category.color]) || "bg-zinc-300"
            }`}
          >
            {category.icon}
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Tipo</p>
            <p className="font-medium">
              {category.type === TransactionTypeFilter.Expense
                ? "Despesa"
                : "Receita"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

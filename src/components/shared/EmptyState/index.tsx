import { FileX2 } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "Nenhum dado encontrado",
  description = "Você ainda não adicionou nenhuma informação por aqui.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-6 shadow-sm">
        <FileX2 className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
      </div>

      <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
        {description}
      </p>
    </div>
  );
};

"use client";

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
    <div className="flex flex-col items-center justify-center mt-16 gap-2 text-center text-zinc-700 dark:text-zinc-300">
      <FileX2
        role="img"
        aria-label="Ícone de arquivo vazio"
        className="h-10 w-10 text-emerald-600 dark:text-emerald-400"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-xs text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
};

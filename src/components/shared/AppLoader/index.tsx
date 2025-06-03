"use client";

import { Loader2 } from "lucide-react";

export const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-4">
      <div className="p-6 rounded-2xl shadow-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 animate-fade-in">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Carregando...
          </span>
        </div>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Estamos preparando tudo para você.
        </p>
      </div>
    </div>
  );
};

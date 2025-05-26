"use client";

import { ArrowDownUp } from "lucide-react";

export const SortButton = () => (
  <button
    className="p-3 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    aria-label="Ordenar transações"
    title="Ordenar transações"
  >
    <ArrowDownUp className="h-4 w-4" />
  </button>
);

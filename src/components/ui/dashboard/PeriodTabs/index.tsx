import { Period, useTransaction } from "@/context/transactionsContext";

export const PeriodTabs = () => {
  const { period, setPeriod } = useTransaction();

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setPeriod(Period.WEEK)}
        className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
          period === Period.WEEK
            ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
      >
        Semana
      </button>
      <button
        onClick={() => setPeriod(Period.MONTH)}
        className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
          period === Period.MONTH
            ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
      >
        Mês
      </button>
      <button
        onClick={() => setPeriod(Period.YEAR)}
        className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
          period === Period.YEAR
            ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
      >
        Ano
      </button>
    </div>
  );
};

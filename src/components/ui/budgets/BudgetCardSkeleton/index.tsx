export const BudgetCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm animate-pulse">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="h-5 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded" />
          </div>
        </div>
        <div className="h-3 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded" />
            <div className="h-6 w-40 bg-zinc-300 dark:bg-zinc-700 rounded" />
          </div>
        </div>
        <div className="h-2 bg-zinc-300 dark:bg-zinc-700 rounded" />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
        <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
      </div>
    </div>
  );
};

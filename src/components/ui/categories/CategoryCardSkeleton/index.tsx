export const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm animate-pulse">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="flex gap-2">
          <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded" />
          <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded" />
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

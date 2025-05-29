"use client";

export function ReportsPageSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        <div className="h-10 w-32 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-6 space-y-4">
        <div className="h-5 w-24 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="h-10 w-full md:w-full rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-10 w-full md:w-[200px] rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6">
          <div className="h-5 w-40 mb-2 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-4 w-32 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div className="p-6 pt-0">
          <div className="h-[400px] w-full rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

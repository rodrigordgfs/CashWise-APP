"use client";

export function DashboardSkeleton() {
  return (
    <div className=" flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Título */}
      <div className="flex items-center justify-between ">
        <div className="h-10 w-48 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      </div>

      {/* Filtros */}
      <div className="flex space-x-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-8 w-20 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
        <div className="h-8 w-20 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
        <div className="h-8 w-20 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      </div>

      {/* Cards resumidos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-lg bg-zinc-300 dark:bg-zinc-700 animate-pulse"
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 h-[350px] rounded-lg bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
        <div className="lg:col-span-3 h-[350px] rounded-lg bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      </div>

      {/* Lista estilizada */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="h-6 w-48 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse mb-2" />
        <div className="h-4 w-64 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="py-2 flex items-center justify-between">
            <div className="h-8 w-full rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

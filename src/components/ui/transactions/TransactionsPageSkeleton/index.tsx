export const TransactionsPageSkeleton = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-pulse">
      {/* PageHeader Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-10 w-10 md:w-36 bg-zinc-300 dark:bg-zinc-700 rounded" />
      </div>

      {/* Filters Skeleton */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 pb-3">
          <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="p-6 space-y-4 lg:space-y-0 lg:flex lg:items-end lg:gap-4">
          <div className="flex-1 h-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex gap-2">
              <div className="h-10 w-36 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-10 bg-zinc-300 dark:bg-zinc-700 rounded" />
            </div>
            <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-6 bg-zinc-100 dark:bg-zinc-900">
                  <th className="p-2">
                    <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </th>
                  <th className="p-2">
                    <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </th>
                  <th className="p-2">
                    <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </th>
                  <th className="p-2">
                    <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </th>
                  <th className="p-2">
                    <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    {Array(5)
                      .fill(null)
                      .map((_, j) => (
                        <td key={j} className="p-3">
                          <div className="h-8 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

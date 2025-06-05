interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const isWarning = percentage >= 75 && percentage < 90;
  const isDanger = percentage >= 90;

  const progressBarBg = isDanger
    ? "bg-red-200 dark:bg-red-900"
    : isWarning
    ? "bg-amber-200 dark:bg-amber-900"
    : "bg-zinc-200 dark:bg-zinc-700";

  const progressFillColor = isDanger
    ? "bg-red-500"
    : isWarning
    ? "bg-amber-500"
    : "bg-emerald-500";

  const percentageTextColor = isDanger
    ? "text-red-500"
    : isWarning
    ? "text-amber-500"
    : "text-zinc-500 dark:text-zinc-400";

  return (
    <>
      <div className={`w-full rounded-full h-2 ${progressBarBg}`}>
        <div
          className={`h-2 rounded-full transition-all duration-300 ${progressFillColor}`}
          // Inline style usado aqui por necessidade de valor dinâmico baseado em lógica de negócio

          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <p className={`text-right text-sm mt-1 ${percentageTextColor}`}>
        {percentage}%
      </p>
    </>
  );
};

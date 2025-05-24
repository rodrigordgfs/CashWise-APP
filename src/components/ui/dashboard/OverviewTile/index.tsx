import { LucideIcon } from "lucide-react";
import { AnimatedNumber } from "../AnimatedNumber";

interface OverviewTileProps {
  title: string;
  value: number;
  icon?: LucideIcon;
  valueColor?: string;
  prefix?: string;
}

export const OverviewTile = ({
  title,
  value,
  icon: Icon,
  valueColor,
  prefix = "R$",
}: OverviewTileProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="flex items-center justify-between p-4 pb-2">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        {Icon && <Icon className={valueColor + " h-4 w-4"} />}
      </div>
      <div className="p-4 pt-0">
        <p className={`text-2xl font-bold ${valueColor ?? ""}`}>
          <AnimatedNumber value={value} prefix={prefix} />
        </p>
      </div>
    </div>
  );
};

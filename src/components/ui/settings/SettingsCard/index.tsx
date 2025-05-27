import { ReactNode } from "react";

export const SettingCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
    <div className="p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
    <div className="p-6 pt-0">{children}</div>
  </div>
);

"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { BalanceReport } from "@/types/Report.type";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";

interface BalanceEvolutionChartProps {
  data: BalanceReport[];
}

export const BalanceEvolutionChart = ({ data }: BalanceEvolutionChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {t("reports.balanceEvolution")}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("reports.balanceEvolutionDescription")}
        </p>
      </div>
      {data.length === 0 ? (
        <div className="p-6 pt-0 text-center text-sm text-zinc-500">
          <EmptyState
            title={t("reports.balanceEvolutionNoData")}
            description={t("reports.balanceEvolutionNoDataDescription")}
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="balance"
              name={t("reports.balance")}
              stroke="#00BC7D"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

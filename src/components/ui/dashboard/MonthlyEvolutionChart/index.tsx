"use client";

import { MonthlyReport } from "@/types/Report.type";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

interface MonthlyEvolutionChartProps {
  data: MonthlyReport[];
}

export const MonthlyEvolutionChart = ({ data }: MonthlyEvolutionChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {t("dashboard.monthlyEvolution")}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("dashboard.receptVsExpense")}
        </p>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

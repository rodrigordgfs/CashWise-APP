"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { MonthlyReport } from "@/types/Report.type";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeVsExpensesChartProps {
  data: MonthlyReport[];
}

export const IncomeVsExpensesChart = ({ data }: IncomeVsExpensesChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {t("reports.incomeVsExpense")}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("reports.incomeVsExpenseDescription")}
        </p>
      </div>
      {data.length === 0 ? (
        <div className="p-6 pt-0 text-center text-sm text-zinc-500">
          <EmptyState
            title={t("reports.incomeVsExpenseNoData")}
            description={t("reports.incomeVsExpenseNoDataDescription")}
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="income" name={t("reports.income")} fill="#22c55e" />
            <Bar dataKey="expense" name={t("reports.expense")} fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

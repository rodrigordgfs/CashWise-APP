"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyData {
  name: string;
  receitas: number;
  despesas: number;
}

interface IncomeVsExpensesChartProps {
  data: MonthlyData[];
}

export const IncomeVsExpensesChart = ({ data }: IncomeVsExpensesChartProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Receitas vs Despesas</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Comparativo mensal
        </p>
      </div>
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="receitas" name="Receitas" fill="#22c55e" />
            <Bar dataKey="despesas" name="Despesas" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

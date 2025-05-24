"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

interface MonthlyData {
  name: string;
  receitas: number;
  despesas: number;
}

interface MonthlyEvolutionChartProps {
  data: MonthlyData[];
}

export const MonthlyEvolutionChart = ({ data }: MonthlyEvolutionChartProps) => {
  return (
    <div className="lg:col-span-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Evolução Mensal</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Receitas vs Despesas
        </p>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="receitas"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

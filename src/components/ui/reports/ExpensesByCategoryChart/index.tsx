"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  fill: string;
}

interface ExpensesByCategoryChartProps {
  data: CategoryData[];
}

export const ExpensesByCategoryChart = ({
  data,
}: ExpensesByCategoryChartProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Despesas por Categoria</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Distribuição de gastos
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-col items-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

"use client";

import { CategoryReport } from "@/types/Report.type";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface ExpensesByCategoryChartProps {
  data: CategoryReport[];
}

export const ExpensesByCategoryChart = ({
  data,
}: ExpensesByCategoryChartProps) => {
  console.log("ExpensesByCategoryChart data:", data);

  return (
    <div className="lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Despesas por Categoria</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Distribuição de gastos
        </p>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.fill ||
                    `#${Math.floor(Math.random() * 16777215).toString(16)}`
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

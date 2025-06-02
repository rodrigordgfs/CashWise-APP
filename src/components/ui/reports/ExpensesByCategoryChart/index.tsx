"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryReport } from "@/types/Report.type";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface ExpensesByCategoryChartProps {
  data: CategoryReport[];
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
      {data.length === 0 ? (
        <div className="p-6 pt-0 text-center text-sm text-zinc-500">
          <EmptyState
            title="Nenhum dado disponível para o período selecionado."
            description="Tente alterar o período ou adicionar transações."
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

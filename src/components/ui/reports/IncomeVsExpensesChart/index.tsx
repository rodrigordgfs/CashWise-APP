"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { MonthlyReport } from "@/types/Report.type";
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
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Receitas vs Despesas</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Comparativo mensal
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
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="income" name="Receitas" fill="#22c55e" />
            <Bar dataKey="expense" name="Despesas" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

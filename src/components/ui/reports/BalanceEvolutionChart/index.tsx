"use client";

import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";

interface BalanceData {
  name: string;
  saldo: number;
}

interface BalanceEvolutionChartProps {
  data: BalanceData[];
}

export const BalanceEvolutionChart = ({ data }: BalanceEvolutionChartProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Evolução do Saldo</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Saldo ao final de cada mês
        </p>
      </div>
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="saldo"
              name="Saldo"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

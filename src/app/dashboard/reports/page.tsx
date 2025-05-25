"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

// Dados de exemplo
const monthlyData = [
  { name: "Jan", receitas: 4000, despesas: 2400 },
  { name: "Fev", receitas: 3000, despesas: 1398 },
  { name: "Mar", receitas: 2000, despesas: 9800 },
  { name: "Abr", receitas: 2780, despesas: 3908 },
  { name: "Mai", receitas: 1890, despesas: 4800 },
  { name: "Jun", receitas: 2390, despesas: 3800 },
]

const categoryData = [
  { name: "Alimentação", value: 2400, fill: "#0ea5e9" },
  { name: "Moradia", value: 4500, fill: "#f97316" },
  { name: "Transporte", value: 1200, fill: "#8b5cf6" },
  { name: "Lazer", value: 800, fill: "#22c55e" },
  { name: "Saúde", value: 1500, fill: "#ef4444" },
]

const balanceData = [
  { name: "Jan", saldo: 1600 },
  { name: "Fev", saldo: 3202 },
  { name: "Mar", saldo: -4600 },
  { name: "Abr", saldo: -1128 },
  { name: "Mai", saldo: -2910 },
  { name: "Jun", saldo: -1410 },
]

export default function ReportsPage() {
  const [period, setPeriod] = useState("6months")
  const [reportType, setReportType] = useState("income-expense")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
        <button className="flex items-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </button>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setReportType("income-expense")}
                  className={`px-4 py-2 text-sm font-medium ${
                    reportType === "income-expense"
                      ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  Receitas vs Despesas
                </button>
                <button
                  onClick={() => setReportType("categories")}
                  className={`px-4 py-2 text-sm font-medium ${
                    reportType === "categories"
                      ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  Categorias
                </button>
                <button
                  onClick={() => setReportType("balance")}
                  className={`px-4 py-2 text-sm font-medium ${
                    reportType === "balance"
                      ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  Saldo
                </button>
              </div>
            </div>
            <div className="w-full md:w-[200px]">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
              >
                <option value="1month">Último mês</option>
                <option value="3months">Últimos 3 meses</option>
                <option value="6months">Últimos 6 meses</option>
                <option value="1year">Último ano</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {reportType === "income-expense" && (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Receitas vs Despesas</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Comparativo mensal</p>
            </div>
            <div className="p-6 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Bar dataKey="receitas" name="Receitas" fill="#22c55e" />
                  <Bar dataKey="despesas" name="Despesas" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reportType === "categories" && (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Despesas por Categoria</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Distribuição de gastos</p>
            </div>
            <div className="p-6 pt-0 flex flex-col items-center">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reportType === "balance" && (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Evolução do Saldo</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Saldo ao final de cada mês</p>
            </div>
            <div className="p-6 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={balanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

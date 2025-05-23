"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, Plus } from "lucide-react"
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

const recentTransactions = [
  { id: 1, description: "Supermercado", amount: -250, date: "2025-05-18", category: "Alimentação" },
  { id: 2, description: "Salário", amount: 5000, date: "2025-05-15", category: "Receita" },
  { id: 3, description: "Aluguel", amount: -1200, date: "2025-05-10", category: "Moradia" },
  { id: 4, description: "Restaurante", amount: -85, date: "2025-05-08", category: "Alimentação" },
  { id: 5, description: "Uber", amount: -25, date: "2025-05-07", category: "Transporte" },
]

export default function DashboardPage() {
  const [period, setPeriod] = useState("month")

  // Calcular saldos
  const totalIncome = 5000
  const totalExpenses = 2760
  const balance = totalIncome - totalExpenses

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setPeriod("week")}
            className={`px-4 py-2 text-sm font-medium ${
              period === "week"
                ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod("month")}
            className={`px-4 py-2 text-sm font-medium ${
              period === "month"
                ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={`px-4 py-2 text-sm font-medium ${
              period === "year"
                ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Ano
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex flex-row items-center justify-between p-4 pb-2">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Saldo Atual</p>
            </div>
            <div className="p-4 pt-0">
              <p className="text-2xl font-bold">R$ {balance.toFixed(2)}</p>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex flex-row items-center justify-between p-4 pb-2">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Receitas</p>
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
            </div>
            <div className="p-4 pt-0">
              <p className="text-2xl font-bold text-green-500">R$ {totalIncome.toFixed(2)}</p>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex flex-row items-center justify-between p-4 pb-2">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Despesas</p>
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
            </div>
            <div className="p-4 pt-0">
              <p className="text-2xl font-bold text-red-500">R$ {totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Evolução Mensal</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Receitas vs Despesas</p>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="receitas" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Despesas por Categoria</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição de gastos</p>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Transações Recentes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Suas últimas 5 transações</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

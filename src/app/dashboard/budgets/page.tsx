"use client"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"

// Dados de exemplo
const budgets = [
  { id: 1, category: "Alimentação", icon: "🍔", color: "#0ea5e9", limit: 800, spent: 650, month: "2025-05" },
  { id: 2, category: "Moradia", icon: "🏠", color: "#f97316", limit: 1500, spent: 1200, month: "2025-05" },
  { id: 3, category: "Transporte", icon: "🚗", color: "#8b5cf6", limit: 400, spent: 250, month: "2025-05" },
  { id: 4, category: "Lazer", icon: "🎮", color: "#22c55e", limit: 300, spent: 280, month: "2025-05" },
  { id: 5, category: "Saúde", icon: "💊", color: "#ef4444", limit: 500, spent: 150, month: "2025-05" },
]

const categories = [
  { id: 1, name: "Alimentação", type: "expense", icon: "🍔" },
  { id: 2, name: "Moradia", type: "expense", icon: "🏠" },
  { id: 3, name: "Transporte", type: "expense", icon: "🚗" },
  { id: 4, name: "Lazer", type: "expense", icon: "🎮" },
  { id: 5, name: "Saúde", type: "expense", icon: "💊" },
  { id: 6, name: "Educação", type: "expense", icon: "📚" },
]

export default function BudgetsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orçamentos</h2>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Orçamento
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.limit) * 100)
          const isWarning = percentage >= 80 && percentage < 100
          const isDanger = percentage >= 100

          return (
            <div
              key={budget.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm"
            >
              <div className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium">{budget.category}</h3>
                  <div className="flex gap-1">
                    <button className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(budget.month).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                    style={{ backgroundColor: budget.color }}
                  >
                    {budget.icon}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Gasto / Limite</p>
                    <p className="font-medium">
                      R$ {budget.spent.toFixed(2)} / R$ {budget.limit.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className={`w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 ${isDanger ? "bg-red-200 dark:bg-red-900" : isWarning ? "bg-amber-200 dark:bg-amber-900" : ""}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isDanger ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <p
                  className={`text-right text-sm mt-1 ${
                    isDanger ? "text-red-500" : isWarning ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {percentage}%
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-zinc-200 dark:border-zinc-800">
                {isDanger ? (
                  <p className="text-sm text-red-500">Você ultrapassou o limite!</p>
                ) : isWarning ? (
                  <p className="text-sm text-amber-500">Você está próximo do limite!</p>
                ) : (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Dentro do orçamento</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal para adicionar orçamento */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Novo Orçamento</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Defina um limite de gastos para uma categoria
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600">
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Limite</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mês</label>
                  <input
                    type="month"
                    defaultValue="2025-05"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

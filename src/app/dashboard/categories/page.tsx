"use client"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"

// Dados de exemplo
const categories = [
  { id: 1, name: "Alimentação", type: "expense", color: "#0ea5e9", icon: "🍔" },
  { id: 2, name: "Moradia", type: "expense", color: "#f97316", icon: "🏠" },
  { id: 3, name: "Transporte", type: "expense", color: "#8b5cf6", icon: "🚗" },
  { id: 4, name: "Lazer", type: "expense", color: "#22c55e", icon: "🎮" },
  { id: 5, name: "Saúde", type: "expense", color: "#ef4444", icon: "💊" },
  { id: 6, name: "Educação", type: "expense", color: "#06b6d4", icon: "📚" },
  { id: 7, name: "Salário", type: "income", color: "#10b981", icon: "💰" },
  { id: 8, name: "Freelance", type: "income", color: "#6366f1", icon: "💻" },
  { id: 9, name: "Investimentos", type: "income", color: "#f59e0b", icon: "📈" },
]

const icons = ["💰", "🏠", "🚗", "🍔", "🎮", "💊", "📚", "💻", "📈", "🛒", "✈️", "👕", "💡", "📱", "🎁"]

export default function CategoriesPage() {
  const [categoryType, setCategoryType] = useState("expense")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#0ea5e9")
  const [selectedIcon, setSelectedIcon] = useState("💰")

  // Filtrar categorias por tipo
  const filteredCategories = categories.filter((category) =>
    categoryType === "all" ? true : category.type === categoryType,
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </button>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        <div className="p-6">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setCategoryType("all")}
              className={`px-4 py-2 text-sm font-medium ${
                categoryType === "all"
                  ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setCategoryType("expense")}
              className={`px-4 py-2 text-sm font-medium ${
                categoryType === "expense"
                  ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Despesas
            </button>
            <button
              onClick={() => setCategoryType("income")}
              className={`px-4 py-2 text-sm font-medium ${
                categoryType === "income"
                  ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Receitas
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm"
          >
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-md font-medium">{category.name}</h3>
              <div className="flex gap-1">
                <button className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Tipo</p>
                  <p className="font-medium">{category.type === "expense" ? "Despesa" : "Receita"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para adicionar categoria */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Nova Categoria</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Crie uma nova categoria para organizar suas transações
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600">
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    placeholder="Ex: Alimentação"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cor</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "#0ea5e9",
                      "#f97316",
                      "#8b5cf6",
                      "#22c55e",
                      "#ef4444",
                      "#06b6d4",
                      "#10b981",
                      "#6366f1",
                      "#f59e0b",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`h-8 w-8 rounded-full ${selectedColor === color ? "ring-2 ring-offset-2 ring-emerald-500" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ícone</label>
                  <div className="flex flex-wrap gap-2">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        className={`flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 ${selectedIcon === icon ? "ring-2 ring-emerald-500" : ""}`}
                        onClick={() => setSelectedIcon(icon)}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
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

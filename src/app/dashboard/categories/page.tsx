"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/shared/Tabs";
import { CategoryList } from "@/components/ui/categories/CategoryList";
import { Category } from "@/types/CategoryType";
import { CategoryModal } from "@/components/ui/categories/CategoryModal";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

// Dados de exemplo
const categories: Category[] = [
  {
    id: 1,
    name: "Alimentação",
    type: TransactionTypeFilter.Expense,
    color: "#0ea5e9",
    icon: "🍔",
  },
  {
    id: 2,
    name: "Moradia",
    type: TransactionTypeFilter.Expense,
    color: "#f97316",
    icon: "🏠",
  },
  {
    id: 3,
    name: "Transporte",
    type: TransactionTypeFilter.Expense,
    color: "#8b5cf6",
    icon: "🚗",
  },
  {
    id: 4,
    name: "Lazer",
    type: TransactionTypeFilter.Expense,
    color: "#22c55e",
    icon: "🎮",
  },
  {
    id: 5,
    name: "Saúde",
    type: TransactionTypeFilter.Expense,
    color: "#ef4444",
    icon: "💊",
  },
  {
    id: 6,
    name: "Educação",
    type: TransactionTypeFilter.Expense,
    color: "#06b6d4",
    icon: "📚",
  },
  {
    id: 7,
    name: "Salário",
    type: TransactionTypeFilter.Income,
    color: "#10b981",
    icon: "💰",
  },
  {
    id: 8,
    name: "Freelance",
    type: TransactionTypeFilter.Income,
    color: "#6366f1",
    icon: "💻",
  },
  {
    id: 9,
    name: "Investimentos",
    type: TransactionTypeFilter.Income,
    color: "#f59e0b",
    icon: "📈",
  },
];

const categoriesTabs = [
  { label: "Todas", value: TransactionTypeFilter.All },
  { label: "Despesas", value: TransactionTypeFilter.Expense },
  { label: "Receitas", value: TransactionTypeFilter.Income },
];

export default function CategoriesPage() {
  const [categoryType, setCategoryType] = useState("expense");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredCategories = categories.filter((category) =>
    categoryType === TransactionTypeFilter.All
      ? true
      : category.type === categoryType
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Categorias"
        actionIcon={Plus}
        actionTitle="Nova Categoria"
        onActionClick={() => setIsAddDialogOpen(true)}
      />

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        <div className="p-6">
          <Tabs
            tabs={categoriesTabs}
            selectedValue={categoryType}
            onChange={setCategoryType}
          />
        </div>
      </div>

      <CategoryList
        categories={filteredCategories}
        onEdit={(category) => console.log("Editar", category)}
        onDelete={(category) => console.log("Excluir", category)}
      />

      {isAddDialogOpen && (
        <CategoryModal
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={(newCategory) => {
            console.log("Nova categoria:", newCategory);
            setIsAddDialogOpen(false);
          }}
          initialData={null}
        />
      )}
    </div>
  );
}

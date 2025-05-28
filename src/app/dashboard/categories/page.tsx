"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/shared/Tabs";
import { CategoryList } from "@/components/ui/categories/CategoryList";
import { Category } from "@/types/CategoryType";
import { CategoryModal } from "@/components/ui/categories/CategoryModal";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

const categoriesTabs = [
  { label: "Todas", value: TransactionTypeFilter.All },
  { label: "Despesas", value: TransactionTypeFilter.Expense },
  { label: "Receitas", value: TransactionTypeFilter.Income },
];

export default function CategoriesPage() {
  const [categoryType, setCategoryType] = useState("expense");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredCategories = categories.filter((category) =>
    categoryType === TransactionTypeFilter.All
      ? true
      : category.type === categoryType
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Categorias"
        actionIcon={Plus}
        actionTitle="Nova Categoria"
        onActionClick={() => setIsAddDialogOpen(true)}
        actionDisabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
      </div>

      <CategoryList
        categories={filteredCategories}
        isLoading={isLoading}
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

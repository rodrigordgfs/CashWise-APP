"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/shared/Tabs";
import { CategoryList } from "@/components/ui/categories/CategoryList";
import { CategoryModal } from "@/components/ui/categories/CategoryModal";
import { Category } from "@/types/CategoryType";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const categoriesTabs = [
  { label: "Todas", value: TransactionTypeFilter.All },
  { label: "Despesas", value: TransactionTypeFilter.Expense },
  { label: "Receitas", value: TransactionTypeFilter.Income },
];

export default function CategoriesPage() {
  const [categoryType, setCategoryType] = useState("expense");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

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

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleSave = (savedCategory: Category) => {
    if (categoryToEdit) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryToEdit.id ? { ...cat, ...savedCategory } : cat
        )
      );
    } else {
      setCategories((prev) => [...prev, savedCategory]);
    }
    setIsModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleDelete = async (category: Category) => {
    setIsLoading(true);

    const response = await fetch(`/api/categories/${category?.id}`, {
      method: "DELETE",
    });

    setIsLoading(false);

    if (!response.ok) {
      toast.error("Erro ao excluir categoria");
      return;
    }

    await response.json();
    setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    toast.success("Categoria excluída com sucesso!");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Categorias"
        actionIcon={Plus}
        actionTitle="Nova Categoria"
        onActionClick={handleAddNew}
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
        onEdit={handleEdit}
        onDelete={(category) => {
          handleDelete(category);
        }}
      />

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCategoryToEdit(null);
          }}
          onSave={handleSave}
          initialData={categoryToEdit ?? null}
        />
      )}
    </div>
  );
}

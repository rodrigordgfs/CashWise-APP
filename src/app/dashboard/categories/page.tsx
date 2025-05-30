"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/shared/Tabs";
import { CategoryList } from "@/components/ui/categories/CategoryList";
import { CategoryModal } from "@/components/ui/categories/CategoryModal";
import { useCategory } from "@/context/categoryContext";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const {
    categoryType,
    setCategoryType,
    filteredCategories,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    openModalToCreate,
    openModalToEdit,
    saveCategory,
    deleteCategory,
    categoryToEdit,
    setCategoryToEdit,
    categoriesTabs,
  } = useCategory();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Categorias"
        actionIcon={Plus}
        actionTitle="Nova Categoria"
        onActionClick={openModalToCreate}
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
        onEdit={openModalToEdit}
        onDelete={deleteCategory}
      />

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCategoryToEdit(null);
          }}
          onSave={saveCategory}
          initialData={categoryToEdit ?? null}
        />
      )}
    </div>
  );
}

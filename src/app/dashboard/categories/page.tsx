"use client";

import { FilterCard } from "@/components/shared/FilterCard";
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

      <FilterCard>
        <Tabs
          tabs={categoriesTabs}
          selectedValue={categoryType}
          onChange={setCategoryType}
          disabled={isLoading}
        />
      </FilterCard>

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

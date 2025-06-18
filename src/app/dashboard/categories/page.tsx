"use client";

import { FilterCard } from "shinodalabs-ui";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "shinodalabs-ui";
import { CategoryList } from "@/components/ui/categories/CategoryList";
import { CategoryModal } from "@/components/ui/categories/CategoryModal";
import { useCategory } from "@/context/categoryContext";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={t("categories.title")}
        actionIcon={Plus}
        actionTitle={t("categories.newCategory")}
        onActionClick={openModalToCreate}
        actionDisabled={isLoading}
      />

      <FilterCard title={t("categories.filters")}>
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

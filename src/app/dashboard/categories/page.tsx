"use client";

import { FilterCard } from "@/components/shared/FilterCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import { Tabs } from "@/components/shared/Tabs";
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
    page,
    setPage,
    perPage,
    setPerPage,
    totalItems,
    totalPages,
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

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={setPerPage}
        labels={{
          previous: t("app.pagination.previous"),
          next: t("app.pagination.next"),
          showing: t("app.pagination.showing"),
          of: t("app.pagination.of"),
          results: t("app.pagination.results"),
          page: t("app.pagination.page"),
          itemsPerPage: t("app.pagination.itemsPerPage"),
        }}
        optionsItemsPerPage={[
          { label: `16 ${t("app.pagination.itemsPerPage")}`, value: "16" },
          { label: `32 ${t("app.pagination.itemsPerPage")}`, value: "32" },
          { label: `100 ${t("app.pagination.itemsPerPage")}`, value: "100" },
        ]}
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

"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetCard } from "@/components/ui/budgets/BudgetCard";
import { BudgetModal } from "@/components/ui/budgets/BudgetModal";
import { BudgetCardSkeleton } from "@/components/ui/budgets/BudgetCardSkeleton";
import { Budget } from "@/types/Budge.type";
import { useBudget } from "@/context/budgetContext";

export default function BudgetsPage() {
  const {
    isLoading,
    budgets,
    categories,
    editingBudget,
    isModalOpen,
    setIsModalOpen,
    openModalToCreate,
    openModalToEdit,
    saveBudget,
    handleDelete,
    setEditingBudget,
  } = useBudget();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Orçamentos"
        actionIcon={Plus}
        actionTitle="Novo Orçamento"
        onActionClick={openModalToCreate}
        actionDisabled={isLoading}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <BudgetCardSkeleton key={i} />
            ))
          : budgets.map((budget: Budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onEdit={() => openModalToEdit(budget)}
                onDelete={() => handleDelete(budget)}
              />
            ))}
      </div>

      {isModalOpen && (
        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBudget(null);
          }}
          onSave={saveBudget}
          categories={categories}
          initialData={editingBudget ?? undefined}
        />
      )}
    </div>
  );
}

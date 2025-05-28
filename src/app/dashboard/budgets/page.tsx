"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetCard } from "@/components/ui/budgets/BudgetCard";
import { BudgetModal } from "@/components/ui/budgets/BudgetModal";
import { Budget } from "@/types/BudgeType";
import { Category } from "@/types/CategoryType";
import { BudgetCardSkeleton } from "@/components/ui/budgets/BudgetCardSkeleton";

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, budgetsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/budgets"),
        ]);

        if (!categoriesRes.ok || !budgetsRes.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const [categoriesData, budgetsData] = await Promise.all([
          categoriesRes.json(),
          budgetsRes.json(),
        ]);

        setCategories(categoriesData);
        setBudgets(budgetsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Orçamentos"
        actionIcon={Plus}
        actionTitle="Novo Orçamento"
        onActionClick={() => setIsModalOpen(true)}
        actionDisabled={isLoading}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <BudgetCardSkeleton key={i} />
            ))
          : budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onEdit={(b) => console.log("Editar", b)}
                onDelete={(b) => console.log("Excluir", b)}
              />
            ))}
      </div>

      {isModalOpen && (
        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => {
            console.log("Salvar novo orçamento", data);
            setIsModalOpen(false);
          }}
          categories={categories}
        />
      )}
    </div>
  );
}

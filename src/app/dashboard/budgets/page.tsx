"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetCard } from "@/components/ui/budgets/BudgetCard";
import { BudgetModal } from "@/components/ui/budgets/BudgetModal";
import { Budget } from "@/types/BudgeType";
import { Category } from "@/types/CategoryType";
import { BudgetCardSkeleton } from "@/components/ui/budgets/BudgetCardSkeleton";
import { toast } from "sonner";

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

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

  const openModalToCreate = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const saveBudget = async (data: {
    id?: number;
    category: string;
    limit: number;
    month: string;
  }) => {
    try {
      const url = data.id ? `/api/budgets/${data.id}` : "/api/budgets";
      const method = data.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar orçamento");
      }

      const saved = await res.json();
      toast.success(
        data.id
          ? "Orçamento atualizado com sucesso!"
          : "Orçamento criado com sucesso!"
      );
      setIsModalOpen(false);
      return saved;
    } catch (error) {
      console.error("Erro no saveBudget:", error);
      throw error;
    }
  };

  // Função para deletar orçamento
  const handleDelete = async (budget: Budget) => {
    try {
      const res = await fetch(`/api/budgets/${budget.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar orçamento");
      }

      toast.success("Orçamento excluído com sucesso!");
      setBudgets((prev) => prev.filter((b) => b.id !== budget.id));
    } catch (error) {
      console.error("Erro ao excluir orçamento:", error);
      toast.error("Não foi possível excluir o orçamento.");
    }
  };

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
          : budgets.map((budget) => (
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
          onSave={(data) => {
            saveBudget(data)
              .then((savedBudget) => {
                setBudgets((prev) => {
                  if (data.id) {
                    return prev.map((b) =>
                      b.id === data.id ? savedBudget : b
                    );
                  }
                  return [...prev, savedBudget];
                });
                setIsModalOpen(false);
                setEditingBudget(null);
              })
              .catch((error) => {
                console.error("Erro ao salvar orçamento:", error);
                setIsModalOpen(false);
                setEditingBudget(null);
              });
          }}
          categories={categories}
          initialData={editingBudget ?? undefined}
        />
      )}
    </div>
  );
}

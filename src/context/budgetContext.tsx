"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import { Budget } from "@/types/Budge.type";
import { Category } from "@/types/Category.type";

interface BudgetContextProps {
  isLoading: boolean;
  budgets: Budget[];
  categories: Category[];
  editingBudget: Budget | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModalToCreate: () => void;
  openModalToEdit: (budget: Budget) => void;
  saveBudget: (data: {
    id?: number;
    category: string;
    limit: number;
    month: string;
  }) => Promise<Budget | undefined>;
  handleDelete: (budget: Budget) => Promise<void>;
  setEditingBudget: (budget: Budget | null) => void;
}

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
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

  const openModalToCreate = useCallback(() => {
    setEditingBudget(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  }, []);

  const saveBudget = useCallback(
    async (data: {
      id?: number;
      category: string;
      limit: number;
      month: string;
    }): Promise<Budget | undefined> => {
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

        setBudgets((prev) => {
          if (data.id) {
            return prev.map((b) => (b.id === data.id ? saved : b));
          }
          return [...prev, saved];
        });

        setIsModalOpen(false);
        setEditingBudget(null);

        return saved;
      } catch (error) {
        console.error("Erro no saveBudget:", error);
        throw error;
      }
    },
    []
  );

  const handleDelete = useCallback(async (budget: Budget) => {
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
  }, []);

  // useMemo para memoizar o valor do contexto
  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextProps => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};

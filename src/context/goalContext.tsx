"use client";

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
import { Goal } from "@/types/Goal.type";
import { Category } from "@/types/Category.type";
import { useCategory } from "./categoryContext";
import { useUser } from "@clerk/nextjs";

interface GoalContextProps {
  isLoading: boolean;
  goals: Goal[];
  categories: Category[];
  editingGoal: Goal | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModalToCreate: () => void;
  openModalToEdit: (goal: Goal) => void;
  saveGoal: (data: Goal) => Promise<Goal | undefined>;
  handleDelete: (goal: Goal) => Promise<void>;
  setEditingGoal: (goal: Goal | null) => void;
}

const GoalContext = createContext<GoalContextProps | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { categories } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/goals`);

      if (!response.ok) {
        toast.error("Erro ao buscar metas");
        return;
      }

      const goalsData = await response.json();
      setGoals(goalsData);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchGoals();
    }
  }, [user?.id, fetchGoals]);

  const openModalToCreate = useCallback(() => {
    setEditingGoal(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  }, []);

  const saveGoal = useCallback(
    async (data: Goal): Promise<Goal | undefined> => {
      try {
        const url = data.id ? `/api/goals/${data.id}` : `/api/goals`;
        const method = data.id ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            targetAmount: data.targetAmount,
            currentAmount: data.currentAmount,
            deadline: data.deadline,
            categoryId:
              typeof data.category === "string"
                ? data.category
                : data.category.id,
          }),
        });

        if (!res.ok) {
          toast.error(
            data.id ? "Erro ao atualizar meta" : "Erro ao criar meta"
          );
          return;
        }

        const saved = await res.json();
        toast.success(
          data.id ? "Meta atualizada com sucesso!" : "Meta criada com sucesso!"
        );

        await fetchGoals();
        setIsModalOpen(false);
        setEditingGoal(null);

        return saved;
      } catch (error) {
        console.error("Erro no saveGoal:", error);
        toast.error("Não foi possível salvar a meta.");
      }
    },
    [fetchGoals]
  );

  const handleDelete = useCallback(
    async (goal: Goal) => {
      try {
        const res = await fetch(`/api/goals/${goal.id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          toast.error("Erro ao deletar meta");
          return;
        }

        toast.success("Meta excluída com sucesso!");
        await fetchGoals();
      } catch (error) {
        console.error("Erro ao excluir meta:", error);
        toast.error("Não foi possível excluir a meta.");
      }
    },
    [fetchGoals]
  );

  const value = useMemo(
    () => ({
      isLoading,
      goals,
      categories,
      editingGoal,
      isModalOpen,
      setIsModalOpen,
      openModalToCreate,
      openModalToEdit,
      saveGoal,
      handleDelete,
      setEditingGoal,
    }),
    [
      isLoading,
      goals,
      categories,
      editingGoal,
      isModalOpen,
      saveGoal,
      handleDelete,
      openModalToCreate,
      openModalToEdit,
      setIsModalOpen,
      setEditingGoal,
    ]
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export const useGoal = (): GoalContextProps => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoal must be used within a GoalProvider");
  }
  return context;
};

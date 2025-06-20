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
import { useAuth, useUser } from "@clerk/nextjs";
import { GoalFormData } from "@/components/ui/goals/GoalModal";
import * as Sentry from "@sentry/nextjs";

interface GoalContextProps {
  isLoading: boolean;
  goals: Goal[];
  categories: Category[];
  editingGoal: Goal | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModalToCreate: () => void;
  openModalToEdit: (goal: Goal) => void;
  saveGoal: (data: GoalFormData) => Promise<Goal | undefined>;
  deleteGoal: (goal: Goal) => Promise<void>;
  setEditingGoal: (goal: Goal | null) => void;
}

const GoalContext = createContext<GoalContextProps | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { categories } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const fetchGoals = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Erro ao buscar metas");
        return;
      }

      const goalsData = await response.json();
      setGoals(goalsData);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao carregar metas:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.hasVerifiedEmailAddress, user?.id, getToken]);

  useEffect(() => {
    if (user?.id) {
      fetchGoals();
    }
  }, [user?.id, fetchGoals, getToken]);

  const openModalToCreate = useCallback(() => {
    setEditingGoal(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  }, []);

  const saveGoal = useCallback(
    async (data: GoalFormData): Promise<Goal | undefined> => {
      try {
        const url = data.id
          ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal/${data.id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal`;
        const method = data.id ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            targetAmount: data.targetAmount,
            currentAmount: data.currentAmount,
            deadline: data.deadline,
            categoryId: data.categoryId,
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
        Sentry.captureException(error);
        console.error("Erro no saveGoal:", error);
        toast.error("Não foi possível salvar a meta.");
      }
    },
    [fetchGoals, getToken]
  );

  const deleteGoal = useCallback(
    async (goal: Goal) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal/${goal.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        if (!res.ok) {
          toast.error("Erro ao deletar meta");
          return;
        }

        toast.success("Meta excluída com sucesso!");
        await fetchGoals();
      } catch (error) {
        Sentry.captureException(error);
        console.error("Erro ao excluir meta:", error);
        toast.error("Não foi possível excluir a meta.");
      }
    },
    [fetchGoals, getToken]
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
      deleteGoal,
      setEditingGoal,
    }),
    [
      isLoading,
      goals,
      categories,
      editingGoal,
      isModalOpen,
      saveGoal,
      deleteGoal,
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

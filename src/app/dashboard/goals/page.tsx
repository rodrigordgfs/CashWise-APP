"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GoalModal } from "@/components/ui/goals/GoalModal";
import { GoalCardSkeleton } from "@/components/ui/goals/GoalCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { useState } from "react";
import { GoalCard } from "@/components/ui/goals/GoalCard";
import { Goal } from "@/types/Goal.type";
import { TransactionType } from "@/types/Transaction.type";
import { useGoal } from "@/context/goalContext";
import { useTranslation } from "react-i18next";

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Comprar um carro",
    description: "Juntar dinheiro para comprar um carro novo",
    targetAmount: 50000,
    currentAmount: 30000,
    deadline: "2026-12-31",
    category: {
      id: "1",
      name: "Veículos",
      type: TransactionType.Expense,
      icon: "🚗",
      color: "#ef4444",
    },
  },
  {
    id: "2",
    title: "Viagem para Europa",
    description: "Fazer uma viagem para conhecer a Europa",
    targetAmount: 25000,
    currentAmount: 15000,
    deadline: "2026-06-30",
    category: {
      id: "2",
      name: "Viagens",
      type: TransactionType.Expense,
      icon: "✈️",
      color: "#3b82f6",
    },
  },
];

export default function GoalsPage() {
  const { t } = useTranslation();
  const { isLoading, isModalOpen, setIsModalOpen } = useGoal();

  const [goals] = useState(mockGoals);

  const hasGoals = goals.length > 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={t("goals.title")}
        actionIcon={Plus}
        actionTitle={t("goals.newGoal")}
        onActionClick={() => setIsModalOpen(true)}
        actionDisabled={isLoading}
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      ) : hasGoals ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t("goals.goalNotFound")}
          description={t("goals.goalNotFoundDescription")}
        />
      )}

      {isModalOpen && (
        <GoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
}

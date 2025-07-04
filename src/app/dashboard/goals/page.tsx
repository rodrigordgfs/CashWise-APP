"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GoalModal } from "@/components/ui/goals/GoalModal";
import { GoalCardSkeleton } from "@/components/ui/goals/GoalCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { GoalCard } from "@/components/ui/goals/GoalCard";
import { useGoal } from "@/context/goalContext";
import { useTranslation } from "react-i18next";
import { Goal } from "@/types/Goal.type";
import { GoalFormData } from "@/components/ui/goals/GoalModal";

export default function GoalsPage() {
  const { t } = useTranslation();
  const {
    goals,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    saveGoal,
    editingGoal,
    setEditingGoal,
    deleteGoal,
  } = useGoal();

  const hasGoals = goals.length > 0;

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSave = (data: GoalFormData) => {
    saveGoal(data);
  };

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
              onEdit={() => handleEdit(goal)}
              onDelete={() => deleteGoal(goal)}
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
          onSave={handleSave}
          initialData={
            editingGoal
              ? {
                  id: editingGoal.id,
                  title: editingGoal.title,
                  description: editingGoal.description,
                  targetAmount: editingGoal.targetAmount,
                  currentAmount: editingGoal.currentAmount,
                  deadline: editingGoal.deadline,
                  categoryId:
                    typeof editingGoal.category === "string"
                      ? editingGoal.category
                      : editingGoal.category?.id ?? "",
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetCard } from "@/components/ui/budgets/BudgetCard";
import { BudgetModal } from "@/components/ui/budgets/BudgetModal";

// Dados de exemplo
const budgets = [
  {
    id: 1,
    category: "Alimentação",
    icon: "🍔",
    color: "#0ea5e9",
    limit: 800,
    spent: 650,
    month: "2025-05",
  },
  {
    id: 2,
    category: "Moradia",
    icon: "🏠",
    color: "#f97316",
    limit: 1500,
    spent: 1200,
    month: "2025-05",
  },
  {
    id: 3,
    category: "Transporte",
    icon: "🚗",
    color: "#8b5cf6",
    limit: 400,
    spent: 250,
    month: "2025-05",
  },
  {
    id: 4,
    category: "Lazer",
    icon: "🎮",
    color: "#22c55e",
    limit: 300,
    spent: 280,
    month: "2025-05",
  },
  {
    id: 5,
    category: "Saúde",
    icon: "💊",
    color: "#ef4444",
    limit: 500,
    spent: 150,
    month: "2025-05",
  },
];

const categories = [
  { id: 1, name: "Alimentação", type: "expense", icon: "🍔" },
  { id: 2, name: "Moradia", type: "expense", icon: "🏠" },
  { id: 3, name: "Transporte", type: "expense", icon: "🚗" },
  { id: 4, name: "Lazer", type: "expense", icon: "🎮" },
  { id: 5, name: "Saúde", type: "expense", icon: "💊" },
  { id: 6, name: "Educação", type: "expense", icon: "📚" },
];

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Orçamentos"
        actionIcon={Plus}
        actionTitle="Novo Orçamento"
        onActionClick={() => setIsModalOpen(true)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
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

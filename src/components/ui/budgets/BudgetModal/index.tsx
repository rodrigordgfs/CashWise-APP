"use client";

import { InputField } from "@/components/shared/InputField";
import { Modal } from "@/components/shared/Modal";
import { SelectField } from "@/components/shared/SelectField";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { category: string; limit: number; month: string }) => void;
  categories: Category[];
}

export const BudgetModal = ({
  isOpen,
  onClose,
  onSave,
  categories,
}: BudgetModalProps) => {
  const [category, setCategory] = useState(categories[0]?.name || "");
  const [limit, setLimit] = useState<number>(0);
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  ); // Ex: 2025-05

  const handleSave = () => {
    onSave({ category, limit, month });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Novo Orçamento"
      onClose={onClose}
      onConfirm={handleSave}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Defina um limite de gastos para uma categoria
      </p>

      <div className="space-y-4">
        <SelectField
          label="Categoria"
          value={category}
          options={categories.map((cat) => ({
            value: cat.name,
            label: `${cat.icon} ${cat.name}`,
          }))}
          onChange={(e) => setCategory(e.target.value)}
        />

        <InputField
          label="Limite"
          type="number"
          value={limit}
          placeholder="0.00"
          onChange={(e) => setLimit(Number(e.target.value))}
        />

        <InputField
          label="Mês"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
    </Modal>
  );
};

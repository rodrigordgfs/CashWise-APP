"use client";

import { useEffect, useState } from "react";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { Account } from "@/types/Account.Type";
import { Category } from "@/types/CategoryType";
import { Transaction, TransactionType } from "@/types/TransactionType";
import { Modal } from "@/components/shared/Modal";

export interface TransactionFormData {
  id?: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  initialData?: TransactionFormData | null;
  categories: Category[];
  accounts: Account[];
}

export const TransactionModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
  accounts,
}: TransactionModalProps) => {
  const [type, setType] = useState<TransactionType>("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setDescription(initialData.description);
      setAmount(initialData.amount);
      setDate(initialData.date);
      setCategory(initialData.category);
      setAccount(initialData.account);
    } else {
      setType("expense");
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
      setAccount("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!description || !amount || !date || !category || !account) return;

    onSave({
      ...(initialData?.id ? { id: initialData.id } : {}),
      type,
      description,
      amount: Number(amount),
      date,
      category,
      account,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? "Editar Transação" : "Nova Transação"}
      onClose={onClose}
      onConfirm={handleSubmit}
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
    >
      <div className="space-y-4">
        <SelectField
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          options={[
            { value: "expense", label: "Despesa" },
            { value: "income", label: "Receita" },
          ]}
        />

        <InputField
          label="Descrição"
          placeholder="Ex: Supermercado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputField
          label="Valor"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <SelectField
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories.map((c) => ({
            value: c.name,
            label: c.name,
          }))}
        />

        <SelectField
          label="Conta"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          options={accounts.map((a) => ({
            value: a.name,
            label: a.name,
          }))}
        />

        <InputField
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </Modal>
  );
};

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { Account } from "@/types/Account.Type";
import { Category } from "@/types/CategoryType";
import { Transaction, TransactionType } from "@/types/TransactionType";
import { useState, useEffect } from "react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  initialData?: TransactionFormData | null;
  categories: Category[];
  accounts: Account[];
}

export interface TransactionFormData {
  id?: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            {initialData ? "Editar Transação" : "Nova Transação"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Preencha os detalhes da transação abaixo
          </p>

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
        </div>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

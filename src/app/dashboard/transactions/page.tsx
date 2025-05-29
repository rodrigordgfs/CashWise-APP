"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionFilters } from "@/components/ui/transactions/TransactionsFilters";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";
import { TransactionTable } from "@/components/ui/transactions/TransactionTable";
import { Transaction } from "@/types/TransactionType";
import { TransactionModal } from "@/components/ui/transactions/TransactionModal";
import { Category } from "@/types/CategoryType";
import { Account } from "@/types/Account.Type";
import { TransactionsPageSkeleton } from "@/components/ui/transactions/TransactionsPageSkeleton";
import { toast } from "sonner";

const categories: Category[] = [
  { id: 1, name: "Alimentação", type: TransactionTypeFilter.Expense },
  { id: 2, name: "Moradia", type: TransactionTypeFilter.Expense },
  { id: 3, name: "Transporte", type: TransactionTypeFilter.Expense },
  { id: 4, name: "Lazer", type: TransactionTypeFilter.Expense },
  { id: 5, name: "Saúde", type: TransactionTypeFilter.Expense },
  { id: 6, name: "Receita", type: TransactionTypeFilter.Income },
];

const accounts: Account[] = [
  { id: 1, name: "Nubank" },
  { id: 2, name: "Itaú" },
  { id: 3, name: "Carteira" },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [transactionType, setTransactionType] = useState<TransactionTypeFilter>(
    TransactionTypeFilter.All
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      transactionType === TransactionTypeFilter.All
        ? true
        : transactionType === TransactionTypeFilter.Income
        ? transaction.amount > 0
        : transaction.amount < 0;

    return matchesSearch && matchesType;
  });

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsAddDialogOpen(true);
  };

  const handleDeleteTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir transação");
      }

      setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
      toast.success("Transação excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir transação");
      console.error(error);
    }
  };

  const handleSaveTransaction = (saved: Transaction) => {
    if (transactionToEdit) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === saved.id ? saved : t))
      );
    } else {
      setTransactions((prev) => [...prev, saved]);
    }

    setTransactionToEdit(null);
    setIsAddDialogOpen(false);
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Erro ao buscar as transações");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <TransactionsPageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Transações"
        actionIcon={Plus}
        actionTitle="Nova Transação"
        onActionClick={() => {
          setTransactionToEdit(null);
          setIsAddDialogOpen(true);
        }}
      />

      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />

      <TransactionTable
        transactions={filteredTransactions}
        onClickDelete={handleDeleteTransaction}
        onClickEdit={handleEditTransaction}
      />

      {isAddDialogOpen && (
        <TransactionModal
          isOpen={isAddDialogOpen}
          onClose={() => {
            setIsAddDialogOpen(false);
            setTransactionToEdit(null);
          }}
          onSave={handleSaveTransaction}
          initialData={transactionToEdit}
          categories={categories}
          accounts={accounts}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionFilters } from "@/components/ui/transactions/TransactionsFilters";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";
import { TransactionTable } from "@/components/ui/transactions/TransactionTable";
import { Transaction } from "@/types/TransactionType";
import { TransactionModal } from "@/components/ui/transactions/TransactionModal";
import { Category } from "@/types/CategoryType";
import { Account } from "@/types/Account.Type";

// Dados de exemplo
const transactions: Transaction[] = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Receita",
    account: "Itaú",
    type: TransactionTypeFilter.Income,
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 4,
    description: "Restaurante",
    amount: -85,
    date: "2025-05-08",
    category: "Alimentação",
    account: "Carteira",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 5,
    description: "Uber",
    amount: -25,
    date: "2025-05-07",
    category: "Transporte",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 6,
    description: "Freelance",
    amount: 1500,
    date: "2025-05-05",
    category: "Receita",
    account: "Itaú",
    type: TransactionTypeFilter.Income,
  },
  {
    id: 7,
    description: "Academia",
    amount: -120,
    date: "2025-05-03",
    category: "Saúde",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 8,
    description: "Cinema",
    amount: -50,
    date: "2025-05-01",
    category: "Lazer",
    account: "Carteira",
    type: TransactionTypeFilter.Expense,
  },
];

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
  const [transactionType, setTransactionType] = useState<TransactionTypeFilter>(
    TransactionTypeFilter.All
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtrar por termo de busca
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtrar por tipo
    const matchesType =
      transactionType === TransactionTypeFilter.All
        ? true
        : transactionType === TransactionTypeFilter.Income
        ? transaction.amount > 0
        : transaction.amount < 0;

    return matchesSearch && matchesType;
  });

  const handleEditTransaction = (transaction: Transaction) => {
    // Lógica para editar a transação
    console.log("Editar transação:", transaction);
    setIsAddDialogOpen(true); // Abre o modal de adição/edição
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    // Lógica
    console.log("Excluir transação:", transaction);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Transações"
        actionIcon={Plus}
        actionTitle="Nova Transação"
        onActionClick={() => setIsAddDialogOpen(true)}
      />

      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <TransactionTable
        transactions={filteredTransactions}
        onClickDelete={handleDeleteTransaction}
        onClickEdit={handleEditTransaction}
      />

      {isAddDialogOpen && (
        <TransactionModal
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={(transaction: Transaction) => {
            console.log("Salvar transação:", transaction);
            setIsAddDialogOpen(false);
          }}
          initialData={null}
          categories={categories}
          accounts={accounts}
        />
      )}
    </div>
  );
}

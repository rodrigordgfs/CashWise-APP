"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionFilters } from "@/components/ui/transactions/TransactionsFilters";
import { TransactionTable } from "@/components/ui/transactions/TransactionTable";
import { TransactionModal } from "@/components/ui/transactions/TransactionModal";
import { TransactionsPageSkeleton } from "@/components/ui/transactions/TransactionsPageSkeleton";
import { useTransaction } from "@/context/transactionsContext";

type Account = {
  id: number;
  name: string;
};

export default function TransactionsPage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedDate,
    setSelectedDate,
    sortOrder,
    setSortOrder,
    transactionType,
    setTransactionType,
    filteredTransactions,
    isLoading,
    isAddDialogOpen,
    setIsAddDialogOpen,
    transactionToEdit,
    setTransactionToEdit,
    handleEditTransaction,
    handleDeleteTransaction,
    handleSaveTransaction,
  } = useTransaction();

  const accounts: Account[] = [
    { id: 1, name: "Nubank" },
    { id: 2, name: "Itaú" },
    { id: 3, name: "Carteira" },
  ];

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
          accounts={accounts}
        />
      )}
    </div>
  );
}

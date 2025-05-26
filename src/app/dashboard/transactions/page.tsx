"use client";

import { useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionFilters } from "@/components/ui/transactions/TransactionsFilters";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

// Dados de exemplo
const transactions = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
    account: "Nubank",
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Receita",
    account: "Itaú",
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
    account: "Nubank",
  },
  {
    id: 4,
    description: "Restaurante",
    amount: -85,
    date: "2025-05-08",
    category: "Alimentação",
    account: "Carteira",
  },
  {
    id: 5,
    description: "Uber",
    amount: -25,
    date: "2025-05-07",
    category: "Transporte",
    account: "Nubank",
  },
  {
    id: 6,
    description: "Freelance",
    amount: 1500,
    date: "2025-05-05",
    category: "Receita",
    account: "Itaú",
  },
  {
    id: 7,
    description: "Academia",
    amount: -120,
    date: "2025-05-03",
    category: "Saúde",
    account: "Nubank",
  },
  {
    id: 8,
    description: "Cinema",
    amount: -50,
    date: "2025-05-01",
    category: "Lazer",
    account: "Carteira",
  },
];

const categories = [
  { id: 1, name: "Alimentação", type: "expense" },
  { id: 2, name: "Moradia", type: "expense" },
  { id: 3, name: "Transporte", type: "expense" },
  { id: 4, name: "Lazer", type: "expense" },
  { id: 5, name: "Saúde", type: "expense" },
  { id: 6, name: "Receita", type: "income" },
];

const accounts = [
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

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Descrição
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Categoria
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Conta
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Valor
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <td className="py-3 px-4 font-medium">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4">{transaction.category}</td>
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-4">{transaction.account}</td>
                    <td
                      className={`py-3 px-4 text-right font-medium ${
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      R$ {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para adicionar transação */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Nova Transação</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Preencha os detalhes da transação abaixo
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600">
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Supermercado"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valor
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Categoria
                  </label>
                  <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600">
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Conta
                  </label>
                  <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600">
                    {accounts.map((account) => (
                      <option key={account.id} value={account.name}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

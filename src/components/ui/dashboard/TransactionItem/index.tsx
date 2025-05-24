"use client";

import { Transaction } from "../RecentTransactionsList";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.amount > 0;

  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <div>
        <p className="font-medium">{transaction.description}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {transaction.category} •{" "}
          {new Date(transaction.date).toLocaleDateString("pt-BR")}
        </p>
      </div>
      <div
        className={`font-medium ${
          isIncome ? "text-green-500" : "text-red-500"
        }`}
      >
        {isIncome ? "+" : "-"}R$ {Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
};

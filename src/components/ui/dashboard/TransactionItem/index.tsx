"use client";

import { Transaction, TransactionType } from "@/types/Transaction.type";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(transaction.amount));

  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <div>
        <p className="font-medium">{transaction.description}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {transaction.category.name} •{" "}
          {new Date(transaction.date).toLocaleDateString("pt-BR")}
        </p>
      </div>
      <div
        className={`font-medium ${
          transaction.type === TransactionType.Income
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {transaction.type === TransactionType.Income ? "+" : "-"}
        {formattedAmount}
      </div>
    </div>
  );
};

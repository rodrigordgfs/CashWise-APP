"use client";

import { useSettings } from "@/context/settingsContext";
import { Transaction, TransactionType } from "@/types/Transaction.type";
import { formatCurrency } from "@/utils/formatConvertCurrency";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { currency, language } = useSettings();

  const formattedAmount = formatCurrency(
    Math.abs(transaction.amount),
    currency,
    language
  );

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <div>
        <p className="font-medium">{transaction.description}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {transaction.category?.name ? transaction.category.name : "Sem categoria"} •{" "}
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

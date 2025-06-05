"use client";

import { Transaction } from "@/types/Transaction.type";
import { TransactionItem } from "../TransactionItem";
import { useTranslation } from "react-i18next";

interface RecentTransactionsListProps {
  transactions: Transaction[];
}

export const RecentTransactionsList = ({
  transactions,
}: RecentTransactionsListProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {t("dashboard.recentTransactions")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("dashboard.lastFiveTransactions")}
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

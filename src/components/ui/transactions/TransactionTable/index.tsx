"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { TransactionTableHeader } from "./TransactionTableHeader";
import { TransactionTableRow } from "./TransactionTableRow";
import { Transaction } from "@/types/Transaction.type";
import { useTranslation } from "react-i18next";

interface TransactionTableProps {
  transactions: Transaction[];
  onClickEdit?: (transaction: Transaction) => void;
  onClickDelete?: (transaction: Transaction) => void;
}

export const TransactionTable = ({
  transactions,
  onClickDelete,
  onClickEdit,
}: TransactionTableProps) => {
  const { t } = useTranslation();

  if (transactions.length === 0) {
    return (
      <EmptyState
        title={t("transactions.transactionsNotFound")}
        description={t("transactions.transactionsNotFoundDescription")}
      />
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TransactionTableHeader />
            <tbody>
              {transactions.map((transaction) => (
                <TransactionTableRow
                  key={transaction.id}
                  transaction={transaction}
                  onClickEdit={onClickEdit}
                  onClickDelete={onClickDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

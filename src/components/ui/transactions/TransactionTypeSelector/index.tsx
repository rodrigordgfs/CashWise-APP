"use client";

import { TransactionTypeFilter } from "@/types/Transaction.type";
import { useTranslation } from "react-i18next";

interface Props {
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
}

export const TransactionTypeSelector = ({
  transactionType,
  setTransactionType,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden h-[42px]">
      {(Object.values(TransactionTypeFilter) as TransactionTypeFilter[]).map(
        (type) => (
          <button
            key={type}
            onClick={() => setTransactionType(type)}
            className={`px-4 w-full flex-1 h-full text-sm font-medium flex items-center justify-center cursor-pointer transition-all ${
              transactionType === type
                ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {type === TransactionTypeFilter.All
              ? t("transactions.all")
              : type === TransactionTypeFilter.Income
              ? t("transactions.income")
              : t("transactions.expense")}
          </button>
        )
      )}
    </div>
  );
};

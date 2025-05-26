import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

interface Props {
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
}

export const TransactionTypeSelector = ({
  transactionType,
  setTransactionType,
}: Props) => {
  return (
    <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden">
      {(Object.values(TransactionTypeFilter) as TransactionTypeFilter[]).map(
        (type) => (
          <button
            key={type}
            onClick={() => setTransactionType(type)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              transactionType === type
                ? "bg-emerald-50 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {type === TransactionTypeFilter.All
              ? "Todos"
              : type === TransactionTypeFilter.Income
              ? "Receitas"
              : "Despesas"}
          </button>
        )
      )}
    </div>
  );
};

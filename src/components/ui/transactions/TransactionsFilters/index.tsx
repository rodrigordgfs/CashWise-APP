"use client";

import { SearchInput } from "../SearchInput";
import { DateFilter } from "../DateFilter";
import { SortButton } from "../SortButton";
import { TransactionTypeSelector } from "../TransactionTypeSelector";
import { TransactionTypeFilter } from "@/types/Transaction.type";
import { FilterCard } from "@/components/shared/FilterCard";
import { useTranslation } from "react-i18next";
interface TransactionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedDate?: Date;
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
  setSortOrder: (order: "none" | "asc" | "desc") => void;
  sortOrder: "none" | "asc" | "desc";
}

export const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  transactionType,
  setTransactionType,
  setSortOrder,
  sortOrder,
}: TransactionFiltersProps) => {
  const { t } = useTranslation();
  return (
    <FilterCard title={t("transactions.filters")}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <DateFilter selectedDate={selectedDate} onChange={setSelectedDate} />
          <SortButton setSortOrder={setSortOrder} sortOrder={sortOrder} />
          <TransactionTypeSelector
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
        </div>
      </div>
    </FilterCard>
  );
};

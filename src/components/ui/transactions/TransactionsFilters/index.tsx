"use client";

import { SearchInput } from "../SearchInput";
import { DateFilter } from "../DateFilter";
import { SortButton } from "../SortButton";
import { TransactionTypeSelector } from "../TransactionTypeSelector";
import { TransactionTypeFilter } from "@/types/Transaction.type";
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
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
      <div className="flex-1">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* Linha com filtros juntos inclusive no mobile */}
      <div className="flex flex-wrap gap-2 items-center">
        <DateFilter selectedDate={selectedDate} onChange={setSelectedDate} />
        <SortButton setSortOrder={setSortOrder} sortOrder={sortOrder} />
        <TransactionTypeSelector
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </div>
    </div>
  );
};

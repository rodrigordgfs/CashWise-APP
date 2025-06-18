"use client";

import { SearchInput } from "../SearchInput";
import { SortButton } from "../SortButton";
import { TransactionTypeSelector } from "../TransactionTypeSelector";
import { TransactionTypeFilter } from "@/types/Transaction.type";
import { FilterCard } from "shinodalabs-ui";
import { useTranslation } from "react-i18next";
import { Button, DateRange } from "shinodalabs-ui";
import { BrushCleaning } from "lucide-react";

interface TransactionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRange?: { from: Date | undefined; to: Date | undefined };
  setSelectedRange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
  setSortOrder: (order: "none" | "asc" | "desc") => void;
  sortOrder: "none" | "asc" | "desc";
  resetFilters?: () => void;
}

export const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  selectedRange,
  setSelectedRange,
  transactionType,
  setTransactionType,
  setSortOrder,
  sortOrder,
  resetFilters,
}: TransactionFiltersProps) => {
  const { t } = useTranslation();
  return (
    <FilterCard title={t("transactions.filters")}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <DateRange
              selectedRange={selectedRange}
              onChange={setSelectedRange}
              labels={{
                filterByDate: t("transactions.filterByDate"),
                clear: t("transactions.clear"),
                selectDate: t("transactions.selectDate"),
                closeCalendar: t("transactions.closeCalendar"),
              }}
            />
            <SortButton setSortOrder={setSortOrder} sortOrder={sortOrder} />
            <TransactionTypeSelector
              transactionType={transactionType}
              setTransactionType={setTransactionType}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            icon={BrushCleaning}
            onClick={resetFilters}
            className="w-full sm:w-auto"
          >
            {t("app.clearFilters")}
          </Button>
        </div>
      </div>
    </FilterCard>
  );
};

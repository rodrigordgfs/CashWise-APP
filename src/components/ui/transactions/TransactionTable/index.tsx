"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { TransactionTableHeader } from "./TransactionTableHeader";
import { TransactionTableRow } from "./TransactionTableRow";
import { Transaction } from "@/types/Transaction.type";
import { useTranslation } from "react-i18next";
import { Pagination } from "shinodalabs-ui";
import { useTransaction } from "@/context/transactionsContext";

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
  const { page, setPage, totalItems, totalPages, setPerPage, perPage } =
    useTransaction();

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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={(page) => setPage(page)}
        onItemsPerPageChange={(perPage) => setPerPage(perPage)}
        labels={{
          previous: t("app.pagination.previous"),
          next: t("app.pagination.next"),
          showing: t("app.pagination.showing"),
          of: t("app.pagination.of"),
          results: t("app.pagination.results"),
          page: t("app.pagination.page"),
          itemsPerPage: t("app.pagination.itemsPerPage"),
        }}
        optionsItemsPerPage={[
          { label: `10 ${t("app.pagination.itemsPerPage")}`, value: "10" },
          { label: `25 ${t("app.pagination.itemsPerPage")}`, value: "25" },
          { label: `50 ${t("app.pagination.itemsPerPage")}`, value: "50" },
          { label: `100 ${t("app.pagination.itemsPerPage")}`, value: "100" },
        ]}
      />
    </div>
  );
};

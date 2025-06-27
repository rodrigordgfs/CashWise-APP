"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { Transaction } from "@/types/Transaction.type";
import { useTranslation } from "react-i18next";
import { Pagination } from "@/components/shared/Pagination";
import Table from "@/components/shared/Table";
import { useTransaction } from "@/context/transactionsContext";
import { useCategory } from "@/context/categoryContext";
import { formatCurrency } from "@/utils/formatConvertCurrency";
import { useSettings } from "@/context/settingsContext";

interface HeaderColumn<T> {
  key: keyof T | "actions";
  label: React.ReactNode;
  align?: "left" | "right" | "center";
  hidden?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  format?: (value: T[keyof T], row: T) => React.ReactNode;
  style?: (value: T[keyof T], row: T) => string;
  /** true → apenas mobile, false → apenas desktop, undefined → ambos */
  showMobile?: boolean;
}

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
  const { categories } = useCategory();
  const { currency, language } = useSettings();
  const { page, setPage, totalItems, totalPages, setPerPage, perPage } =
    useTransaction();

  /* ------------------------------------------------------------------
     MARQUE showMobile: false nas colunas que devem sumir em mobile
     ------------------------------------------------------------------ */
  const columns: HeaderColumn<Transaction>[] = [
    {
      key: "description",
      label: t("transactions.description"),
      /* visível em todas as telas (mobile + desktop) */
    },
    {
      key: "category",
      label: t("transactions.category"),
      format: (_value, row) =>
        categories.find((c) => c.id === row.category?.id)?.name ?? "-",
      showMobile: false, // ← só desktop
    },
    {
      key: "date",
      label: t("transactions.date"),
      format: (value) => {
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          value instanceof Date
        ) {
          return new Date(value).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          });
        }
        return "-";
      },
      showMobile: false, // ← só desktop
    },
    {
      key: "account",
      label: t("transactions.account"),
      format: (_value, row) => row.account ?? "-",
      showMobile: false, // ← só desktop
    },
    {
      key: "amount",
      label: t("transactions.amount"),
      align: "right",
      format: (value) =>
        formatCurrency(
          typeof value === "number" ? Math.abs(value) : 0,
          currency,
          language
        ),
      style: (_v, row) =>
        row.type === "INCOME" ? "text-green-500" : "text-red-500",
      /* visível em todas as telas */
    },
    {
      key: "actions",
      label: t("transactions.actions"),
      align: "right",
      /* visível em todas as telas */
    },
  ];

  /* ------------------------------------------------------------------ */

  if (transactions.length === 0) {
    return (
      <EmptyState
        title={t("transactions.transactionsNotFound")}
        description={t("transactions.transactionsNotFoundDescription")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <Table.Header<Transaction> columns={columns} />

        <Table.Body>
          {transactions.map((t) => (
            <Table.Row<Transaction>
              key={t.id}
              data={t}
              columns={columns}
              onClickEdit={() => onClickEdit?.(t)}
              onClickDelete={() => onClickDelete?.(t)}
            />
          ))}
        </Table.Body>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={setPerPage}
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

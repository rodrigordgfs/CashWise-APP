"use client";

import { Edit, Trash } from "lucide-react";
import { Transaction, TransactionType } from "@/types/Transaction.type";
import { useCategory } from "@/context/categoryContext";
import { useSettings } from "@/context/settingsContext";
import { formatCurrency } from "@/utils/formatConvertCurrency";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/context/dialogContext";

interface TransactionTableRowProps {
  transaction: Transaction;
  onClickEdit?: (transaction: Transaction) => void;
  onClickDelete?: (transaction: Transaction) => void;
}

export const TransactionTableRow = ({
  transaction,
  onClickEdit,
  onClickDelete,
}: TransactionTableRowProps) => {
  const { t } = useTranslation();
  const { categories } = useCategory();
  const { showDialog } = useDialog();
  const { currency, language } = useSettings();
  const { description, category, date, account, amount, type } = transaction;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  const categoryName = categories.find((c) => c.id === category?.id)?.name;
  const formattedCategory = categoryName || t("transactions.noCategory");
  const formattedAccount = account || t("transactions.noAccount");
  const formattedAmount = formatCurrency(Math.abs(amount), currency, language);
  const amountClass =
    type === TransactionType.Income ? "text-green-500" : "text-red-500";

  const handleDelete = () => {
    showDialog({
      title: t("transactions.dialogDeleteTitle"),
      description: t("transactions.dialogDeleteDescription"),
      confirmLabel: t("transactions.dialogDeleteConfirm"),
      cancelLabel: t("transactions.dialogDeleteCancel"),
      onConfirm: () => {
        if (onClickDelete) {
          onClickDelete(transaction);
        }
      },
    });
  };

  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
      <td className="py-3 px-4 font-medium">{description}</td>
      <td className="py-3 px-4">{formattedCategory}</td>
      <td className="py-3 px-4">{formattedDate}</td>
      <td className="py-3 px-4">{formattedAccount}</td>
      <td className="py-3 px-4">
        {transaction.type === TransactionType.Expense
          ? transaction.paid
            ? "Sim"
            : "Não"
          : "-"}
      </td>
      <td className={`py-3 px-4 text-right font-medium ${amountClass}`}>
        {type === TransactionType.Income ? "" : "- "}
        {formattedAmount}
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 cursor-pointer transition-all"
            aria-label={t("transactions.editTransaction")}
            title={t("transactions.editTransaction")}
            onClick={() => {
              if (onClickEdit) {
                onClickEdit(transaction);
              }
            }}
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 cursor-pointer transition-all"
            aria-label={t("transactions.deleteTransaction")}
            title={t("transactions.deleteTransaction")}
            onClick={() => handleDelete()}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

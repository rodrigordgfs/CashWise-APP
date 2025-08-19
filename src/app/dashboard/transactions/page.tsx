"use client";

import { useRef } from "react";
import { Import, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionFilters } from "@/components/ui/transactions/TransactionsFilters";
import { TransactionTable } from "@/components/ui/transactions/TransactionTable";
import { TransactionModal } from "@/components/ui/transactions/TransactionModal";
import { TransactionsPageSkeleton } from "@/components/ui/transactions/TransactionsPageSkeleton";
import { useTransaction } from "@/context/transactionsContext";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/context/dialogContext";
import { toast } from "sonner";
import { parseOfxToJson } from "@/utils/parseOfxToJson";
import { parse, format } from "date-fns";

type Account = {
  id: number;
  name: string;
};

interface OfxTransactionRaw {
  fitid: string;
  memo: string;
  dtposted: string;
  trnamt: string | number;
}

export default function TransactionsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    selectedDate,
    setSelectedDate,
    sortOrder,
    setSortOrder,
    transactionType,
    setTransactionType,
    transactions,
    isLoading,
    isAddDialogOpen,
    setIsAddDialogOpen,
    transactionToEdit,
    setTransactionToEdit,
    handleEditTransaction,
    handleDeleteTransaction,
    resetFilters,
    fetchTransactions,
    createOfxTransactions,
  } = useTransaction();
  const { t } = useTranslation();
  const { showDialog } = useDialog();

  const accounts: Account[] = [
    { id: 1, name: "Nubank" },
    { id: 2, name: "Itaú" },
    { id: 3, name: "Carteira" },
  ];

  const formatOfxDate = (dtPosted: string): string => {
    const cleanDate = dtPosted.slice(0, 14);
    const parsedDate = parse(cleanDate, "yyyyMMddHHmmss", new Date());
    return format(parsedDate, "yyyy-MM-dd");
  };

  const handleDialogImportTransactions = () => {
    showDialog({
      title: t("transactions.dialogImportDataTitle"),
      description: t("transactions.dialogImportDataDescription"),
      confirmLabel: t("transactions.dialogImportDataConfirm"),
      cancelLabel: t("transactions.dialogImportDataCancel"),
      onConfirm: () => {
        fileInputRef.current?.click();
      },
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".ofx")) {
      toast.error(t("transactions.invalidOfx"));
      return;
    }

    try {
      const ofxJson = await parseOfxToJson(await file.text());

      const transactionsRaw =
        ofxJson.ofx.bankmsgsrsv1.stmttrnrs.stmtrs.banktranlist.stmttrn;

      const transactions = Array.isArray(transactionsRaw)
        ? transactionsRaw
        : [transactionsRaw];

      const formattedTransactions: {
        description: string;
        date: string;
        amount: string;
        type: "EXPENSE" | "INCOME";
      }[] = transactions.map((txn: OfxTransactionRaw) => ({
        description: txn.memo,
        date: formatOfxDate(txn.dtposted),
        amount: Math.abs(parseFloat(txn.trnamt as string)).toFixed(2),
        type: parseFloat(txn.trnamt as string) < 0 ? "EXPENSE" : "INCOME",
      }));

      if (createOfxTransactions) {
        await createOfxTransactions(formattedTransactions);
      }

      toast.success(t("transactions.importSuccess"));
      await fetchTransactions?.();
    } catch (error) {
      console.error(error);
      toast.error(t("transactions.importError"));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={t("transactions.title")}
        actionIcon={Plus}
        actionTitle={t("transactions.newTransaction")}
        onActionClick={() => {
          setTransactionToEdit(null);
          setIsAddDialogOpen(true);
        }}
        secondActionTitle={t("transactions.importData")}
        secondActionIcon={Import}
        onSecondActionClick={handleDialogImportTransactions}
      />

      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRange={selectedDate}
        setSelectedRange={setSelectedDate}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        resetFilters={resetFilters}
      />

      {isLoading ? (
        <TransactionsPageSkeleton />
      ) : (
        <TransactionTable
          transactions={transactions}
          onClickDelete={handleDeleteTransaction}
          onClickEdit={handleEditTransaction}
        />
      )}

      {isAddDialogOpen && (
        <TransactionModal
          isOpen={isAddDialogOpen}
          onClose={() => {
            setIsAddDialogOpen(false);
            setTransactionToEdit(null);
          }}
          initialData={transactionToEdit}
          accounts={accounts}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".ofx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

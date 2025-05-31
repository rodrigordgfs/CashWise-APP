"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";
import { Transaction, TransactionTypeFilter } from "@/types/Transaction.type";
import { useUser } from "@clerk/nextjs";

export enum Period {
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

interface TransactionContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
  sortOrder: "none" | "asc" | "desc";
  setSortOrder: (order: "none" | "asc" | "desc") => void;
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  isLoading: boolean;
  transactionToEdit: Transaction | null;
  setTransactionToEdit: (transaction: Transaction | null) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (transaction: Transaction) => Promise<void>;
  handleSaveTransaction: (saved: Transaction) => void;
  periodTabs: { label: string; value: string }[];
  period: Period;
  setPeriod: (period: Period) => void;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [transactionType, setTransactionType] = useState<TransactionTypeFilter>(
    TransactionTypeFilter.All
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [period, setPeriod] = useState<Period>(Period.MONTH);

  const periodTabs = useMemo(
    () => [
      { label: "Semana", value: Period.WEEK },
      { label: "Mês", value: Period.MONTH },
      { label: "Ano", value: Period.YEAR },
    ],
    []
  );

  // Filtered transactions logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        transactionType === TransactionTypeFilter.All
          ? true
          : transactionType === TransactionTypeFilter.Income
          ? transaction.amount > 0
          : transaction.amount < 0;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, transactionType]);

  // Handlers with useCallback
  const handleEditTransaction = useCallback((transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsAddDialogOpen(true);
  }, []);

  const handleDeleteTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        const response = await fetch(`/api/transactions/${transaction.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir transação");
        }

        setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
        toast.success("Transação excluída com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir transação");
        console.error(error);
      }
    },
    []
  );

  const handleSaveTransaction = useCallback(
    (saved: Transaction) => {
      if (transactionToEdit) {
        setTransactions((prev) =>
          prev.map((t) => (t.id === saved.id ? saved : t))
        );
      } else {
        setTransactions((prev) => [...prev, saved]);
      }

      setTransactionToEdit(null);
      setIsAddDialogOpen(false);
    },
    [transactionToEdit]
  );

  // Fetch transactions once
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `http://localhost:3001/transaction?userId=${user?.id}${
            searchTerm ? `&search=${searchTerm}` : ""
          }${selectedDate ? `&date=${selectedDate.toISOString()}` : ""}${
            sortOrder !== "none" ? `&sort=${sortOrder}` : ""
          }${
            transactionType !== TransactionTypeFilter.All
              ? `&type=${transactionType}`
              : ""
          }`
        );
        if (!response.ok) {
          toast.error("Erro ao buscar as transações");
          throw new Error("Erro ao buscar as transações");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Erro ao carregar transações");
        console.error("Erro ao carregar transações:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [user?.id, searchTerm, selectedDate, sortOrder, transactionType]);

  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      selectedDate,
      setSelectedDate,
      sortOrder,
      setSortOrder,
      transactionType,
      setTransactionType,
      transactions,
      filteredTransactions,
      isLoading,
      transactionToEdit,
      setTransactionToEdit,
      isAddDialogOpen,
      setIsAddDialogOpen,
      handleEditTransaction,
      handleDeleteTransaction,
      handleSaveTransaction,
      periodTabs,
      period,
      setPeriod,
    }),
    [
      searchTerm,
      selectedDate,
      sortOrder,
      transactionType,
      transactions,
      filteredTransactions,
      isLoading,
      transactionToEdit,
      isAddDialogOpen,
      handleEditTransaction,
      handleDeleteTransaction,
      handleSaveTransaction,
      periodTabs,
      period,
      setPeriod,
    ]
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextProps => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useTransaction must be used within a TransactionProvider");
  return context;
};

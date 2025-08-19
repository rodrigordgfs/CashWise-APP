// context/transactionContext.tsx
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
import { useAuth, useUser } from "@clerk/nextjs";
import { Period } from "@/types/Period.type";
import { useReports } from "./reportContext";

interface TransactionContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate?: {
    from: Date | undefined;
    to: Date | undefined;
  };
  setSelectedDate: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  sortOrder: "none" | "asc" | "desc";
  setSortOrder: (order: "none" | "asc" | "desc") => void;
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
  transactions: Transaction[];
  isLoading: boolean;
  transactionToEdit: Transaction | null;
  setTransactionToEdit: (transaction: Transaction | null) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (transaction: Transaction) => Promise<void>;
  saveOrUpdateTransaction: (
    data: Omit<Transaction, "id" | "category"> & {
      categoryId: string;
      id?: string;
    }
  ) => Promise<Transaction | null | undefined>;
  createOfxTransactions?: (
    transactions: Array<{
      description: string;
      date: string;
      amount: string;
      type: "EXPENSE" | "INCOME";
    }>
  ) => Promise<void>;
  periodTabs: { label: string; value: string }[];
  period: Period;
  setPeriod: (period: Period) => void;
  fetchTransactions: () => Promise<void>;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  totalItems: number;
  setTotalItems: (total: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
  resetFilters: () => void;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { fetchReports } = useReports();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
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

  useEffect(() => {
    setPage(1);
    setPerPage(10);
    setTotalItems(0);
    setTotalPages(0);
  }, [period]);

  const periodTabs = useMemo(
    () => [
      { label: "Semana", value: Period.WEEK },
      { label: "Mês", value: Period.MONTH },
      { label: "Ano", value: Period.YEAR },
    ],
    []
  );

  const handleEditTransaction = useCallback((transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsAddDialogOpen(true);
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const params = {
        page: String(page),
        perPage: String(perPage),
        search: searchTerm || undefined,
        date__gte: selectedDate?.from
          ? selectedDate.from.toISOString()
          : undefined,
        date__lte: selectedDate?.to ? selectedDate.to.toISOString() : undefined,
        sort: sortOrder !== "none" ? sortOrder : undefined,
        type:
          transactionType !== TransactionTypeFilter.All
            ? transactionType
            : undefined,
      };

      const url = new URL("/transaction", process.env.NEXT_PUBLIC_BASE_URL_API);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value);
        }
      });

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        toast.error("Erro ao buscar transações");
        throw new Error("Erro ao buscar transações");
      }

      setTotalItems(Number(response.headers.get("x-total-count")) || 0);
      setTotalPages(Number(response.headers.get("x-total-pages")) || 0);
      setPage(Number(response.headers.get("x-current-page")) || 1);
      setPerPage(Number(response.headers.get("x-per-page")) || 10);

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      toast.error("Erro ao carregar transações");
      console.error("Erro ao carregar transações:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    user?.id,
    user?.hasVerifiedEmailAddress,
    getToken,
    page,
    perPage,
    searchTerm,
    selectedDate,
    sortOrder,
    transactionType,
  ]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDeleteTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction/${transaction.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        if (!response.ok) {
          toast.error("Erro ao excluir transação");
          throw new Error("Erro ao excluir transação");
        }

        setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
        toast.success("Transação excluída com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir transação");
        console.error(error);
      }
    },
    [getToken]
  );

  const saveOrUpdateTransaction = useCallback(
    async (
      data: Omit<Transaction, "id" | "category"> & {
        categoryId: string;
        id?: string;
      }
    ): Promise<Transaction | null | undefined> => {
      try {
        const method = data.id ? "PATCH" : "POST";
        const url = data.id
          ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction/${data.id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction`;

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            ...data,
            date: new Date(data.date),
          }),
        });

        if (!response.ok) {
          toast.error("Erro ao salvar transação");
          return null;
        }

        await fetchTransactions();
        await fetchReports();

        toast.success(
          data.id
            ? "Transação atualizada com sucesso!"
            : "Transação salva com sucesso!"
        );
      } catch (err) {
        toast.error("Erro ao salvar transação");
        console.error(err);
        return null;
      }
    },
    [getToken, fetchTransactions, fetchReports]
  );

  const createOfxTransactions = useCallback(
    async (
      transactions: Array<{
        description: string;
        date: string;
        amount: string;
        type: "EXPENSE" | "INCOME";
      }>
    ) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction/import-ofx`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
            body: JSON.stringify(transactions),
          }
        );

        if (!response.ok) {
          toast.error("Erro ao importar transações OFX");
          throw new Error("Erro ao importar transações OFX");
        }

        await fetchTransactions();
        toast.success("Transações OFX importadas com sucesso!");
      } catch (error) {
        toast.error("Erro ao importar transações OFX");
        console.error("Erro ao importar transações OFX:", error);
      }
    },
    [getToken, fetchTransactions]
  );

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedDate({ from: undefined, to: undefined });
    setTransactionType(TransactionTypeFilter.All);
    setSortOrder("none");
    fetchTransactions();
  }, [fetchTransactions]);

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
      isLoading,
      transactionToEdit,
      setTransactionToEdit,
      isAddDialogOpen,
      setIsAddDialogOpen,
      handleEditTransaction,
      handleDeleteTransaction,
      saveOrUpdateTransaction,
      periodTabs,
      period,
      setPeriod,
      fetchTransactions,
      page,
      setPage,
      perPage,
      setPerPage,
      totalItems,
      setTotalItems,
      totalPages,
      setTotalPages,
      resetFilters,
      createOfxTransactions,
    }),
    [
      searchTerm,
      selectedDate,
      sortOrder,
      transactionType,
      transactions,
      isLoading,
      transactionToEdit,
      isAddDialogOpen,
      handleEditTransaction,
      handleDeleteTransaction,
      saveOrUpdateTransaction,
      periodTabs,
      period,
      fetchTransactions,
      page,
      perPage,
      totalItems,
      totalPages,
      resetFilters,
      createOfxTransactions,
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

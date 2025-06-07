"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Transaction } from "@/types/Transaction.type";
import { useUser } from "@clerk/nextjs";
import { Summary } from "@/types/Dashboard.type";
import { toast } from "sonner";
import { CategoryReport, MonthlyReport } from "@/types/Report.type";
import { Period } from "@/types/Period.type";

interface DashboardContextProps {
  isLoading: boolean;
  period: Period;
  setPeriod: (period: Period) => void;
  summary: Summary;
  monthlyData: MonthlyReport[];
  category: CategoryReport[];
  recentTransactions: Transaction[];
  fetchData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<Period>(Period.WEEK);
  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyReport[]>([]);
  const [category, setCategory] = useState<CategoryReport[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  const fetchData = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const transactionParams = {
        date__gte: period,
        limit: "5",
        sort: "desc",
      };
      const transactionUrl = new URL(
        "/api/transaction",
        window.location.origin
      );
      Object.entries(transactionParams).forEach(([key, value]) => {
        if (value !== undefined) {
          transactionUrl.searchParams.append(key, value);
        }
      });
      const [summaryRes, monthlyRes, categoryRes, transactionsRes] =
        await Promise.all([
          fetch(`/api/reports/summary${period ? `?period=${period}` : ""}`),
          fetch(`/api/reports/monthly${period ? `?period=${period}` : ""}`),
          fetch(`/api/reports/categories${period ? `?period=${period}` : ""}`),
          fetch(transactionUrl.toString()),
        ]);

      if (
        !summaryRes.ok ||
        !monthlyRes.ok ||
        !categoryRes.ok ||
        !transactionsRes.ok
      ) {
        throw new Error("Erro ao buscar dados do dashboard");
      }

      const summaryJson = await summaryRes.json();
      const monthlyJson = await monthlyRes.json();
      const categoryJson = await categoryRes.json();
      const transactionsJson = await transactionsRes.json();

      setSummary(summaryJson);
      setMonthlyData(monthlyJson);
      setCategory(categoryJson);
      setRecentTransactions(transactionsJson);
    } catch (error) {
      toast.error(
        "Erro ao carregar dados do dashboard. Tente novamente mais tarde."
      );
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, [period, user?.id, user?.hasVerifiedEmailAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      isLoading,
      period,
      setPeriod,
      summary,
      monthlyData,
      category,
      recentTransactions,
      fetchData,
    }),
    [
      isLoading,
      period,
      setPeriod,
      summary,
      monthlyData,
      category,
      recentTransactions,
      fetchData,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

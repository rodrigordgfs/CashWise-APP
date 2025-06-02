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
import { Period } from "@/context/transactionsContext";
import { Transaction } from "@/types/Transaction.type";
import { useUser } from "@clerk/nextjs";
import { subDays, subMonths, subYears, format } from "date-fns";
import { Summary } from "@/types/Dashboard.type";
import { toast } from "sonner";
import { CategoryReport, MonthlyReport } from "@/types/Report.type";

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
  const [isLoading, setIsLoading] = useState(true);
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

  const getRelevantDate = (period: Period): string => {
    const today = new Date();

    const date = (() => {
      switch (period) {
        case Period.WEEK:
          return subDays(today, 7);
        case Period.MONTH:
          return subMonths(today, 1);
        case Period.YEAR:
          return subYears(today, 1);
        default:
          return today;
      }
    })();

    return format(date, "yyyy-MM-dd");
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [summaryRes, monthlyRes, categoryRes, transactionsRes] =
        await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/summary?userId=${
              user?.id
            }&period__gte=${getRelevantDate(period)}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/monthly?userId=${
              user?.id
            }${period && `&period__gte=${getRelevantDate(period)}`}`
          ),
          fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL_API
            }/reports/categories?userId=${
              user?.id
            }&period__gte=${getRelevantDate(period)}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction?userId=${
              user?.id
            }&date__gte=${getRelevantDate(period)}&limit=5&sort=desc`
          ),
        ]);

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
  }, [period, user?.id]);

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

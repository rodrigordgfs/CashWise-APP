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
import { useAuth, useUser } from "@clerk/nextjs";
import { subDays, format, startOfMonth, startOfYear } from "date-fns";
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
  const { getToken } = useAuth();

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

  const getRelevantDate = (period: Period): string => {
    const today = new Date();

    const date = (() => {
      switch (period) {
        case Period.WEEK:
          return subDays(today, 7);
        case Period.MONTH:
          return startOfMonth(today);
        case Period.YEAR:
          return startOfYear(today);
        default:
          return today;
      }
    })();

    return format(date, "yyyy-MM-dd");
  };

  const fetchData = useCallback(async () => {
    if (!user?.id) {
      // Não tenta buscar se usuário não existir
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const [summaryRes, monthlyRes, categoryRes, transactionsRes] =
        await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/summary?userId=${
              user.id
            }&period__gte=${getRelevantDate(period)}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/monthly?userId=${
              user.id
            }${period ? `&period__gte=${getRelevantDate(period)}` : ""}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
          fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL_API
            }/reports/categories?userId=${
              user.id
            }&period__gte=${getRelevantDate(period)}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction?userId=${
              user.id
            }&date__gte=${getRelevantDate(period)}&limit=5&sort=desc`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
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
  }, [period, user?.id, getToken]);

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

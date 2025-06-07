"use client";

import { Period } from "@/types/Period.type";
import { ReportType, ReportTypeEnum } from "@/types/Report.type";
import {
  BalanceReport,
  CategoryReport,
  MonthlyReport,
} from "@/types/Report.type";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

interface ReportsContextProps {
  period: Period;
  setPeriod: Dispatch<SetStateAction<Period>>;
  reportType: ReportType;
  setReportType: React.Dispatch<React.SetStateAction<ReportType>>;
  monthlyReports: MonthlyReport[];
  categoryReports: CategoryReport[];
  balanceReports: BalanceReport[];
  isLoading: boolean;
}

const ReportsContext = createContext<ReportsContextProps | undefined>(
  undefined
);

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [period, setPeriod] = useState(Period.MONTH);
  const [reportType, setReportType] = useState<ReportType>(
    ReportTypeEnum.INCOME_EXPENSE
  );
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [categoryReports, setCategoryReports] = useState<CategoryReport[]>([]);
  const [balanceReports, setBalanceReports] = useState<BalanceReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.id || !user.hasVerifiedEmailAddress) return;

      setIsLoading(true);
      try {
        const [monthlyRes, categoryRes, balanceRes] = await Promise.all([
          fetch(`/api/reports/monthly${period ? `?period=${period}` : ""}`),
          fetch(`/api/reports/categories${period ? `?period=${period}` : ""}`),
          fetch(`/api/reports/balance${period ? `?period=${period}` : ""}`),
        ]);

        if (!monthlyRes.ok || !categoryRes.ok || !balanceRes.ok) {
          throw new Error("Erro ao buscar relatórios");
        }

        const [monthlyData, categoryData, balanceData] = await Promise.all([
          monthlyRes.json(),
          categoryRes.json(),
          balanceRes.json(),
        ]);

        setMonthlyReports(monthlyData);
        setCategoryReports(categoryData);
        setBalanceReports(balanceData);
      } catch (error) {
        toast.error("Erro ao carregar relatórios. Tente novamente mais tarde.");
        console.error("Erro ao carregar relatórios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [period, reportType, user?.id, getToken, user?.hasVerifiedEmailAddress]);

  const value = useMemo(
    () => ({
      period,
      setPeriod,
      reportType,
      setReportType,
      monthlyReports,
      categoryReports,
      balanceReports,
      isLoading,
    }),
    [
      period,
      reportType,
      monthlyReports,
      categoryReports,
      balanceReports,
      isLoading,
    ]
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};

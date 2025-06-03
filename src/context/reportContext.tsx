"use client";

import { ReportType, ReportTypeEnum } from "@/types/Report.type";
import {
  BalanceReport,
  CategoryReport,
  MonthlyReport,
} from "@/types/Report.type";
import { useAuth, useUser } from "@clerk/nextjs";
import { format, startOfMonth, subMonths, subYears } from "date-fns";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface ReportsContextProps {
  period: string;
  setPeriod: (value: string) => void;
  reportType: ReportType;
  setReportType: (value: ReportType) => void;
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

  const [period, setPeriod] = useState("1month");
  const [reportType, setReportType] = useState<ReportType>(
    ReportTypeEnum.INCOME_EXPENSE
  );
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [categoryReports, setCategoryReports] = useState<CategoryReport[]>([]);
  const [balanceReports, setBalanceReports] = useState<BalanceReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRelativeDate = (period: string) => {
    const now = new Date();

    const date = (() => {
      switch (period) {
        case "1month":
          return subMonths(now, 1);
        case "3months":
          return subMonths(now, 3);
        case "6months":
          return subMonths(now, 6);
        case "1year":
          return subYears(now, 1);
        default:
          return now;
      }
    })();

    return format(startOfMonth(date), "yyyy-MM-dd");
  };

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [monthlyRes, categoryRes, balanceRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/monthly?userId=${
              user.id
            }${period ? `&period__gte=${getRelativeDate(period)}` : ""}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
          fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL_API
            }/reports/categories?userId=${user.id}${
              period ? `&period__gte=${getRelativeDate(period)}` : ""
            }`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/balance?userId=${
              user.id
            }${period ? `&period__gte=${getRelativeDate(period)}` : ""}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          ),
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
  }, [period, reportType, user?.id, getToken]);

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

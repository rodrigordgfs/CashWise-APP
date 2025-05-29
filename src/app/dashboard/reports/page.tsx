"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ReportFilters } from "@/components/ui/reports/ReportFilters";
import { IncomeVsExpensesChart } from "@/components/ui/reports/IncomeVsExpensesChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { BalanceEvolutionChart } from "@/components/ui/reports/BalanceEvolutionChart";
import { ReportsPageSkeleton } from "@/components/ui/reports/ReportsPageSkeleton";

export default function ReportsPage() {
  const [period, setPeriod] = useState("1month");
  const [reportType, setReportType] = useState("income-expense");
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [categoryReports, setCategoryReports] = useState([]);
  const [balanceReports, setBalanceReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const [monthlyRes, categoryRes, balanceRes] = await Promise.all([
          fetch("/api/reports/monthly"),
          fetch("/api/reports/categories"),
          fetch("/api/reports/balance"),
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
        console.error("Erro ao carregar relatórios:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ReportsPageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Relatórios"
        actionTitle="Exportar"
        actionIcon={Download}
        onActionClick={() => {
          console.log("Exporting reports...");
        }}
      />
      <ReportFilters
        initialPeriod={period}
        initialReportType="income-expense"
        onPeriodChange={setPeriod}
        onReportTypeChange={setReportType}
      />

      <div className="grid gap-4">
        {reportType === "income-expense" ? (
          <IncomeVsExpensesChart data={monthlyReports} />
        ) : reportType === "categories" ? (
          <ExpensesByCategoryChart data={categoryReports} />
        ) : reportType === "balance" ? (
          <BalanceEvolutionChart data={balanceReports} />
        ) : null}
      </div>
    </div>
  );
}

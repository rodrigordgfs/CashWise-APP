"use client";

import { Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ReportFilters } from "@/components/ui/reports/ReportFilters";
import { IncomeVsExpensesChart } from "@/components/ui/reports/IncomeVsExpensesChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { BalanceEvolutionChart } from "@/components/ui/reports/BalanceEvolutionChart";
import { ReportsPageSkeleton } from "@/components/ui/reports/ReportsPageSkeleton";
import { useReports } from "@/context/reportContext";
import { ReportTypeEnum } from "@/types/Report.type";

export default function ReportsPage() {
  const {
    period,
    setPeriod,
    reportType,
    setReportType,
    monthlyReports,
    categoryReports,
    balanceReports,
    isLoading,
  } = useReports();

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
        initialReportType={reportType}
        onPeriodChange={setPeriod}
        onReportTypeChange={setReportType}
      />

      <div className="grid gap-4">
        {reportType === ReportTypeEnum.INCOME_EXPENSE ? (
          <IncomeVsExpensesChart data={monthlyReports} />
        ) : reportType === ReportTypeEnum.CATEGORIES ? (
          <ExpensesByCategoryChart data={categoryReports} />
        ) : reportType === ReportTypeEnum.BALANCE ? (
          <BalanceEvolutionChart data={balanceReports} />
        ) : null}
      </div>
    </div>
  );
}

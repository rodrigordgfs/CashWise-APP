"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewTiles } from "@/components/ui/dashboard/OverviewTiles";
import { MonthlyEvolutionChart } from "@/components/ui/dashboard/MonthlyEvolutionChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { RecentTransactionsList } from "@/components/ui/dashboard/RecentTransactionsList";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { useDashboard } from "@/context/dashboardContext";
import { EmptyState } from "@/components/shared/EmptyState";
import { Period } from "@/types/Period.type";
import { useTranslation } from "react-i18next";
import { Tabs } from "@/components/shared/Tabs";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const {
    isLoading,
    summary,
    monthlyData,
    category,
    recentTransactions,
    period,
    setPeriod,
  } = useDashboard();
  const { t } = useTranslation();
  const user = useUser();

  const periodTabs = [
    { label: t("dashboard.week"), value: Period.WEEK },
    { label: t("dashboard.month"), value: Period.MONTH },
    { label: t("dashboard.year"), value: Period.YEAR },
  ];

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title={t("dashboard.title")} subtitle={user.user?.id} />

      <div className="space-y-4">
        <Tabs tabs={periodTabs} selectedValue={period} onChange={setPeriod} />

        <OverviewTiles
          balance={summary.balance}
          totalIncome={summary.income}
          totalExpenses={summary.expense}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            {monthlyData.length > 0 ? (
              <MonthlyEvolutionChart data={monthlyData} />
            ) : (
              <div className="flex items-center justify-center h-[428px] w-full border rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                <EmptyState
                  title={t("dashboard.monthlyEvolutionNoData")}
                  description={t("dashboard.monthlyEvolutionNoDataDescription")}
                />
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            {category.length > 0 ? (
              <ExpensesByCategoryChart data={category} />
            ) : (
              <div className="flex items-center justify-center h-[428px] w-full border rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                <EmptyState
                  title={t("dashboard.expenseByCategoryNoData")}
                  description={t(
                    "dashboard.expenseByCategoryNoDataDescription"
                  )}
                />
              </div>
            )}
          </div>
        </div>

        {recentTransactions.length > 0 ? (
          <RecentTransactionsList transactions={recentTransactions} />
        ) : (
          <div className="flex items-center justify-center h-[428px] w-full border rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <EmptyState
              title={t("dashboard.recentTransactionsNoData")}
              description={t("dashboard.recentTransactionsNoDataDescription")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

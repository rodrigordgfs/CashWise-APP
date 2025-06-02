"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewTiles } from "@/components/ui/dashboard/OverviewTiles";
import { MonthlyEvolutionChart } from "@/components/ui/dashboard/MonthlyEvolutionChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { RecentTransactionsList } from "@/components/ui/dashboard/RecentTransactionsList";
import { Tabs } from "@/components/shared/Tabs";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { Period } from "@/context/transactionsContext";
import { useDashboard } from "@/context/dashboardContext";
import { EmptyState } from "@/components/shared/EmptyState";

const periodTabs = [
  { label: "Semana", value: Period.WEEK },
  { label: "Mês", value: Period.MONTH },
  { label: "Ano", value: Period.YEAR },
];

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

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Dashboard" />

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
                  title="Nenhum dado mensal encontrado"
                  description="Adicione uma nova transação para ver a evolução mensal."
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
                  title="Nenhuma despesa por categoria encontrada"
                  description="Adicione uma nova despesa para ver a distribuição por categoria."
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
              title="Nenhuma transação recente encontrada"
              description="Adicione uma nova transação para ver as transações recentes."
            />
          </div>
        )}
      </div>
    </div>
  );
}

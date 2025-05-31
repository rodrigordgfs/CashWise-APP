"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewTiles } from "@/components/ui/dashboard/OverviewTiles";
import { MonthlyEvolutionChart } from "@/components/ui/dashboard/MonthlyEvolutionChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { RecentTransactionsList } from "@/components/ui/dashboard/RecentTransactionsList";
import { Tabs } from "@/components/shared/Tabs";
import { Period, useTransaction } from "@/context/transactionsContext";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "@/types/Transaction.type";

const periodTabs = [
  { label: "Semana", value: Period.WEEK },
  { label: "Mês", value: Period.MONTH },
  { label: "Ano", value: Period.YEAR },
];

type Summary = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [summary, setSummary] = useState<Summary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const [monthlyData, setMonthlyData] = useState<
    { name: string; receitas: number; despesas: number }[]
  >([]);

  const [categoryData, setCategoryData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  const { period, setPeriod } = useTransaction();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const periodSelected = period || Period.WEEK;
      const [summaryRes, monthlyRes, categoryRes, transactionsRes] =
        await Promise.all([
          fetch(`/api/dashboard/summary?period=${periodSelected}`),
          fetch(`/api/dashboard/monthly?period=${periodSelected}`),
          fetch(`/api/dashboard/category?period=${periodSelected}`),
          fetch(`/api/dashboard/recent-transactions?period=${periodSelected}`),
        ]);

      const summaryJson = await summaryRes.json();
      const monthlyJson = await monthlyRes.json();
      const categoryJson = await categoryRes.json();
      const transactionsJson = await transactionsRes.json();

      setSummary(summaryJson);
      setMonthlyData(monthlyJson);
      setCategoryData(categoryJson);
      setRecentTransactions(transactionsJson);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Dashboard" />

      <div className="space-y-4">
        <Tabs tabs={periodTabs} selectedValue={period} onChange={setPeriod} />

        <OverviewTiles
          balance={summary.balance}
          totalIncome={summary.totalIncome}
          totalExpenses={summary.totalExpenses}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <MonthlyEvolutionChart data={monthlyData} />
          <ExpensesByCategoryChart data={categoryData} />
        </div>

        <RecentTransactionsList transactions={recentTransactions} />
      </div>
    </div>
  );
}

"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewTiles } from "@/components/ui/dashboard/OverviewTiles";
import { MonthlyEvolutionChart } from "@/components/ui/dashboard/MonthlyEvolutionChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { RecentTransactionsList } from "@/components/ui/dashboard/RecentTransactionsList";
import { Tabs } from "@/components/shared/Tabs";
import { Period, useTransaction } from "@/context/transactionsContext";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { useEffect, useState } from "react";

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

  const [recentTransactions, setRecentTransactions] = useState<
    {
      id: number;
      description: string;
      amount: number;
      date: string;
      category: string;
    }[]
  >([]);

  const { period, setPeriod } = useTransaction();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const [summaryRes, monthlyRes, categoryRes, transactionsRes] =
          await Promise.all([
            fetch("/api/dashboard/summary"),
            fetch("/api/dashboard/monthly"),
            fetch("/api/dashboard/category"),
            fetch("/api/dashboard/recent-transactions"),
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
    }

    fetchData();
  }, []);

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

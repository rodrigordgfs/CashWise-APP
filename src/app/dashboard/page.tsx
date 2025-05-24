"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { PeriodTabs } from "@/components/ui/dashboard/PeriodTabs";
import { OverviewTiles } from "@/components/ui/dashboard/OverviewTiles";
import { MonthlyEvolutionChart } from "@/components/ui/dashboard/MonthlyEvolutionChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { RecentTransactionsList } from "@/components/ui/dashboard/RecentTransactionsList";

// Dados de exemplo
const monthlyData = [
  { name: "Jan", receitas: 4000, despesas: 2400 },
  { name: "Fev", receitas: 3000, despesas: 1398 },
  { name: "Mar", receitas: 2000, despesas: 9800 },
  { name: "Abr", receitas: 2780, despesas: 3908 },
  { name: "Mai", receitas: 1890, despesas: 4800 },
  { name: "Jun", receitas: 2390, despesas: 3800 },
];

const categoryData = [
  { name: "Alimentação", value: 2400, fill: "#0ea5e9" },
  { name: "Moradia", value: 4500, fill: "#f97316" },
  { name: "Transporte", value: 1200, fill: "#8b5cf6" },
  { name: "Lazer", value: 800, fill: "#22c55e" },
  { name: "Saúde", value: 1500, fill: "#ef4444" },
];

const recentTransactions = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Receita",
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
  },
  {
    id: 4,
    description: "Restaurante",
    amount: -85,
    date: "2025-05-08",
    category: "Alimentação",
  },
  {
    id: 5,
    description: "Uber",
    amount: -25,
    date: "2025-05-07",
    category: "Transporte",
  },
];

export default function DashboardPage() {
  const totalIncome = 5000;
  const totalExpenses = 2760;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Dashboard"
        actionTitle="Nova Transação"
        actionIcon={Plus}
        onActionClick={() => {}}
      />

      <div className="space-y-4">
        <PeriodTabs />

        <OverviewTiles
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
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

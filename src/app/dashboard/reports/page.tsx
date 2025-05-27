"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ReportFilters } from "@/components/ui/reports/ReportFilters";
import { IncomeVsExpensesChart } from "@/components/ui/reports/IncomeVsExpensesChart";
import { ExpensesByCategoryChart } from "@/components/ui/dashboard/ExpensesByCategoryChart";
import { BalanceEvolutionChart } from "@/components/ui/reports/BalanceEvolutionChart";

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

const balanceData = [
  { name: "Jan", saldo: 1600 },
  { name: "Fev", saldo: 3202 },
  { name: "Mar", saldo: -4600 },
  { name: "Abr", saldo: -1128 },
  { name: "Mai", saldo: -2910 },
  { name: "Jun", saldo: -1410 },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("1month");
  const [reportType, setReportType] = useState("income-expense");

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
        {reportType === "income-expense" && (
          <IncomeVsExpensesChart data={monthlyData} />
        )}

        {reportType === "categories" && (
          <ExpensesByCategoryChart data={categoryData} />
        )}

        {reportType === "balance" && (
          <BalanceEvolutionChart data={balanceData} />
        )}
      </div>
    </div>
  );
}

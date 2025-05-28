import { Category } from "@/types/CategoryType";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";
import { NextResponse } from "next/server";

export async function GET() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Alimentação",
      type: TransactionTypeFilter.Expense,
      color: "#0ea5e9",
      icon: "🍔",
    },
    {
      id: 2,
      name: "Moradia",
      type: TransactionTypeFilter.Expense,
      color: "#f97316",
      icon: "🏠",
    },
    {
      id: 3,
      name: "Transporte",
      type: TransactionTypeFilter.Expense,
      color: "#8b5cf6",
      icon: "🚗",
    },
    {
      id: 4,
      name: "Lazer",
      type: TransactionTypeFilter.Expense,
      color: "#22c55e",
      icon: "🎮",
    },
    {
      id: 5,
      name: "Saúde",
      type: TransactionTypeFilter.Expense,
      color: "#ef4444",
      icon: "💊",
    },
    {
      id: 6,
      name: "Educação",
      type: TransactionTypeFilter.Expense,
      color: "#06b6d4",
      icon: "📚",
    },
    {
      id: 7,
      name: "Salário",
      type: TransactionTypeFilter.Income,
      color: "#10b981",
      icon: "💰",
    },
    {
      id: 8,
      name: "Freelance",
      type: TransactionTypeFilter.Income,
      color: "#6366f1",
      icon: "💻",
    },
    {
      id: 9,
      name: "Investimentos",
      type: TransactionTypeFilter.Income,
      color: "#f59e0b",
      icon: "📈",
    },
  ];

  return NextResponse.json(categories, {
    status: 200,
  });
}

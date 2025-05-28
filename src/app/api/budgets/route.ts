import { Budget } from "@/types/BudgeType";
import { NextResponse } from "next/server";

export async function GET() {
  const budgets: Budget[] = [
    {
      id: 1,
      category: "Alimentação",
      icon: "🍔",
      color: "#0ea5e9",
      limit: 800,
      spent: 650,
      month: "2025-05",
    },
    {
      id: 2,
      category: "Moradia",
      icon: "🏠",
      color: "#f97316",
      limit: 1500,
      spent: 1200,
      month: "2025-05",
    },
    {
      id: 3,
      category: "Transporte",
      icon: "🚗",
      color: "#8b5cf6",
      limit: 400,
      spent: 250,
      month: "2025-05",
    },
    {
      id: 4,
      category: "Lazer",
      icon: "🎮",
      color: "#22c55e",
      limit: 300,
      spent: 280,
      month: "2025-05",
    },
    {
      id: 5,
      category: "Saúde",
      icon: "💊",
      color: "#ef4444",
      limit: 500,
      spent: 150,
      month: "2025-05",
    },
  ];

  return NextResponse.json(budgets, {
    status: 200,
  });
}

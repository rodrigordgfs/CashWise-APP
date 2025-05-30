import { Budget } from "@/types/Budge.type";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newBudget = {
      id: Math.floor(Math.random() * 10000),
      spent: 0,
      icon: "🏷️",
      color: "#0ea5e9",
      ...body,
    };

    return NextResponse.json(newBudget, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar o orçamento" },
      { status: 500 }
    );
  }
}

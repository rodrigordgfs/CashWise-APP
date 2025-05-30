import { Category } from "@/types/Category.type";
import { TransactionType } from "@/types/Transaction.type";
import { NextResponse } from "next/server";

const categories: Category[] = [
  {
    id: 1,
    name: "Alimentação",
    type: TransactionType.Expense,
    color: "#0ea5e9",
    icon: "🍔",
  },
  {
    id: 2,
    name: "Moradia",
    type: TransactionType.Expense,
    color: "#f97316",
    icon: "🏠",
  },
  {
    id: 3,
    name: "Transporte",
    type: TransactionType.Expense,
    color: "#8b5cf6",
    icon: "🚗",
  },
  {
    id: 4,
    name: "Lazer",
    type: TransactionType.Expense,
    color: "#22c55e",
    icon: "🎮",
  },
  {
    id: 5,
    name: "Saúde",
    type: TransactionType.Expense,
    color: "#ef4444",
    icon: "💊",
  },
  {
    id: 6,
    name: "Educação",
    type: TransactionType.Expense,
    color: "#06b6d4",
    icon: "📚",
  },
  {
    id: 7,
    name: "Salário",
    type: TransactionType.Income,
    color: "#10b981",
    icon: "💰",
  },
  {
    id: 8,
    name: "Freelance",
    type: TransactionType.Income,
    color: "#6366f1",
    icon: "💻",
  },
  {
    id: 9,
    name: "Investimentos",
    type: TransactionType.Income,
    color: "#f59e0b",
    icon: "📈",
  },
];

export async function GET() {
  return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newCategory: Category = {
      id: categories.length + 1,
      name: data.name,
      type: data.type,
      color: data.color,
      icon: data.icon,
    };
    categories.push(newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 400 }
    );
  }
}

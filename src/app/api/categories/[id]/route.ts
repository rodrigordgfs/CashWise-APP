import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/types/CategoryType";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

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

export async function PATCH(request: NextRequest) {
  try {
    const idParam = request.nextUrl.pathname.split("/").pop();
    const id = parseInt(idParam || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const data = await request.json();

    const index = categories.findIndex((cat) => cat.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    categories[index] = { ...categories[index], ...data, id };

    return NextResponse.json(categories[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const idParam = request.nextUrl.pathname.split("/").pop();
    const id = parseInt(idParam || "", 10);

    const index = categories.findIndex((cat) => cat.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    const deleted = categories.splice(index, 1)[0];

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

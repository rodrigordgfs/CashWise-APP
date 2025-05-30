import { Budget } from "@/types/Budge.type";
import { NextRequest, NextResponse } from "next/server";

// Simula armazenamento em memória
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

// PATCH - Atualiza um orçamento pelo id
export async function PATCH(request: NextRequest) {
  try {
    const idParam = request.nextUrl.pathname.split("/").pop();
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const data = await request.json();

    const index = budgets.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }

    budgets[index] = { ...budgets[index], ...data, id };

    return NextResponse.json(budgets[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

// DELETE - Remove um orçamento pelo id
export async function DELETE(request: NextRequest) {
  try {
    const idParam = request.nextUrl.pathname.split("/").pop();
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const index = budgets.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }

    const deleted = budgets.splice(index, 1)[0];

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

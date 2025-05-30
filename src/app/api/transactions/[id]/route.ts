import { NextRequest, NextResponse } from "next/server";
import { TransactionType } from "@/types/Transaction.type";
import { Transaction } from "@/types/Transaction.type";

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
    account: "Nubank",
    type: TransactionType.Expense,
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Salário",
    account: "Itaú",
    type: TransactionType.Income,
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
    account: "Nubank",
    type: TransactionType.Expense,
  },
  {
    id: 4,
    description: "Freelance",
    amount: 1500,
    date: "2025-05-05",
    category: "Freelance",
    account: "Itaú",
    type: TransactionType.Income,
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

    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Transação não encontrada" }, { status: 404 });
    }

    transactions[index] = { ...transactions[index], ...data, id };

    return NextResponse.json(transactions[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

// DELETE: Excluir uma transação
export async function DELETE(request: NextRequest) {
  try {
    const idParam = request.nextUrl.pathname.split("/").pop();
    const id = parseInt(idParam || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Transação não encontrada" }, { status: 404 });
    }

    const deleted = transactions.splice(index, 1)[0];

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

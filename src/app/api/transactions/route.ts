import { NextResponse } from "next/server";
import { Transaction } from "@/types/TransactionType";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";

// Dados simulados (em memória)
const transactions: Transaction[] = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Salário",
    account: "Itaú",
    type: TransactionTypeFilter.Income,
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
    account: "Nubank",
    type: TransactionTypeFilter.Expense,
  },
  {
    id: 4,
    description: "Freelance",
    amount: 1500,
    date: "2025-05-05",
    category: "Freelance",
    account: "Itaú",
    type: TransactionTypeFilter.Income,
  },
];

export async function GET() {
  return NextResponse.json(transactions, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description: data.description,
      amount: data.amount,
      date: data.date,
      category: data.category,
      account: data.account,
      type: data.type,
    };

    transactions.push(newTransaction);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

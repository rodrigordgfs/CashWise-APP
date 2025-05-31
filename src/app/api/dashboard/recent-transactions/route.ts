import { Transaction, TransactionType } from "@/types/Transaction.type";
import { NextResponse } from "next/server";

const recentTransactions: Transaction[] = [
  {
    id: 1,
    description: "Supermercado",
    amount: 250,
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
    amount: 1200,
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

export async function GET() {
  return NextResponse.json(recentTransactions);
}

import { Transaction, TransactionType } from "@/types/Transaction.type";
import { NextResponse } from "next/server";

const recentTransactions: Transaction[] = [
  {
    id: "b77e5a31-7bf0-4b74-9165-ea858603bc81",
    description: "Supermercado",
    amount: 250,
    date: "2025-05-18",
    category: {
      id: "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
      name: "Alimentação",
      type: TransactionType.Expense,
    },
    account: "Nubank",
    type: TransactionType.Expense,
  },
  {
    id: "c3f8b2d1-5e4a-4b6c-9f0d-7e8f9a0b1c2d",
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: {
      id: "c3f8b2d1-5e4a-4b6c-9f0d-7e8f9a0b1c2d",
      name: "Salário",
      type: TransactionType.Income,
    },
    account: "Itaú",
    type: TransactionType.Income,
  },
];

export async function GET() {
  return NextResponse.json(recentTransactions);
}

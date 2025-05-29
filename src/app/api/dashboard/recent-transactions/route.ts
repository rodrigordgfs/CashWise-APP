import { NextResponse } from "next/server";

const recentTransactions = [
  {
    id: 1,
    description: "Supermercado",
    amount: -250,
    date: "2025-05-18",
    category: "Alimentação",
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000,
    date: "2025-05-15",
    category: "Receita",
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -1200,
    date: "2025-05-10",
    category: "Moradia",
  },
  {
    id: 4,
    description: "Restaurante",
    amount: -85,
    date: "2025-05-08",
    category: "Alimentação",
  },
  {
    id: 5,
    description: "Uber",
    amount: -25,
    date: "2025-05-07",
    category: "Transporte",
  },
];

export async function GET() {
  return NextResponse.json(recentTransactions);
}

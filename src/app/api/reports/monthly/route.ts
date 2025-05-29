import { NextResponse } from "next/server";

const monthlyData = [
  { name: "Jan", receitas: 4000, despesas: 2400 },
  { name: "Fev", receitas: 3000, despesas: 1398 },
  { name: "Mar", receitas: 2000, despesas: 9800 },
  { name: "Abr", receitas: 2780, despesas: 3908 },
  { name: "Mai", receitas: 1890, despesas: 4800 },
  { name: "Jun", receitas: 2390, despesas: 3800 },
];

export async function GET() {
  return NextResponse.json(monthlyData);
}

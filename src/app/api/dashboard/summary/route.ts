import { NextResponse } from "next/server";

const totalIncome = 5000;
const totalExpenses = 2760;
const balance = totalIncome - totalExpenses;

export async function GET() {
  return NextResponse.json({ totalIncome, totalExpenses, balance });
}

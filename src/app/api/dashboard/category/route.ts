import { NextResponse } from "next/server";

const categoryData = [
  { name: "Alimentação", value: 2400, fill: "#0ea5e9" },
  { name: "Moradia", value: 4500, fill: "#f97316" },
  { name: "Transporte", value: 1200, fill: "#8b5cf6" },
  { name: "Lazer", value: 800, fill: "#22c55e" },
  { name: "Saúde", value: 1500, fill: "#ef4444" },
];

export async function GET() {
  return NextResponse.json(categoryData);
}

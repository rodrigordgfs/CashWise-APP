import { NextResponse } from "next/server";

const balanceData = [
  { name: "Jan", saldo: 1600 },
  { name: "Fev", saldo: 3202 },
  { name: "Mar", saldo: -4600 },
  { name: "Abr", saldo: -1128 },
  { name: "Mai", saldo: -2910 },
  { name: "Jun", saldo: -1410 },
];

export async function GET() {
  return NextResponse.json(balanceData);
}

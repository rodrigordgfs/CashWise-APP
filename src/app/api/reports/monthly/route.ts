import { getRelativeDate } from "@/utils/relativeDate";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { userId, getToken } = await auth();

  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = request.nextUrl.searchParams.get("period")?.trim() || "";

  const url =
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/reports/monthly?userId=${userId}` +
    (period
      ? `&period__gte=${encodeURIComponent(getRelativeDate(period))}`
      : "");

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao buscar relatorios: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar relatorios" },
      { status: 500 }
    );
  }
}

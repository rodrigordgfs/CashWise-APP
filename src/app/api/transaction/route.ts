import { getRelativeDate } from "@/utils/relativeDate";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { userId, getToken } = await auth();

  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawDateGte = request.nextUrl.searchParams.get("date__gte");
  const dateGte = rawDateGte ? getRelativeDate(rawDateGte.trim()) : undefined;

  const params = {
    search: request.nextUrl.searchParams.get("search")?.trim() || undefined,
    date: request.nextUrl.searchParams.get("date")?.trim() || undefined,
    date__gte: dateGte,
    sort: request.nextUrl.searchParams.get("sort")?.trim() || undefined,
    type: request.nextUrl.searchParams.get("type")?.trim() || undefined,
    limit: request.nextUrl.searchParams.get("limit")?.trim() || undefined,
    userId: userId || undefined,
  };

  const url = new URL("/transaction", process.env.NEXT_PUBLIC_BASE_URL_API);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao buscar transações: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar transações" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/transaction`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao criar transação: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch POST error:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar transação" },
      { status: 500 }
    );
  }
}

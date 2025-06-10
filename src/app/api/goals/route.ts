import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const { userId, getToken } = await auth();

  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal?userId=${userId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao buscar metas: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar metas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { getToken, userId } = await auth();
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/goal`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        ...body,
        userId,
      },
    });

    const data = await res.json();

    console.log("Response status:", res.status);
    console.log("Response body:", data);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao criar metas: ${res.statusText}` },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch POST error:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar metas" },
      { status: 500 }
    );
  }
}

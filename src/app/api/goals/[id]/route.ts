import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// PATCH
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/goals/${id}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao atualizar metas: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch PATCH error:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar metas" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/goals/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao deletar meta: ${res.statusText}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: "Meta deletada com sucesso." });
  } catch (error) {
    console.error("Fetch DELETE error:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar meta" },
      { status: 500 }
    );
  }
}

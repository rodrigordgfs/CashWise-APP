import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// PATCH
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const { userId, getToken } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing budget ID" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token = await getToken();

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget/${id}`;

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
        { error: `Erro ao atualizar orçamento: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch PATCH error:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar orçamento" },
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

  if (!id) {
    return NextResponse.json({ error: "Missing budget ID" }, { status: 400 });
  }

  const { userId, getToken } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await getToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erro ao deletar orçamento: ${res.statusText}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: "Orçamento deletado com sucesso." });
  } catch (error) {
    console.error("DELETE error", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

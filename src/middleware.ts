// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicAuthRoute = createRouteMatcher(["/login", "/register"]);
// Removi a constante isVerifyAccountRoute pois não será mais usada

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  if (!userId) {
    if (isDashboardRoute(req)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Pode manter a busca do usuário, se quiser usar depois
  try {
    await clerkClient.users.getUser(userId);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.next();
  }

  // Removeu-se a verificação de email e redirecionamento para /verify-account

  if (isPublicAuthRoute(req) || pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    // "/verify-account", removido da lista pois a rota não precisa ser protegida aqui
    "/dashboard/:path*",
    "/api/:path*",
  ],
};

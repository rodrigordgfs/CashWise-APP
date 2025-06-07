import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // 👈 Correto
import { NextResponse } from "next/server";

// Rota protegida
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Rotas de autenticação — redireciona se já estiver logado
const isAuthRoute = createRouteMatcher([
  "/login",
  "/register",
  "/verify-account",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // 👈 Correto com await
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Redireciona para login se não autenticado e tentando acessar rota protegida
  if (!userId && isProtectedRoute(req)) {
    if (pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Se autenticado, buscamos o user para verificar o e-mail
  let user;
  if (userId) {
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  }

  // Se logado e acessando rota de login/register, redireciona para dashboard
  if (userId && isAuthRoute(req)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Se logado e acessando rota protegida, mas email não verificado
  if (
    userId &&
    isProtectedRoute(req) &&
    user?.primaryEmailAddress?.verification?.status !== "verified"
  ) {
    url.pathname = "/verify-account";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/",
    "/login",
    "/register",
    "/verify-account",
  ],
};

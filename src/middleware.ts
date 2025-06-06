import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rota protegida
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Rotas de autenticação (login e registro) — você redireciona dessas se já estiver logado
const isAuthRoute = createRouteMatcher(["/login", "/register", "/verify-email"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Se usuário não logado tenta acessar rota protegida
  if (!userId && isProtectedRoute(req)) {
    if (pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Se usuário logado tenta acessar /login ou /register, redireciona para /dashboard
  if (userId && isAuthRoute(req)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Permite acesso normal a qualquer outra rota
  return NextResponse.next();
});

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/", "/login", "/register", "/verify-email"],
};
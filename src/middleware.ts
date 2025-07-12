import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicAuthRoute = createRouteMatcher(["/login", "/register"]);

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

  try {
    const user = await clerkClient.users.getUser(userId);
    const emailVerified =
      user.primaryEmailAddress?.verification?.status === "verified";

    // Se o e-mail não está verificado, força ir para /verify-account
    if (!emailVerified) {
      if (pathname !== "/verify-account") {
        url.pathname = "/verify-account";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.next();
  }

  // Redireciona para /dashboard apenas se estiver em página pública e não /verify-account
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
    "/verify-account",
    "/dashboard/:path*",
    "/api/:path*",
  ],
};

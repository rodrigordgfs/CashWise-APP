import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const isAuthRoute = createRouteMatcher([
  "/login",
  "/register",
  "/verify-account",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  if (!userId && isProtectedRoute(req)) {
    if (pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let user;
  if (userId) {
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  }

  if (userId && isAuthRoute(req)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (
    userId &&
    isProtectedRoute(req) &&
    pathname !== "/verify-account" &&
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

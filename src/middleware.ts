// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAuthRoute = createRouteMatcher([
  "/login",
  "/register",
  "/verify-account",
]);
const isVerifyRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  if (!userId) {
    if (isVerifyRoute(req)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (isProtectedRoute(req)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  let user;
  try {
    user = await clerkClient.users.getUser(userId);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.next();
  }

  const emailVerified =
    user?.primaryEmailAddress?.verification?.status === "verified";

  if (!emailVerified) {
    if (!isVerifyRoute(req)) {
      url.pathname = "/verify-account";
      return NextResponse.redirect(url);
    }
    // return NextResponse.next();
  }

  // Email verificado
  if (isAuthRoute(req) || isVerifyRoute(req) || pathname === "/") {
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

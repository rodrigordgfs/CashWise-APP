import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const isAuthRoute = createRouteMatcher([
  "/login",
  "/register",
  "/verify-email",
  "/verify-account",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // If user is not authenticated and trying to access protected route
  if (!userId && isProtectedRoute(req)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user is authenticated, get user details
  let user;
  if (userId) {
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      // If we can't get user details, redirect to login
      if (isProtectedRoute(req)) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }
  }

  // If authenticated user is on auth routes, redirect to dashboard or verify page
  if (userId && isAuthRoute(req)) {
    // Check if email is verified
    const isEmailVerified = user?.primaryEmailAddress?.verification?.status === "verified";
    
    if (isEmailVerified) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    } else {
      // Only redirect to verify-account if not already there
      if (pathname !== "/verify-account" && pathname !== "/verify-email") {
        url.pathname = "/verify-account";
        return NextResponse.redirect(url);
      }
    }
  }

  // If authenticated user is accessing protected route but email not verified
  if (userId && isProtectedRoute(req) && user) {
    const isEmailVerified = user.primaryEmailAddress?.verification?.status === "verified";
    
    if (!isEmailVerified && pathname !== "/verify-account" && pathname !== "/verify-email") {
      url.pathname = "/verify-account";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
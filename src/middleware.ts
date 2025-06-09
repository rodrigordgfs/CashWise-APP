// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicAuthRoute = createRouteMatcher(["/login", "/register"]);
const isVerifyAccountRoute = createRouteMatcher(["/verify-account"]);

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

  let user;
  try {
    user = await clerkClient.users.getUser(userId);
    console.log("User fetched:", JSON.stringify(user, null, 2));
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.next();
  }

  const emailVerified = user.emailAddresses.some(
    (email) => email?.verification?.status === "verified"
  );

  if (!emailVerified) {
    if (!isVerifyAccountRoute(req)) {
      url.pathname = "/verify-account";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isPublicAuthRoute(req) || isVerifyAccountRoute(req) || pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("social");

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const protectedRoutes = ["/", "/profile", "/friends", "/bookmark"];
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth");

  // ✅ If user is logged in and trying to go to /auth, redirect to home
  if (isAuthPage && token) {
    try {
      await jwtVerify(token, secret);
      url.pathname = "/";
      return NextResponse.redirect(url);
    } catch (err) {
      // invalid token, allow to continue to /auth
      return NextResponse.next();
    }
  }

  // ✅ If trying to access protected route without a valid token, redirect to /auth
  if (isProtected) {
    if (!token) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

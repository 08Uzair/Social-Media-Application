import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("social");
export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log(token, "This is TOKEN From Cookies");
  const url = req.nextUrl.clone();
  console.log(url, "This is URL From Middleware");
  const pathname = url.pathname;
  console.log(pathname, "This is PATHNAME From Middleware");

  const protectedRoutes = ["/", "/profile", "/friends", "/bookmark"];

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected) {
    if (!token) {
      url.pathname = "/auth";
      console.log(token, "This is TOKEN From Cookies");
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

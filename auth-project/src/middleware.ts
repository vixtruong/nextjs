import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register", "/abc"];

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value || null;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/oauth")) {
    return NextResponse.next();
  }

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (!isPublic && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};

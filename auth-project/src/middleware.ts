import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value || null;
  const { pathname } = req.nextUrl;

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

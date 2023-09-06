// file used to create middleware for the application
// every request will go through this file

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    {
      const token = request.cookies.get("token")?.value;
      const { pathname } = request.nextUrl;
      const isAuthPage =
        pathname === "/auth/login" || pathname === "/auth/register";
      if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      if (!isAuthPage && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      return NextResponse.next();
    }
  } catch (error) {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

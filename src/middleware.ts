import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/home", "/leader-board", "/profile", "/settings"];
const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access-token")?.value;
  const refreshToken = request.cookies.get("refresh-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && (!token || !refreshToken)) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("from", pathname);

    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");

    return response;
  }

  if (isPublicRoute && (token || refreshToken)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

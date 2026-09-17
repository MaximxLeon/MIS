// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session";
const AUTH_ROUTE = "/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isAuthRoute =
    pathname === AUTH_ROUTE || pathname.startsWith(`${AUTH_ROUTE}/`);

  const isAuthenticated = Boolean(sessionToken);

  // Авторизованный пользователь открывает /auth
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Неавторизованный пользователь открывает приватный маршрут
  if (!isAuthenticated && !isAuthRoute) {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

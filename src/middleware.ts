// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/",
  "/dashboard",
  "/register",
  "/products",
  "/brands",
  "/cart",
  "/categories",
  "/collections",
];

const PUBLIC_AUTH_ROUTES = ["/login"];

const LOGIN_URL = "/login";
const HOME_URL = "/";
const JWT_COOKIE_KEY = "auth_token";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const jwt = request.cookies.get(JWT_COOKIE_KEY)?.value;
  const isProtected = PROTECTED_ROUTES.some(
    (route) =>
      pathname === route ||
      (route.length > 1 && pathname.startsWith(route + "/"))
  );
  const isPublicAuth = PUBLIC_AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (jwt && isPublicAuth) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }

  // Logic for Unauthenticated Users (Enforce protection)
  if (!jwt && isProtected) {
    // Redirect from a protected route (/dashboard) to /login
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }
  return NextResponse.next();
}

// Configuration to specify which paths the middleware should run on
export const config = {
  matcher: [
    // This is the correct, catch-all pattern to avoid running on static assets.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

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

const AUTH_ME_URL = `${process.env.BASE_URL}/api/Auth/me`;

export async function middleware(request: NextRequest) {
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

  // redirects already auth to home dashbpard
  if (jwt && isPublicAuth) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
    // return NextResponse.redirect(new URL(HOME_URL));
  }

  // Logic for Unauthenticated Users (Enforce protection)
  if (!jwt && isProtected) {
    // Redirect from a protected route (/dashboard) to /login
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }
  
  // has jwt but lets check if valid not expired
  if (jwt && isProtected) {
    try {
      const res = await fetch(AUTH_ME_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      // If token is expired or invalid
      if (res.status === 401) throw new Error("Token expired or invalid");
      
    } catch (err) {
      console.error("Error validating token in middleware:", err);
      const response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
      response.cookies.delete(JWT_COOKIE_KEY);
      return response;
    }
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

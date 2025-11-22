import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/routes";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const { auth } = NextAuth(authConfig);

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request
  const pathname = req.nextUrl.pathname;

  // Handle locale-specific paths
  const pathnameWithoutLocale = pathname.replace(/^\/(?:fr|en|ar)/, "");

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("/favicon.ico") ||
    pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  const session = await auth();

  // Check if the current path (without locale) is a public route
  const isPublicRoute = PUBLIC_ROUTES.includes(pathnameWithoutLocale);

  // Handle root path separately to prevent redirect loops
  if (pathnameWithoutLocale === ROOT || pathnameWithoutLocale === "") {
    if (session) {
      // If user is authenticated at root, redirect to dashboard
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
    }
    // If not authenticated at root, allow access
    return intlMiddleware(req);
  }

  if (session) {
    // Authenticated users shouldn't access public routes except root
    if (isPublicRoute) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
    }
  } else {
    // Non-authenticated users can only access public routes
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL(ROOT, req.url));
    }
  }

  // Apply next-intl middleware for all other cases
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Match all locale prefixes
    "/(fr|en|ar)/:path*",
  ],
};

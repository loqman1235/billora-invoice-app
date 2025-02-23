import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/routes";
import { auth } from "./auth";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Handle next-intl routing first
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  const session = await auth();
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) => path.startsWith(route));

  if (session && isPublicRoute && path !== DEFAULT_REDIRECT) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
  }

  if (!session && !isPublicRoute && path !== ROOT) {
    return NextResponse.redirect(new URL(ROOT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
    // Explicitly include language prefixes (e.g., `/en`, `/fr`)
    "/(fr|en|ar)/:path*",
  ],
};

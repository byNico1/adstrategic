import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { i18n } from "./i18n-config"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip files in public and API routes
  if (
    ["/addstrategic-180.webp", "/info.jpg", "/addstrategic_banner.png", "/favicon.ico"].includes(pathname) ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  )
    return

  // Check if pathname already has a supported locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request) || i18n.defaultLocale

    // Special case for root to avoid double redirects if possible
    if (pathname === "/") {
       return NextResponse.rewrite(new URL(`/${locale}`, request.url))
    }

    // Rewrite all other routes to include the locale prefix internally
    return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image.png|twitter-image.png).*)",
  ],
}

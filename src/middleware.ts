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

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      "/assets/process/web/wireframe-preview.jpg",
      "/assets/process/web/loading-ready.svg",
      "/assets/process/web/wireframe-dev.gif",
      "/assets/process/web/reviews.webp",
      "/assets/process/marketing/define-goals.webp",
      "/assets/process/marketing/record-content.webp",
      "/assets/process/marketing/target-audience.webp",
      "/assets/process/marketing/optimization.webp",
      "/assets/icons/advertising.png",
      "/assets/icons/performance.png",
      "/assets/icons/check-svgrepo-com.svg",
      "/assets/icons/guarantee-certificate.png",
      "/assets/icons/loading-spinner.gif",
      "/assets/icons/quote.png",
      "/assets/icons/diseno.png",
      "/assets/icons/mobile.png",
      "/assets/icons/images.png",
      "/assets/icons/tailored-design.png",
      "/assets/icons/recruitment.png",
      "/assets/people/alexander.jpg",
      "/assets/people/edwin.jpg",
      "/assets/people/harold.jpg",
      "/assets/people/david.jpg",
      "/assets/results/adstrategic-website.png",
      "/assets/results/nico-portfolio.webp",
      "/assets/results/e-commerce.png",
      "/assets/results/selfimprovingbooks.png",
      "/assets/results/google-analytics.png",
      "/assets/results/youtube-analytics.png",
      "/adstrategic-180.webp",
      "/hero.webp",
      "/info.jpg",
      // Your other files in `public`
    ].includes(pathname)
  )
    return

  if (pathname === "/" || pathname === "/en" || pathname === "/es") {
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)

      if (locale === i18n.defaultLocale) {
        return NextResponse.rewrite(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
      }

      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
    }
  } else {
    return NextResponse.rewrite(new URL(`/en${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  // matcher: ["/", "/en", "/es"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

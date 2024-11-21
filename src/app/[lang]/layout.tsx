import { GoogleTagManager } from "@next/third-parties/google"
import { Inter, Roboto } from "next/font/google"
import "@/styles/tailwind.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

import { ThemeProvider } from "@/components/theme-provider"

import { i18n, type Locale } from "../../i18n-config"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const inter = Inter({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
})

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang} suppressHydrationWarning className={`${roboto.variable} ${inter.className}`}>
      <head>
        <meta name="facebook-domain-verification" content="b59t0xdxprwjqsdk3808wfek478um5" />
      </head>
      <GoogleTagManager gtmId="GTM-K3RWQCCM" />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}

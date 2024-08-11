import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import { Inter, Roboto } from "next/font/google"
import "styles/tailwind.css"
import "styles/hero.css"
import Footer from "@/components/Footer"
import Header from "./components/Header"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.className}`}>
      <head>
        <meta name="facebook-domain-verification" content="b59t0xdxprwjqsdk3808wfek478um5" />
      </head>
      <GoogleTagManager gtmId="GTM-K3RWQCCM" />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="GTM-K3RWQCCM" />
    </html>
  )
}

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import "styles/tailwind.css"
import "styles/hero.css"
import Footer from "@/components/Footer"
import Header from "./components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

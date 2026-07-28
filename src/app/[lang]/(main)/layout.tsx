import Footer from "@/components/Footer"
import HeaderContainer from "@/components/Header/HeaderContainer"
import { type Locale } from "@/src/i18n-config"

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <HeaderContainer params={params} />
      {children}
      <Footer params={params} />
    </>
  )
}

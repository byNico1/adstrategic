import dynamic from "next/dynamic"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

const Header = dynamic(() => import("@/components/Header/Header"))

export default async function HeaderContainer({ params: { lang } }: { params: { lang: Locale } }) {
  const { HeaderLinks } = await getDictionary(lang)
  return <Header headerLinks={HeaderLinks} lang={lang} />
}

import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: `${dictionary.tools.colorPalette.title} | ADDSTRATEGIC`,
    description: dictionary.tools.colorPalette.subtitle,
    alternates: { canonical: `https://www.addstrategic.com/${lang}/tools/color-palette-generator` }
  }
}

export default function ColorPaletteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: `${dictionary.tools.metaTags.title} | ADDSTRATEGIC`,
    description: dictionary.tools.metaTags.subtitle,
    alternates: { canonical: `https://www.addstrategic.com/${lang}/tools/meta-tags-generator` }
  }
}

export default function MetaTagsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

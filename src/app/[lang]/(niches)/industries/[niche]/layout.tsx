import { notFound } from "next/navigation"

import HeaderContainer from "@/components/Header/HeaderContainer"
// import { NicheHeader } from "@/components/NicheTemplate"
import { NicheFooter } from "@/components/NicheTemplate"
import { getAllNicheSlugs, getNicheConfig } from "@/src/config/niches"
import { getNicheDictionary } from "@/src/get-niche-dictionary"
import { type Locale } from "@/src/i18n-config"

export function generateStaticParams() {
  return getAllNicheSlugs().map((niche) => ({ niche }))
}

export default async function NicheLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale; niche: string }
}) {
  const config = getNicheConfig(params.niche)
  if (!config) {
    notFound()
  }

  const dictionary = await getNicheDictionary(params.niche, params.lang)

  return (
    <div className={config.themeClass}>
      <HeaderContainer params={params} />
      {/* <NicheHeader config={config} dictionary={dictionary.nav} lang={params.lang} /> */}
      <main>{children}</main>
      <NicheFooter config={config} dictionary={dictionary.footer} />
    </div>
  )
}

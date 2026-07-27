import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import HowWeWorkClient from "@/src/components/HowWeWork/HowWeWorkClient"

export const metadata: Metadata = {
  title: "How We Work | ADDSTRATEGIC",
  description: "Learn how we build your custom software and websites from onboarding to launch.",
}

import Scroller from "@/src/components/Home/Scroller"

export default async function HowWeWorkPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-[#0F172A] pt-20">
      <HowWeWorkClient data={dictionary.howWeWork} lang={lang} />
      <div className="relative z-50 bg-slate-950 py-16">
        <Scroller dictionary={dictionary.scrollerData} />
      </div>
    </main>
  )
}

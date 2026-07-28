import type { Locale } from "./i18n-config"

type NicheDictionaryLoader = () => Promise<{ default: Record<string, unknown> }>

const nicheDictionaries: Record<string, Record<Locale, NicheDictionaryLoader>> = {
  electrician: {
    en: () => import("./dictionary/niches/electrician/en.json"),
    es: () => import("./dictionary/niches/electrician/es.json"),
  },
}

export type NicheDictionary = Awaited<ReturnType<typeof getNicheDictionary>>

export async function getNicheDictionary(niche: string, locale: Locale) {
  const loaders = nicheDictionaries[niche]
  if (!loaders) {
    throw new Error(`No dictionary found for niche: ${niche}`)
  }

  const loader = loaders[locale] ?? loaders.en
  const dictModule = await loader()
  return dictModule.default as typeof import("./dictionary/niches/electrician/en.json")
}

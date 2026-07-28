import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutGrid } from "lucide-react"

import { IndustriesGrid } from "@/components/Industries/IndustriesGrid"
import Container from "@/components/Container"
import { getAllNiches } from "@/src/config/niches"
import { getDictionary } from "@/src/get-dictionary"
import { type Locale } from "@/src/i18n-config"

type PageProps = {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)
  return {
    title: dictionary.industries.metadata.title,
    description: dictionary.industries.metadata.description,
  }
}

export default async function IndustriesPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.lang)
  const niches = getAllNiches()
  const d = dictionary.industries

  return (
    <main className="relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand/8 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-slate-700/20 blur-[100px]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 text-center sm:pt-36 sm:pb-20">
        <Container>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
            <LayoutGrid className="size-3.5" aria-hidden="true" />
            {d.hero.badge}
          </div>

          {/* Heading */}
          <h1
            className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: d.hero.title }}
          />

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {d.hero.subtitle}
          </p>

          {/* Hero CTA */}
          <a
            href="#industries-grid"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all duration-200 hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(6,182,212,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
          >
            {d.hero.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Container>
      </section>

      {/* ── Industries Grid ── */}
      <Container>
        <IndustriesGrid niches={niches} lang={params.lang} dictionary={{ card: d.card, grid: d.grid }} />
      </Container>

      {/* ── "Don't see your industry?" CTA ── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 px-8 py-14 text-center shadow-2xl sm:px-16 sm:py-20">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.12)_0%,_transparent_70%)]"
            />

            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                {d.cta.title}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {d.cta.subtitle}
              </p>
              <Link
                href={`/${params.lang}${d.cta.href}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-8 py-3.5 text-sm font-semibold text-brand shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
              >
                {d.cta.button}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/shadcn/button"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: dictionary.digitalMenu.metadata.title,
    description: dictionary.digitalMenu.metadata.description,
  }
}

export default async function DigitalMenuPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  const data = dictionary.digitalMenu

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/20 via-background to-background"></div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-brand uppercase">{data.hero.eyebrow}</p>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl text-gray-900 dark:text-white">
            {data.hero.headline}
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {data.hero.subheadline}
          </p>
          <div className="mb-10 flex items-center justify-center gap-2 text-3xl font-bold">
            {data.hero.price}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg" className="bg-brand hover:bg-brand/90 text-white rounded-full px-8 py-6 text-lg">
                {data.hero.primary_cta} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{data.problemSolution.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{data.problemSolution.description}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{data.features.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="bg-brand/10 p-3 rounded-full text-brand">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium pt-3">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">{data.pricing.title}</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {data.pricing.plans.map((plan, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-500 mb-1">{plan.billing}</span>
                </div>
                {i === 1 && (
                  <Link href="/services/digital-menu/essence" className="mt-4 text-brand font-medium hover:underline">
                    Explore Essence
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <h2 className="text-4xl font-bold mb-8">{data.cta.title}</h2>
        <Link href="/#contact">
          <Button size="lg" className="bg-brand hover:bg-brand/90 text-white rounded-full px-10 py-6 text-xl">
            {data.cta.button}
          </Button>
        </Link>
      </section>
    </main>
  )
}

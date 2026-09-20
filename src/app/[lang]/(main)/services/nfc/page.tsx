import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import Link from "next/link"
import { ArrowRight, Wifi, CheckCircle2 } from "lucide-react"
import { Button } from "@/shadcn/button"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: dictionary.nfcTouchpoints.metadata.title,
    description: dictionary.nfcTouchpoints.metadata.description,
  }
}

export default async function NFCTouchpointsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  const data = dictionary.nfcTouchpoints

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-600 uppercase">{data.hero.eyebrow}</p>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl text-gray-900 dark:text-white">
            {data.hero.headline} <span className="text-blue-600">{data.hero.headline_emphasis}</span>
          </h1>
          <p className="mb-10 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {data.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg">
                {data.hero.primary_cta} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive NFC Demo Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual Demo */}
            <div className="relative h-[500px] w-full max-w-md mx-auto flex items-center justify-center">
              {/* Pulsing NFC signal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-32 h-32 rounded-full border-4 border-blue-500/40 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                <div className="absolute w-16 h-16 rounded-full border-4 border-blue-500/60 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              </div>
              
              {/* NFC Plaque */}
              <div className="relative z-10 w-32 h-32 bg-slate-900 dark:bg-white rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 transition-transform hover:rotate-0 duration-500">
                <Wifi className="w-16 h-16 text-white dark:text-slate-900 rotate-90" />
              </div>
              
              {/* Phone floating */}
              <div className="absolute z-20 w-48 h-96 bg-white dark:bg-slate-800 rounded-[2rem] border-8 border-slate-200 dark:border-slate-700 shadow-2xl right-0 bottom-0 transform translate-y-12 rotate-6">
                <div className="w-full h-full rounded-[1.5rem] bg-blue-50 dark:bg-slate-900 p-4 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="font-bold">Redirecting...</p>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div>
              <h2 className="text-4xl font-bold mb-6">{data.interactiveDemo.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">{data.interactiveDemo.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{data.useCases.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.useCases.items.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical to Digital */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-6">{data.physicalToDigital.title}</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-16">{data.physicalToDigital.description}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.audiences.items.map((audience, i) => (
              <span key={i} className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 font-medium">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <h2 className="text-4xl font-bold mb-8">{data.cta.title}</h2>
        <Link href="/#contact">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-xl">
            {data.cta.button}
          </Button>
        </Link>
      </section>
    </main>
  )
}

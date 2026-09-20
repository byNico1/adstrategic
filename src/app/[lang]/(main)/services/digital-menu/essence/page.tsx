import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import Link from "next/link"
import { CheckCircle2, ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "@/shadcn/button"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: dictionary.digitalMenuEssence.metadata.title,
    description: dictionary.digitalMenuEssence.metadata.description,
  }
}

export default async function DigitalMenuEssencePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  const data = dictionary.digitalMenuEssence

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/30 via-slate-950 to-slate-950"></div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-brand uppercase">{data.hero.eyebrow}</p>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
            {data.hero.headline} <span className="text-brand block mt-2">{data.hero.headline_emphasis}</span>
          </h1>
          <p className="mb-8 text-xl text-slate-300 max-w-2xl mx-auto">
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

      {/* Interactive Demo Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{data.interactiveDemo.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{data.interactiveDemo.description}</p>
              
              <ul className="space-y-4">
                {data.featureGrid.items.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Interactive Dish Preview */}
            <div className="relative mx-auto w-full max-w-sm rounded-[2.5rem] border-[14px] border-slate-900 bg-white dark:bg-slate-950 shadow-2xl h-[650px] overflow-hidden">
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-xl w-32 mx-auto z-20"></div>
              
              <div className="relative h-[45%] bg-slate-100 dark:bg-slate-800 overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-brand/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
                {/* Placeholder for video/image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Video/Image Preview</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Premium Steak</h3>
                  <span className="text-xl font-bold text-brand">$45</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  Grilled to perfection, served with roasted vegetables and our signature house sauce.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="font-medium">Ingredients</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="font-medium">Allergy Info</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Flow */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">{data.experienceFlow.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-slate-800 -z-10"></div>
            
            {data.experienceFlow.steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg ring-4 ring-white dark:ring-slate-950">
                  {i + 1}
                </div>
                <p className="font-medium text-sm sm:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <div className="mb-12">
          <p className="text-2xl font-bold mb-2">{data.pricing.price}</p>
          <p className="text-gray-500">{data.pricing.description}</p>
        </div>
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

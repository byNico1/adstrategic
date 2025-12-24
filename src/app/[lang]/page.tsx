import { Metadata } from "next"
import Contact from "@/components/Home/Contact"
import FAQs from "@/components/Home/FAQs"
import SheetOpener from "@/components/Home/SheetOpener"
import SponsorsSlider from "@/components/Home/SponsorsSlider"
import Testimonials from "@/components/Home/Testimonials"
import WhyUs from "@/components/Home/WhyUs"
import MultiLayerParallax from "@/components/MultiLayerParallax"
import Process from "@/home/Process"
import Scroller from "@/home/Scroller"
import Services from "@/home/Services"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)

  return {
    metadataBase: new URL("https://addstrategic.com/"),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function Web({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <SheetOpener formDictionary={dictionary.form} dictionary={dictionary.sheetOpener} />

      <MultiLayerParallax dictionary={dictionary.hero} />

      <SponsorsSlider dictionary={dictionary.sponsors} />

      <Process dictionary={dictionary.process} />

      <Services dictionary={dictionary.services} />

      <WhyUs dictionary={dictionary.whyUs} />

      <Testimonials dictionary={dictionary.testimonials} />

      <Contact dictionary={dictionary.contact} formDictionary={dictionary.form} />

      <FAQs dictionary={dictionary.faqs} />

      <Scroller dictionary={dictionary.scrollerData} />
    </main>
  )
}

import { Metadata } from "next"
import dynamic from "next/dynamic"
import FAQs from "@/components/Home/FAQs"
import SheetOpener from "@/components/Home/SheetOpener"
import Testimonials from "@/components/Home/Testimonials"
import WhyUs from "@/components/Home/WhyUs"
import MultiLayerParallax from "@/components/MultiLayerParallax"
import Process from "@/home/Process"
import Scroller from "@/home/Scroller"
import Services from "@/home/Services"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

const Contact = dynamic(() => import("@/components/Home/Contact"))

export const metadata: Metadata = {
  metadataBase: new URL("https://adstrategic.org/"),
  title: "Adstrategic - Get digital services to grow your online presence",
  description:
    "At Adstrategic, we specialize in transforming your online presence. Our expert team delivers top-notch video editing, innovative software development, social media management and advertising.",
}

export default async function Web({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <SheetOpener />

      <MultiLayerParallax />

      <Process />

      <Services />

      <WhyUs />

      <Testimonials />

      <Contact />
      <FAQs />
      <Scroller />
    </main>
  )
}

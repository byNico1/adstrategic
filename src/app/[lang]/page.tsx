import { Bell } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Form from "@/components/Form/Form"
import FAQs from "@/components/Home/FAQs"
import Testimonials from "@/components/Home/Testimonials"
import WhyUs from "@/components/Home/WhyUs"
import MultiLayerParallax from "@/components/MultiLayerParallax"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Process from "@/home/Process"
import Scroller from "@/home/Scroller"
import Services from "@/home/Services"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

export const metadata: Metadata = {
  metadataBase: new URL("https://adstrategic.org/"),
  title: "Adstrategic - Effortless business growth",
  description:
    "At Adstrategic, we specialize in transforming your online presence. Our expert team delivers top-notch video editing, innovative software development, social media management and advertising.",
}

export default async function Web({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <Sheet>
        <SheetTrigger className="fixed bottom-0 z-[199] flex items-center justify-between gap-4 bg-muted pr-5 max-sm:inset-x-0 sm:left-5 sm:bg-transparent">
          <div className="bg-primary px-5 py-2 text-primary-foreground sm:rounded-t-lg sm:p-4">
            <Bell />
          </div>
          <span className="text-xl font-bold sm:hidden sm:p-3">REQUEST PROPOSAL</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Request a Web Design and Marketing Proposal</SheetTitle>
            <Form className="!w-full" />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <MultiLayerParallax />

      <Process />

      <Services />

      <WhyUs />

      <Testimonials />

      <section id="contact" className="relative grid min-h-[70vh] px-4 py-16 text-center sm:py-24">
        <Image
          alt=""
          fill
          sizes="100vw"
          src="/info.jpg"
          style={{
            objectFit: "cover",
          }}
          className="hero z-10"
        />
        <div className="absolute inset-0 z-10 bg-[#000000c3]" />
        <div className="z-10 mx-auto max-w-2xl place-self-center text-center">
          <h2 className="mb-8 text-5xl font-extrabold text-white lg:text-7xl">
            Get a <span className="text-brand">Web Design</span> and <span className="text-brand">Marketing</span>{" "}
            Proposal
          </h2>
          <Form />
        </div>
      </section>
      <FAQs />
      <Scroller />
    </main>
  )
}

import { Metadata } from "next"
import Image from "next/image"
import AnimateInView from "@/components/Animations/AnimateInView"
import Reveal from "@/components/Animations/Reveal"
import Form from "@/components/Form/Form"
import Testimonials from "@/components/Home/Testimonials"
import MultiLayerParallax from "@/components/MultiLayerParallax"
import Process from "@/home/Process"
import Scroller from "@/home/Scroller"
import Services from "@/home/Services"

export const metadata: Metadata = {
  metadataBase: new URL("https://adstrategic.org/"),
  title: "Adstrategic - Effortless business growth",
  description:
    "At Adstrategic, we specialize in transforming your online presence. Our expert team delivers top-notch video editing, innovative software development, social media management and advertising.",
}

export default function Web() {
  return (
    <main>
      <MultiLayerParallax />
      <section className="mx-auto max-w-screen-xl px-4 pt-16 sm:pt-24 lg:px-6" id="about">
        <AnimateInView>
          <h2 className="mb-4 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:text-5xl">
            Who are <span className="text-brand">We</span>?
          </h2>
          <p className="mx-auto max-w-4xl text-center">
            We&apos;re an agency that grows businesses by delivering top-tier leads through strategic advertising on
            popular social media sites. Our targeted approach not only frees you up to concentrate on your work but also
            ensures your growth is driven by genuinely interested clients, making your business expansion smooth and
            efficient.
          </p>
        </AnimateInView>
      </section>
      <Services />
      <Process />
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
        <div className="z-10 mx-auto place-self-center">
          <h2 className="mb-2 max-w-2xl text-3xl font-extrabold !leading-tight tracking-wide text-white md:text-4xl xl:text-5xl">
            Get 10 New Top-Tier Leads
          </h2>
          <Reveal center>
            <p className="mb-12 max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-brand md:text-3xl xl:text-4xl">
              Within 30 days
            </p>
          </Reveal>
          <Form />
        </div>
      </section>
      <Scroller />
    </main>
  )
}

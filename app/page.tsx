import { Metadata } from "next"
import Image from "next/image"
import Form from "@/components/Form"
import MultiLayerParallax from "@/components/MultiLayerParallax"
import Reveal from "@/components/Reveal"
import Scroller from "@/components/Scroller"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials/Testimonials"

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
      <section className="mx-auto max-w-screen-xl px-4 py-16 sm:py-24 lg:px-6">
        <Reveal center>
          <h2 className="mb-4 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:text-5xl" id="about">
            Who are <span className="text-brand">We</span>?
          </h2>
        </Reveal>
        <p className="mx-auto max-w-4xl text-center">
          We&apos;re an agency that grows businesses by delivering top-tier leads through strategic advertising on
          popular social media sites. Our targeted approach not only frees you up to concentrate on your work but also
          ensures your growth is driven by genuinely interested clients, making your business expansion smooth and
          efficient.
        </p>
      </section>
      <Services />
      <section className="mx-auto max-w-screen-xl px-4 py-16 sm:py-24 lg:px-6">
        <Reveal center>
          <h2
            className="mb-8 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:mb-12 xl:text-5xl"
            id="process"
          >
            Our <span className="text-brand">Process</span>?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="Card">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                1
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold">Gather Content</h3>
            </div>
            <p className="text-center">
              We gather the essence of your brand - captivating visuals, engaging copy, and key messages. This lays the
              foundation for a compelling and impactful social media presence.
            </p>
          </div>
          <div className="">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                2
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold">Launching Ads</h3>
            </div>
            <p className="text-center">
              Launching Ads is where the magic happens. With data-driven precision, we ensure your message resonates,
              driving engagement and conversions for optimal social media success
            </p>
          </div>
          <div className="Card">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                3
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">Generate Leads</h3>
            </div>
            <p className="text-center">
              Our SMMA employs dynamic strategies, converting social media interactions into top-tier qualified leads
              that drive your business forward. Experience the power of strategic lead generation with our dedicated
              approach.
            </p>
          </div>
        </div>
      </section>
      <Testimonials />
      <section id="info" className="relative grid min-h-[70vh] px-4 py-16 text-center sm:py-24">
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
        <div className="z-10 mx-auto place-self-center" id="contact">
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

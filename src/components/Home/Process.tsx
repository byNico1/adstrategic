"use client"

import AnimateInView from "@/components/Animations/AnimateInView"

export default function Process() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 pt-16 sm:pt-24 lg:px-6" id="process">
      <AnimateInView givenDelay={0.05} stackIndex={1}>
        <h2 className="mb-8 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:mb-12 xl:text-5xl">
          Our <span className="text-brand">Process</span>?
        </h2>
      </AnimateInView>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="Card">
          <AnimateInView givenDelay={0.05} stackIndex={2}>
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
          </AnimateInView>
        </div>
        <div className="Card">
          <AnimateInView givenDelay={0.05} stackIndex={3}>
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
          </AnimateInView>
        </div>
        <div className="Card">
          <AnimateInView givenDelay={0.05} stackIndex={4}>
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
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}

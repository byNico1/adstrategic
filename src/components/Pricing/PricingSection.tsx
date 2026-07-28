"use client"

import { useCallback } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight, Code2, ArrowRight, Cpu, Layers, Workflow } from "lucide-react"
import Container from "@/src/components/Container"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import type { getDictionary } from "@/src/get-dictionary"

type PricingDictionary = Awaited<ReturnType<typeof getDictionary>>["pricing"]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function PricingSection({ data, lang }: { data: PricingDictionary; lang: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", breakpoints: { "(min-width: 768px)": { align: "start" } } },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const openSheet = () => {
    const el = document.getElementById("sheet-trigger")
    if (el) el.click()
  }

  return (
    <Container className="relative z-10 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-black uppercase text-white drop-shadow-lg md:text-5xl">{data.title}</h2>
        <p className="mx-auto max-w-2xl text-xl text-slate-400">{data.subtitle}</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative mx-auto max-w-6xl"
      >
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="backface-hidden -ml-4 flex py-8">
            {data.plans.map((plan, index) => {
              const isPopular = index === 2

              return (
                <div key={index} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <div
                    className={`relative flex h-full flex-col rounded-3xl border ${
                      isPopular
                        ? "border-brand bg-slate-800/90 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        : "border-slate-800 bg-slate-900/80"
                    } p-8 backdrop-blur-xl transition-all duration-300`}
                  >
                    {isPopular && (
                      <div className="shadow-brand/20 absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                        {lang === "es" ? "Más Popular" : "Most Popular"}
                      </div>
                    )}

                    <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="mb-6 h-10 text-sm text-slate-400">{plan.desc}</p>

                    <div className="mb-8">
                      <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        {lang === "es" ? "Desde" : "Starts at"}
                      </span>
                      <div className="mt-1 text-5xl font-black text-white">{plan.price}</div>
                    </div>

                    <ul className="mb-8 flex-1 space-y-4">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={openSheet}
                      className={`w-full cursor-pointer rounded-xl py-4 text-lg font-bold transition-all hover:scale-[1.02] active:scale-95 ${
                        isPopular
                          ? "shadow-brand/20 bg-brand text-white shadow-lg"
                          : "border border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {lang === "es" ? "Comenzar Proyecto" : "Start Project"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mb-8 flex justify-center gap-4 md:hidden">
          <button
            onClick={scrollPrev}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-white backdrop-blur-md transition-colors hover:border-brand hover:bg-brand"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-white backdrop-blur-md transition-colors hover:border-brand hover:bg-brand"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Custom Software Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="group relative mt-6 cursor-pointer"
          onClick={openSheet}
        >
          {/* Glow border */}
          <div className="from-brand/40 to-brand/40 absolute -inset-[1px] rounded-3xl bg-gradient-to-r via-cyan-400/20 opacity-60 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

          <div className="border-brand/20 group-hover:border-brand/40 relative overflow-hidden rounded-3xl border bg-slate-900/90 backdrop-blur-xl transition-colors duration-300">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent" />

            <div className="relative flex flex-col items-center gap-10 p-8 md:p-12 lg:flex-row">
              {/* Left: Content */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 border-brand/30 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                    <Code2 className="h-3.5 w-3.5" />
                    {data.customSoftware.eyebrow}
                  </div>
                  <div className="from-brand/30 hidden h-px flex-1 bg-gradient-to-r to-transparent sm:block" />
                </div>

                <h3 className="text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl">
                  {data.customSoftware.title}
                </h3>

                <p className="max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                  {data.customSoftware.description}
                </p>

                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2.5">
                  <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-brand" />
                  <span className="text-sm font-medium italic text-slate-300">{data.customSoftware.highlight}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-slate-700 to-transparent lg:block" />

              {/* Right: Icons + CTA */}
              <div className="flex flex-col items-center gap-8 lg:min-w-[260px]">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: <Cpu className="h-6 w-6 text-brand" />,
                      label: lang === "es" ? "Lógica a Medida" : "Custom Logic",
                    },
                    {
                      icon: <Layers className="h-6 w-6 text-brand" />,
                      label: lang === "es" ? "Full Stack" : "Full Stack",
                    },
                    {
                      icon: <Workflow className="h-6 w-6 text-brand" />,
                      label: lang === "es" ? "Automatización" : "Automation",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group-hover:border-brand/30 flex flex-col items-center gap-1.5 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-3.5 transition-colors duration-300"
                    >
                      {item.icon}
                      <span className="text-center text-[10px] font-medium leading-tight text-slate-500">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex w-full flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {data.customSoftware.badge}
                  </span>
                  <button
                    className="shadow-brand/25 hover:shadow-brand/40 group/btn flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brand px-7 py-4 text-base font-bold text-slate-900 shadow-lg transition-all duration-200 hover:bg-cyan-400"
                    aria-label={data.customSoftware.cta}
                  >
                    {data.customSoftware.cta}
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  )
}

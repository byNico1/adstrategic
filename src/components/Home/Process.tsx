"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { type getDictionary } from "@/src/get-dictionary"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function Process({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["process"] }) {
  const params = useParams()
  const lang = params?.lang || "es"

  const textEs =
    "Asumimos cada proyecto con el más alto nivel de compromiso. Aplicamos metodologías ágiles y estándares de calidad mundial para garantizar un resultado que supere tus expectativas."
  const textEn =
    "We take on every project with the highest level of commitment. We apply agile methodologies and world-class quality standards to ensure a result that exceeds your expectations."

  const ctaEs = "Mira cómo trabajar con nosotros"
  const ctaEn = "See how to work with us"

  return (
    <section
      className="relative mx-auto mb-10 max-w-screen-xl overflow-hidden px-4 pt-16 sm:pt-24 lg:px-6"
      id="process"
    >
      {/* Background glow for the section */}
      <div className="bg-brand/10 pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"></div>

      <div className="relative z-10 flex flex-col items-center">
        <h2
          className="mb-12 text-center text-5xl font-extrabold !leading-tight text-white sm:text-7xl xl:mb-16"
          dangerouslySetInnerHTML={{ __html: dictionary.title }}
        ></h2>

        <div className="hover:border-brand/30 group relative flex w-full max-w-5xl flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-[0_20px_50px_-15px_rgba(6,182,212,0.3)] transition-all duration-700 md:p-16 lg:p-20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/bgs/bg-addphone2.png"
              fill
              className="object-cover object-[60%_70%] opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
              alt="Background"
            />
            {/* Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-slate-950/70"></div>
          </div>

          {/* Subtle inside glow */}
          <div className="bg-brand/10 pointer-events-none absolute left-1/2 top-0 z-10 h-3/4 w-3/4 -translate-x-1/2 rounded-full opacity-50 blur-[80px] transition-opacity group-hover:opacity-100"></div>

          {/* Logo */}
          <div className="relative z-20 mb-10 flex w-full justify-center">
            <img
              src="/addstrategic_banner.png"
              alt="ADDSTRATEGIC Logo"
              className="w-[300px] object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-transform duration-500 hover:scale-105 md:w-[450px]"
            />
          </div>

          {/* Professional Text */}
          <p className="relative z-20 mb-12 max-w-4xl text-lg font-medium leading-relaxed text-slate-300 md:text-2xl">
            {lang === "es" ? textEs : textEn}
          </p>

          {/* Prominent CTA */}
          <Link href={`/${lang}/how-we-work`} className="relative z-20">
            <Button
              size="lg"
              className="group/btn flex h-auto items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] sm:h-16 sm:gap-3 sm:px-10 sm:text-xl"
            >
              {lang === "es" ? ctaEs : ctaEn}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-2 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

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

  const textEs = "Asumimos cada proyecto con el más alto nivel de compromiso. Aplicamos metodologías ágiles y estándares de calidad mundial para garantizar un resultado que supere tus expectativas."
  const textEn = "We take on every project with the highest level of commitment. We apply agile methodologies and world-class quality standards to ensure a result that exceeds your expectations."

  const ctaEs = "Mira cómo trabajar con nosotros"
  const ctaEn = "See how to work with us"

  return (
    <section className="mx-auto max-w-screen-xl px-4 pt-16 sm:pt-24 lg:px-6 relative overflow-hidden mb-10" id="process">
      
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] max-w-4xl bg-brand/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        <h2
          className="mb-12 text-center text-5xl font-extrabold !leading-tight sm:text-7xl xl:mb-16 text-white"
          dangerouslySetInnerHTML={{ __html: dictionary.title }}
        ></h2>
        
        <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.3)] p-8 md:p-16 lg:p-20 flex flex-col items-center text-center group transition-all duration-700 hover:border-brand/30">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/bgs/bg-addphone2.png" 
              fill 
              className="object-cover object-[60%_70%] opacity-30 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105" 
              alt="Background" 
            />
            {/* Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-slate-950/70"></div>
          </div>

          {/* Subtle inside glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-brand/10 blur-[80px] rounded-full transition-opacity opacity-50 group-hover:opacity-100 pointer-events-none z-10"></div>

          {/* Logo */}
          <div className="relative z-20 mb-10 w-full flex justify-center">
             <img 
              src="/addstrategic_banner.png" 
              alt="ADDSTRATEGIC Logo" 
              className="w-[300px] md:w-[450px] object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Professional Text */}
          <p className="relative z-20 text-lg md:text-2xl text-slate-300 font-medium max-w-4xl leading-relaxed mb-12">
            {lang === "es" ? textEs : textEn}
          </p>

          {/* Prominent CTA */}
          <Link href={`/${lang}/how-we-work`} className="relative z-20 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 text-xl font-bold bg-brand hover:bg-cyan-500 text-white rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-300 group/btn flex items-center justify-center gap-3"
            >
              {lang === "es" ? ctaEs : ctaEn}
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

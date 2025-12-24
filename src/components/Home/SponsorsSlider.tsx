"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SponsorCard from "./SponsorCard"
import { sponsors } from "@/config/sponsors"
import { useSponsorsSlider } from "@/hooks/useSponsorsSlider"
import { getDictionary } from "@/src/get-dictionary"

interface SponsorsSliderProps {
  className?: string
  dictionary: Awaited<ReturnType<typeof getDictionary>>["sponsors"]
}

export default function SponsorsSlider({ className = "", dictionary }: SponsorsSliderProps) {
  const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useSponsorsSlider()

  return (
    <section className={`relative w-full pt-16 sm:pt-24 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-brand md:text-4xl">{dictionary.title}</h2>
          <p className="mx-auto max-w-2xl text-lg">{dictionary.description}</p>
        </motion.div>

        {/* Carousel Container */}
        <div className="group relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-3 text-gray-800 opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 group-hover:opacity-100"
            aria-label="Anterior sponsor"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-3 text-gray-800 opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 group-hover:opacity-100"
            aria-label="Siguiente sponsor"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {sponsors.map((sponsor, index) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p className="mb-4 text-muted-foreground">{dictionary.cta.text}</p>
          <button className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 hover:shadow-lg">
            <a href="#contact">{dictionary.cta.link}</a>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

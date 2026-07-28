"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import { portfolioClients } from "@/src/config/portfolio"

type PortfolioPreviewDictionary = {
  eyebrow: string
  title: string
  subtitle: string
  cta: string
  locations: string
}

const FEATURED_INDICES = [1, 5, 8]

const LOCATION_BADGES = [
  { label: "USA", flag: "🇺🇸" },
  { label: "Canada", flag: "🇨🇦" },
  { label: "Colombia", flag: "🇨🇴" },
]

function PreviewCard({ item, lang, index }: { item: (typeof portfolioClients)[0]; lang: string; index: number }) {
  const [imgSrc, setImgSrc] = useState(item.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
        <div className="border-white/8 hover:border-brand/30 flex h-full flex-col overflow-hidden rounded-3xl border bg-slate-900/50 shadow-xl backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_56px_-12px_rgba(85,167,166,0.25)] group-hover:-translate-y-2">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
            <img
              src={imgSrc}
              alt={item.name}
              onError={() =>
                setImgSrc(`https://placehold.co/800x500/1e293b/ffffff?text=${encodeURIComponent(item.name)}`)
              }
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="bg-brand/0 group-hover:bg-brand/75 absolute inset-0 flex items-center justify-center opacity-0 transition-colors duration-300 group-hover:opacity-100">
              <div className="translate-y-3 rounded-full bg-white p-4 text-brand shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                <FiArrowUpRight className="size-5" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand">
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
              {item.description[lang as "en" | "es"]}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function PortfolioPreview({ dictionary }: { dictionary: PortfolioPreviewDictionary }) {
  const params = useParams()
  const lang = (params?.lang as string) || "en"
  const featuredItems = FEATURED_INDICES.map((i) => portfolioClients[i])

  return (
    <section className="relative mx-auto max-w-screen-2xl overflow-hidden px-6 pt-16 sm:pt-24 lg:px-12">
      {/* Background glows */}
      <div className="bg-brand/8 pointer-events-none absolute right-0 top-1/2 size-[600px] -translate-y-1/2 rounded-full blur-[160px]" />
      <div className="bg-brand/5 pointer-events-none absolute bottom-0 left-1/4 size-[400px] rounded-full blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand"
            >
              <span className="h-px w-6 bg-brand" />
              {dictionary.eyebrow}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-extrabold !leading-tight text-white sm:text-5xl xl:text-6xl"
            >
              {dictionary.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed text-slate-300"
            >
              {dictionary.subtitle}
            </motion.p>

            {/* Location badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {LOCATION_BADGES.map((loc) => (
                <span
                  key={loc.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/80 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm"
                >
                  <span aria-hidden="true">{loc.flag}</span>
                  {loc.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden shrink-0 lg:block"
          >
            <Link
              href={`/${lang}/portfolio`}
              className="group/cta border-brand/40 bg-brand/10 inline-flex cursor-pointer items-center gap-3 rounded-full border px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_0_30px_-5px_rgba(85,167,166,0.5)]"
            >
              {dictionary.cta}
              <FiArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredItems.map((item, idx) => (
            <PreviewCard key={item.name} item={item} lang={lang} index={idx} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center lg:hidden"
        >
          <Link
            href={`/${lang}/portfolio`}
            className="group/cta border-brand/40 bg-brand/10 inline-flex cursor-pointer items-center gap-3 rounded-full border px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
          >
            {dictionary.cta}
            <FiArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

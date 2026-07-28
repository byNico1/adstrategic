"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap,
  Wrench,
  Flame,
  Droplets,
  Home,
  Truck,
  Stethoscope,
  Scale,
  Utensils,
  Dumbbell,
  GraduationCap,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

import type { NicheConfig } from "@/src/config/niches/types"
import type { Locale } from "@/src/i18n-config"

const NICHE_ICONS: Record<string, LucideIcon> = {
  electrician: Zap,
  plumber: Droplets,
  hvac: Flame,
  mechanic: Wrench,
  roofing: Home,
  moving: Truck,
  healthcare: Stethoscope,
  legal: Scale,
  restaurant: Utensils,
  fitness: Dumbbell,
  education: GraduationCap,
  realestate: Building2,
}

const NICHE_ACCENT_COLORS: Record<string, string> = {
  electrician: "from-yellow-500/20 to-brand/10 border-yellow-500/20 group-hover:border-yellow-400/40",
  plumber: "from-blue-500/20 to-cyan-500/10 border-blue-500/20 group-hover:border-blue-400/40",
  hvac: "from-orange-500/20 to-red-500/10 border-orange-500/20 group-hover:border-orange-400/40",
  default: "from-brand/20 to-brand/5 border-brand/20 group-hover:border-brand/40",
}

const NICHE_ICON_COLORS: Record<string, string> = {
  electrician: "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20",
  plumber: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
  hvac: "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20",
  default: "bg-brand/10 text-brand group-hover:bg-brand/20",
}

type IndustriesGridProps = {
  niches: NicheConfig[]
  lang: Locale
  dictionary: {
    card: { viewDetails: string; learnMore: string }
    grid: { heading: string; subheading: string }
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

function IndustryCard({
  niche,
  lang,
  cardDictionary,
}: {
  niche: NicheConfig
  lang: Locale
  cardDictionary: IndustriesGridProps["dictionary"]["card"]
}) {
  const Icon = NICHE_ICONS[niche.slug] ?? Building2
  const accentClass = NICHE_ACCENT_COLORS[niche.slug] ?? NICHE_ACCENT_COLORS.default
  const iconClass = NICHE_ICON_COLORS[niche.slug] ?? NICHE_ICON_COLORS.default

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/${lang}/industries/${niche.slug}`}
        className="group flex h-full flex-col rounded-2xl border bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/70 hover:shadow-[0_16px_48px_-12px_rgba(6,182,212,0.18)] cursor-pointer"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        {/* Icon */}
        <div
          className={`mb-5 flex size-14 items-center justify-center rounded-xl transition-colors duration-300 ${iconClass}`}
        >
          <Icon className="size-7" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand/80">
            {niche.cardTagline}
          </p>
          <h3 className="mb-3 text-xl font-extrabold leading-snug text-white">
            {niche.industryName}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-slate-400">{niche.cardDescription}</p>
        </div>

        {/* CTA row */}
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-200 group-hover:gap-3">
          <span>{cardDictionary.viewDetails}</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </div>

        {/* Bottom gradient accent */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentClass}`}
        />
      </Link>
    </motion.div>
  )
}

export function IndustriesGrid({ niches, lang, dictionary }: IndustriesGridProps) {
  return (
    <section id="industries-grid" className="py-16 sm:py-24">
      <div className="mb-12 text-center sm:mb-16">
        <h2
          className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {dictionary.grid.heading}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {dictionary.grid.subheading}
        </p>
      </div>

      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        role="list"
      >
        {niches.map((niche) => (
          <li key={niche.slug} className="relative">
            <IndustryCard niche={niche} lang={lang} cardDictionary={dictionary.card} />
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

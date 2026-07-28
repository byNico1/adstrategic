import { CheckCircle2, Headphones, type LucideIcon, Palette, RotateCcw, Search, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type OfferHighlightDictionary = {
  eyebrow: string
  title: string
  description: string
  cta: string
  features: {
    title: string
    description: string
  }[]
}

const FEATURE_ICONS: LucideIcon[] = [Shield, Palette, Zap, RotateCcw, Headphones, Search]

export default function OfferHighlight({ dictionary }: { dictionary: OfferHighlightDictionary }) {
  return (
    <section className="relative mx-auto max-w-screen-xl overflow-hidden px-4 py-20 sm:py-28 lg:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand/10 absolute -top-32 left-1/4 h-[500px] w-[600px] -translate-x-1/2 rounded-full blur-[140px]" />
        <div className="bg-brand/8 absolute bottom-0 right-1/4 h-[400px] w-[500px] translate-x-1/3 rounded-full blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── LEFT SIDE ── Image Panel */}
        <div className="relative order-2 lg:order-1">
          {/* Glow ring behind image */}
          <div className="bg-brand/10 pointer-events-none absolute inset-0 -m-4 rounded-3xl blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(85,167,166,0.35)]">
            {/* Decorative border glow */}
            <div className="ring-brand/20 pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-inset" />

            <Image
              src="/assets/websites.png"
              alt="ADDSTRATEGIC — Professional web and software development team"
              width={700}
              height={800}
              className="h-full w-full object-cover object-center"
              priority
            />

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* Floating badge card */}
            <div className="absolute inset-x-5 bottom-5 z-20 flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 shadow-xl backdrop-blur-md">
              <div className="bg-brand/20 ring-brand/30 flex size-11 shrink-0 items-center justify-center rounded-full ring-1">
                <CheckCircle2 className="size-5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white">ADDSTRATEGIC</p>
                <p className="text-xs text-slate-400">Professional Web & Software Development</p>
              </div>
              {/* Live dot */}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
                </span>
                <span className="text-xs text-slate-400">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE ── Content Panel */}
        <div className="order-1 flex flex-col lg:order-2">
          {/* Eyebrow */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{dictionary.eyebrow}</p>

          {/* Heading */}
          <h2 className="mb-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-[3.25rem]">
            {dictionary.title}
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{dictionary.description}</p>

          {/* Features grid */}
          <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {dictionary.features.map((feature, index) => {
              const Icon: LucideIcon = FEATURE_ICONS[index % FEATURE_ICONS.length] ?? Shield
              return (
                <li
                  key={index}
                  className="hover:border-brand/25 group flex gap-4 rounded-2xl border border-white/[0.07] bg-slate-900/40 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/60 hover:shadow-[0_8px_24px_-8px_rgba(85,167,166,0.25)]"
                >
                  {/* Icon badge */}
                  <div className="bg-brand/15 ring-brand/20 group-hover:bg-brand/25 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors duration-300">
                    <Icon className="size-4 text-brand" />
                  </div>
                  {/* Text */}
                  <div>
                    <p className="mb-0.5 text-sm font-bold uppercase tracking-wide text-white">{feature.title}</p>
                    <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#contact"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_28px_rgba(85,167,166,0.4)] transition-all duration-300 hover:bg-[#6bbfbe] hover:shadow-[0_0_44px_rgba(85,167,166,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {dictionary.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <p className="text-xs text-slate-500 sm:ml-1">No commitment required.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

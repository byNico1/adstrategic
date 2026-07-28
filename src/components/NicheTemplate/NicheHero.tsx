import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { AnimatedStatValue } from "@/components/NicheTemplate/AnimatedStatValue"
import type { NicheConfig } from "@/src/config/niches/types"
import type { NicheDictionary } from "@/src/get-niche-dictionary"

type NicheHeroProps = {
  config: Pick<NicheConfig, "trustBadges" | "statCards" | "ctaUrl">
  dictionary: NicheDictionary["hero"]
}

export function NicheHero({ config, dictionary }: NicheHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-24 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      {config.trustBadges.length > 0 && (
        <ul className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:mb-12 sm:gap-6">
          {config.trustBadges.map((badge) => (
            <li
              key={badge.src}
              className="flex h-10 items-center opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-8 w-auto object-contain sm:h-10"
              />
            </li>
          ))}
        </ul>
      )}

      <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:mb-12 sm:text-6xl lg:text-7xl">
        {dictionary.h1}
      </h1>

      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-3 sm:gap-4">
        {config.statCards.map((stat) => {
          const label = dictionary.stats[stat.labelIndex]?.label ?? ""
          return (
            <div
              key={`${stat.value}-${stat.labelIndex}`}
              className="flex min-h-[96px] flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/50 px-4 py-5 backdrop-blur"
            >
              <p className="flex justify-center text-3xl font-extrabold text-foreground sm:text-4xl">
                <AnimatedStatValue value={stat.value} />
              </p>
              <p className="mt-1 text-sm font-medium text-brand">{label}</p>
            </div>
          )
        })}
      </div>

      <Button size="lg" className="w-full  max-w-md rounded-md sm:text-lg" asChild>
        <Link href={config.ctaUrl}>{dictionary.cta}</Link>
      </Button>
    </section>
  )
}

import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { NicheDictionary } from "@/src/get-niche-dictionary"

type CtaBannerProps = {
  dictionary: NicheDictionary["ctaBanner"]
  ctaHref: string
}

export function CtaBanner({ dictionary, ctaHref }: CtaBannerProps) {
  return (
    <section id="cta-banner" className="py-12 sm:py-16">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border/60 bg-card/50 px-5 py-8 backdrop-blur sm:gap-8 sm:rounded-3xl sm:px-10 sm:py-12 lg:flex-row lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
        <div className="w-full min-w-0 max-w-2xl text-center lg:text-left">
          <h2 className="mb-3 text-xl font-extrabold leading-snug sm:text-3xl sm:leading-tight lg:text-4xl">
            {dictionary.heading}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">{dictionary.body}</p>
        </div>
        <Button
          size="lg"
          className="h-auto w-full shrink-0 whitespace-normal rounded-md px-6 py-3 text-center leading-snug sm:w-auto sm:px-8 sm:text-lg"
          asChild
        >
          <Link href={ctaHref}>{dictionary.cta}</Link>
        </Button>
      </div>
    </section>
  )
}

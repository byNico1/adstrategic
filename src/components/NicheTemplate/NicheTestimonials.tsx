"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { LuQuote } from "react-icons/lu"
import { StarFilledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { NicheConfig } from "@/src/config/niches/types"
import type { NicheDictionary } from "@/src/get-niche-dictionary"
import { cn } from "@/src/lib/utils"

type NicheTestimonialsProps = {
  config: Pick<NicheConfig, "reviews" | "ctaUrl">
  dictionary: NicheDictionary["testimonials"]
}

export function NicheTestimonials({ config, dictionary }: NicheTestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <section id="testimonials" className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{dictionary.heading}</h2>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{dictionary.intro}</p>
      </div>

      <Carousel
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        className="mx-auto w-full max-w-2xl px-10 sm:px-12 xl:max-w-5xl"
      >
        <CarouselContent>
          {config.reviews.map((review) => {
            const text = dictionary.reviews[review.textIndex]?.text ?? ""
            return (
              <CarouselItem key={review.name} className="md:basis-1/2 xl:basis-1/3">
                <article className="relative flex h-full min-h-[280px] flex-col rounded-2xl border border-border/60 bg-card/40 p-6 pt-8 backdrop-blur">
                  <LuQuote className="absolute right-5 top-4 text-brand opacity-40" size={40} aria-hidden="true" />
                  <header className="mb-4 pr-10">
                    <h3 className="text-lg font-bold">{review.name}</h3>
                    <div className="mt-1 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFilledIcon
                          key={i}
                          className={cn("size-4", i < review.rating ? "text-yellow-500" : "text-muted")}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm font-medium text-brand">{dictionary.roleLabel}</p>
                    {review.role && <p className="text-xs text-muted-foreground">{review.role}</p>}
                  </header>
                  <p className="flex-1 text-sm leading-relaxed sm:text-base">{text}</p>
                </article>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="border-primary bg-primary text-primary-foreground hover:bg-primary/90" />
        <CarouselNext className="border-primary bg-primary text-primary-foreground hover:bg-primary/90" />
      </Carousel>

      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                index === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Button size="lg" className="w-full rounded-full sm:w-auto" asChild>
          <Link href={config.ctaUrl}>{dictionary.readMore}</Link>
        </Button>
        <Button size="lg" variant="outline" className="w-full rounded-full sm:w-auto" asChild>
          <Link href={config.ctaUrl}>{dictionary.leaveReview}</Link>
        </Button>
      </div>
    </section>
  )
}

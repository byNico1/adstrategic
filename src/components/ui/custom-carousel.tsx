"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import * as React from "react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const imagesObj = [
  "/assets/results/selfimprovingbooks.webp",
  "/assets/results/e-commerce.webp",
  "/assets/results/cimapage.png",
  "/assets/results/carrosedwind.png",
  "/assets/results/casisbanner.png",
  "/assets/results/google-analytics.webp",
  "/assets/results/youtube-analytics.webp",
  "/assets/results/glowingskin.png",
  "/assets/results/mamaquilla.png",
  "/assets/results/modarquitectura.png",
  "/assets/results/xcelsior.png",
  "/assets/results/addinvoicessoft.png",
  "/assets/results/cimacrm.png",
  "/assets/results/pinkcleaning.png",
  "/assets/results/poppypawstx.png",
  "/assets/results/vapingapestx.png",
  "/assets/results/indesigntx.png",
  "/assets/results/bonnetcleaning.png",
]

export function ResultsCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const params = useParams()
  const lang = params?.lang || "es"

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="mt-8 aspect-video w-full max-w-[720px] rounded-xl border-[5px] border-black dark:border-white"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <div className="absolute -inset-14 z-0"></div>
      <CarouselContent className="m-0">
        {imagesObj.map((src, index) => (
          <CarouselItem className="p-0" key={index}>
            <Link href={`/${lang}/portfolio`} className="relative z-30 block aspect-video w-full max-w-[720px]">
              <Image
                alt="hero"
                src={src}
                quality={75}
                fill
                priority={index === 0 ? true : false}
                style={{
                  objectFit: "cover",
                }}
                className="h-full w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

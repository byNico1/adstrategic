import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import * as React from "react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const imagesObj = [
  "/assets/results/selfimprovingbooks.png",
  "/assets/results/e-commerce.png",
  "/assets/results/nico-portfolio.webp",
  "/assets/results/adstrategic-website.png",
  "/assets/results/google-analytics.png",
  "/assets/results/youtube-analytics.png",
]

export function ResultsCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

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
            <div className="relative z-30 aspect-video w-full max-w-[720px] ">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { LuQuote } from "react-icons/lu"
import { type getDictionary } from "@/src/get-dictionary"

const AnimateInView = dynamic(() => import("../Animations/AnimateInView"))

const Carousel = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.Carousel))
const CarouselContent = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselContent))
const CarouselItem = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselItem))
const CarouselNext = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselNext))
const CarouselPrevious = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious))

const Testimonials = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["testimonials"] }) => {
  return (
    <section id="testimonials" className="overflow-hidden py-16 sm:py-24">
      <AnimateInView className="px-4">
        <h2 className="mb-8 text-center text-4xl font-extrabold !leading-tight sm:text-7xl">{dictionary.title}</h2>

        <Carousel
          opts={{ loop: true }}
          className="mx-auto w-full max-w-[calc(100vw-110px)]  sm:max-md:max-w-md md:max-w-[calc(100vw-130px)] xl:max-w-5xl"
        >
          <CarouselContent className="">
            {dictionary.testimonialsData.map((testimonial) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 " key={testimonial.name}>
                <div className="relative  flex h-full min-h-[500px] w-full flex-col justify-around rounded-lg border border-black/10 p-4 !pt-24 min-[375px]:p-10 dark:border-white/10">
                  <LuQuote className="absolute right-8 top-5 opacity-20" size={60} />
                  <p className="">{testimonial.content}</p>
                  <div className="mt-5 flex items-center gap-3 text-center">
                    <Image
                      className="aspect-square h-16 w-16 rounded-full object-cover"
                      quality={90}
                      src={testimonial.image}
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h3 className="leading-5">{testimonial.name}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="dark:text-foreground" />
          <CarouselNext className="dark:text-foreground" />
        </Carousel>
      </AnimateInView>
    </section>
  )
}

export default Testimonials

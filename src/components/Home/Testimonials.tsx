"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import { LuQuote } from "react-icons/lu"
import { testimonials } from "@/utils/testimonials"

const Carousel = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.Carousel))
const CarouselContent = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselContent))
const CarouselItem = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselItem))
const CarouselNext = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselNext))
const CarouselPrevious = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious))
const AuroraBackground = dynamic(() => import("@/shadcn/aurora-background").then((mod) => mod.AuroraBackground))

const Testimonials = () => {
  return (
    <section id="testimonials" className="overflow-hidden">
      <AuroraBackground className="py-10">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="px-4"
        >
          <Carousel
            opts={{ loop: true }}
            className="w-full max-w-[290px] min-[375px]:max-w-[calc(100vw-110px)] sm:max-md:max-w-md  md:max-w-[calc(100vw-130px)] xl:max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={testimonial.name}>
                  <div className="relative flex h-full min-h-[500px] w-full flex-col justify-around rounded-lg bg-background p-10 pt-24">
                    <LuQuote className="absolute right-8 top-5 text-muted-foreground opacity-20" size={60} />
                    <p className="text-foreground">{testimonial.content}</p>
                    <div className="mt-5 flex items-center">
                      <div className="relative mr-3 h-16 w-16 overflow-hidden rounded-full ">
                        <Image
                          className="absolute left-0 top-0 h-[100%] w-full object-cover"
                          quality={60}
                          src={testimonial.image}
                          alt=""
                          width={60}
                          height={60}
                        />
                      </div>
                      <h3 className="leading-5 text-foreground">{testimonial.name}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="dark:text-foreground" />
            <CarouselNext className="dark:text-foreground" />
          </Carousel>
        </motion.div>
      </AuroraBackground>
    </section>
  )
}

export default Testimonials

"use client"

import { StarFilledIcon } from "@radix-ui/react-icons"
import { Button } from "@/shadcn/button"
import { ResultsCarousel } from "./ui/custom-carousel"

const MultiLayerParallax = () => {
  return (
    <section className="grid min-h-screen grid-rows-1 place-items-center overflow-hidden px-4 pt-28 text-center">
      <div className="z-30 mx-auto max-w-3xl place-self-center">
        <div className="mb-10 flex flex-wrap justify-center gap-4 sm:flex-nowrap">
          <div className="hidden sm:block">
            <p className="inline-flex">
              {Array(5)
                .fill(false)
                .map((star, i) => (
                  <span key={`star-${i}-testimonial-2`}>
                    <StarFilledIcon className="text-yellow-600" />
                  </span>
                ))}
            </p>
            <p className="text-sm">Hiring Adstrategic was an exceptional decision for Casi&apos;s Shakers</p>
          </div>
          <div>
            <p className="inline-flex">
              {Array(5)
                .fill(false)
                .map((star, i) => (
                  <span key={`star-${i}-testimonial-1`}>
                    <StarFilledIcon className="text-yellow-600" />
                  </span>
                ))}
            </p>
            <p className="text-sm">
              Adstrategic exceeded my expectations with their design and branding work for my luxury car wash company
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="inline-flex">
              {Array(5)
                .fill(false)
                .map((star, i) => (
                  <span key={`star-${i}-testimonial-3`}>
                    <StarFilledIcon className="text-yellow-600" />
                  </span>
                ))}
            </p>
            <p className="text-sm">Their work on web and graphic design has elevated our professional image</p>
          </div>
        </div>
        <h1 className="mb-8 text-[45px] font-extrabold leading-none sm:text-7xl">
          Get <span className="text-brand">Digital Services</span> That Drive <span className="text-brand">Growth</span>
        </h1>
        <p className="mb-8 text-lg font-medium">
          Elevate the design of your <span className="text-brand underline">Website</span> and ignite your Digital
          Marketing results with Adstrategic!
        </p>
        <Button size="lg">
          <a href="#contact">Get started</a>
        </Button>
      </div>

      <ResultsCarousel />
    </section>
  )
}

export default MultiLayerParallax

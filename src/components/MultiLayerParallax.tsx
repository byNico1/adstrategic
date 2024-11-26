"use client"

import { StarFilledIcon } from "@radix-ui/react-icons"
import { Button } from "@/shadcn/button"
import { type getDictionary } from "@/src/get-dictionary"
import { ResultsCarousel } from "./ui/custom-carousel"

const MultiLayerParallax = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["hero"] }) => {
  const starsArray = Array(5).fill(false)

  return (
    <section className="grid min-h-screen grid-rows-1 place-items-center overflow-hidden px-4 pt-28 text-center">
      <div className="z-30 mx-auto max-w-3xl place-self-center">
        <div className="mb-10 flex flex-wrap justify-center gap-4 sm:flex-nowrap">
          <div className="hidden sm:block">
            <p className="inline-flex">
              {starsArray.map((star, i) => (
                <span key={`star-${i}-testimonial-2`}>
                  <StarFilledIcon className="text-yellow-600" />
                </span>
              ))}
            </p>
            <p className="text-sm">{dictionary.reviews[0]}</p>
          </div>
          <div>
            <p className="inline-flex">
              {starsArray.map((star, i) => (
                <span key={`star-${i}-testimonial-1`}>
                  <StarFilledIcon className="text-yellow-600" />
                </span>
              ))}
            </p>
            <p className="text-sm">{dictionary.reviews[1]}</p>
          </div>
          <div className="hidden sm:block">
            <p className="inline-flex">
              {starsArray.map((star, i) => (
                <span key={`star-${i}-testimonial-3`}>
                  <StarFilledIcon className="text-yellow-600" />
                </span>
              ))}
            </p>
            <p className="text-sm">{dictionary.reviews[2]}</p>
          </div>
        </div>
        <h1
          className="mb-8 text-[45px] font-extrabold leading-none sm:text-7xl"
          dangerouslySetInnerHTML={{ __html: dictionary.intro }}
        ></h1>
        <p className="mb-8 text-lg font-medium" dangerouslySetInnerHTML={{ __html: dictionary.paragraph }}></p>
        <Button size="lg">
          <a href="#contact">{dictionary.cta}</a>
        </Button>
      </div>

      <ResultsCarousel />
    </section>
  )
}

export default MultiLayerParallax

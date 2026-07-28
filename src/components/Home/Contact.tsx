import dynamic from "next/dynamic"
import Image from "next/image"
import React from "react"
import { type getDictionary } from "@/src/get-dictionary"

const OnboardingFlow = dynamic(() => import("@/components/Form/OnboardingFlow"))
const Contact = ({
  dictionary,
  formDictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["contact"]
  formDictionary: Awaited<ReturnType<typeof getDictionary>>["form"]
}) => {
  return (
    <section id="contact" className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:py-24">
      <Image
        alt=""
        fill
        sizes="100vw"
        src="/info.jpg"
        style={{
          objectFit: "cover",
        }}
        className="z-10"
      />
      <div className="absolute inset-0 z-10 bg-[#000000c3]" />
      <div className="relative z-20 w-full max-w-2xl">
        <h2
          className="mb-8 text-4xl font-extrabold text-white sm:text-5xl lg:text-7xl"
          dangerouslySetInnerHTML={{ __html: dictionary.title }}
        ></h2>
        <OnboardingFlow formDictionary={formDictionary} />
      </div>
    </section>
  )
}

export default Contact

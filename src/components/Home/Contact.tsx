import dynamic from "next/dynamic"
import Image from "next/image"
import React from "react"
import { type getDictionary } from "@/src/get-dictionary"

const Form = dynamic(() => import("@/components/Form/Form"))
const Contact = ({
  dictionary,
  formDictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["contact"]
  formDictionary: Awaited<ReturnType<typeof getDictionary>>["form"]
}) => {
  return (
    <section id="contact" className="relative grid min-h-[70vh] px-4 py-16 text-center sm:py-24">
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
      <div className="z-10 mx-auto max-w-3xl place-self-center text-center">
        <h2
          className="mb-8 text-5xl font-extrabold text-white lg:text-7xl"
          dangerouslySetInnerHTML={{ __html: dictionary.title }}
        ></h2>
        <Form dictionary={formDictionary} />
      </div>
    </section>
  )
}

export default Contact

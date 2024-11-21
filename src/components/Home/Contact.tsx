import Image from "next/image"
import React from "react"
import Form from "@/components/Form/Form"

const Contact = () => {
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
      <div className="z-10 mx-auto max-w-2xl place-self-center text-center">
        <h2 className="mb-8 text-5xl font-extrabold text-white lg:text-7xl">
          Get a <span className="text-[#55A7A6]">Web Design</span> and <span className="text-[#55A7A6]">Marketing</span>{" "}
          Proposal
        </h2>
        <Form />
      </div>
    </section>
  )
}

export default Contact

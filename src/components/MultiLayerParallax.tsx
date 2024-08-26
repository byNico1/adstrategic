"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import React, { useRef } from "react"
import { Button } from "@/shadcn/button"

const MultiLayerParallax = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <section
      ref={ref}
      className="relative grid h-screen grid-rows-1 place-items-center overflow-hidden px-4 py-28 pb-8 text-center sm:py-16"
    >
      <motion.div className="z-30 mx-auto max-w-2xl place-self-center" style={{ y: textY }}>
        <h1 className="mb-8 text-lg font-medium text-[#ffffff]">Adstrategic - Effortless Business Growth</h1>
        <p className="mb-8 text-3xl font-extrabold leading-tight tracking-wide text-white md:text-4xl">
          Experience <span className="text-brand">growth</span> in your <span className="text-brand">business</span>{" "}
          effortlesly as we bring you
          <span className="text-brand"> top-tier leads</span>
        </p>
        <p className="mb-8 text-lg font-medium text-white">
          For A <span className="text-brand underline">Limited Time</span> Only
        </p>
        <Button size="lg">
          <a href="#contact">Get started</a>
        </Button>
      </motion.div>
      <div className="absolute inset-0 z-10">
        <Image
          alt="hero"
          src="/hero.webp"
          quality={75}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="absolute inset-0 z-20 bg-[#1e1e1ed7]" />
    </section>
  )
}

export default MultiLayerParallax

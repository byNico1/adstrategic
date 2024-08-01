"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import React, { useRef } from "react"
import ShowModal from "@/components/Modal/ShowModal"
import Reveal from "@/components/Reveal"

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
      className="relative grid h-screen place-items-center overflow-hidden px-4 py-16 pb-8 text-center"
    >
      <motion.div className="z-30 mx-auto place-self-center" style={{ y: textY }}>
        <p className="mb-8 text-lg font-medium text-[#ffffff]">Effortless Business Growth</p>

        <Reveal>
          <h2 className="mb-8 max-w-2xl text-3xl font-extrabold !leading-tight tracking-wide text-white md:text-4xl xl:text-5xl">
            Experience <span className="text-brand">growth</span> in your <span className="text-brand">business</span>{" "}
            effortlesly as we bring you
            <span className="text-brand"> top-tier leads</span>
          </h2>
        </Reveal>

        <p className="mb-8 text-lg font-medium text-white">
          For A <span className="text-brand underline">Limited Time</span> Only
        </p>

        <ShowModal />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(/hero.jpg)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 z-20 bg-[#1e1e1ed7]" />
    </section>
  )
}

export default MultiLayerParallax

"use client"

import { motion } from "framer-motion"
import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
  stackIndex?: number
  givenDelay?: number
  once?: boolean
  className?: string
}

const AnimateInView = ({ children, stackIndex = 1, givenDelay = 0.1, once = true, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: stackIndex * givenDelay,
        duration: 0.8,
        ease: "easeInOut",
      }}
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export default AnimateInView

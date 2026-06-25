"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import { PortfolioItem } from "@/src/config/portfolio"
import { Locale } from "@/src/i18n-config"

export default function PortfolioCard({ item, lang, index }: { item: PortfolioItem; lang: Locale; index: number }) {
  const [imgSrc, setImgSrc] = useState(item.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={item.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
        <div className="flex flex-col h-full bg-white dark:bg-zinc-900/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand/20 border border-black/5 dark:border-white/5 transition-all duration-500 transform group-hover:-translate-y-2">
          
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={imgSrc}
              alt={item.name}
              onError={() =>
                setImgSrc(
                  `https://placehold.co/800x500/1e293b/ffffff?text=${encodeURIComponent(item.name)}`
                )
              }
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/80 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white text-brand p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                <FiArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col flex-grow relative">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-brand transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base flex-grow line-clamp-3">
              {item.description[lang]}
            </p>
          </div>

        </div>
      </Link>
    </motion.div>
  )
}

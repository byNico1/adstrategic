import { motion } from "framer-motion"
import Image from "next/image"
import { Sponsor } from "@/config/sponsors"

interface SponsorCardProps {
  sponsor: Sponsor
  index: number
}

export default function SponsorCard({ sponsor, index }: SponsorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-0 flex-[0_0_100%] px-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
    >
      <div className="group/sponsor relative">
        <div className="rounded-xl bg-blue-900 p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover/sponsor:shadow-xl dark:bg-transparent">
          <div className="relative flex h-24 w-full items-center justify-center">
            <Image
              src={sponsor.image}
              alt={sponsor.alt}
              width={120}
              height={96}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/sponsor:scale-110"
              priority={index < 3} // Priorizar las primeras 3 imágenes
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

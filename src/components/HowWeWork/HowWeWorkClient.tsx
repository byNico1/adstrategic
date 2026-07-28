"use client"

import React from "react"
import { CalendarClock, Globe, RotateCcw, ShoppingCart, CheckCircle2 } from "lucide-react"
import Container from "@/src/components/Container"
import { motion } from "framer-motion"
import PricingSection from "@/src/components/Pricing/PricingSection"
import type { getDictionary } from "@/src/get-dictionary"

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

type Props = {
  data: Awaited<ReturnType<typeof getDictionary>>["howWeWork"]
  pricing: Awaited<ReturnType<typeof getDictionary>>["pricing"]
  lang: string
}

export default function HowWeWorkClient({ data, pricing, lang }: Props) {
  // Mapping features to specific Lucide icons
  const featureIcons = [
    <Globe key="1" className="w-48 h-48 text-brand opacity-80" strokeWidth={1} />,
    <RotateCcw key="2" className="w-48 h-48 text-brand opacity-80" strokeWidth={1} />,
    <CalendarClock key="3" className="w-48 h-48 text-brand opacity-80" strokeWidth={1} />,
    <ShoppingCart key="4" className="w-48 h-48 text-brand opacity-80" strokeWidth={1} />
  ]


  return (
    <div className="relative w-full text-slate-100 overflow-hidden min-h-screen">
      {/* 1. Base Gradient Overlay (Back) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/50 via-slate-950/90 to-slate-950 pointer-events-none" />
      
      {/* 2. Background Image (Middle - above gradient, below text) */}
      <div 
        className="absolute inset-x-0 top-0 h-screen z-[5] pointer-events-none opacity-60 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/bgs/fondoaddstrategiclnd.png')",
          backgroundSize: 'contain',
          backgroundPosition: '60% top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 1. Hero & Workflow Timeline */}
      <Container className="relative z-10 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-24 relative"
        >
          {/* Logo Banner in the Hero */}
          <div className="flex justify-center mb-10">
            <img 
              src="/addstrategic_banner.png" 
              alt="ADDSTRATEGIC Logo" 
              className="w-[350px] md:w-[500px] lg:w-[700px] object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all hover:scale-105 duration-500"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 uppercase drop-shadow-2xl">
            {data.title}
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-brand to-transparent mx-auto rounded-full opacity-80" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2" />
          
          {data.workflow.map((step: any, index: number) => (
            <motion.div 
              variants={fadeUp}
              key={index} 
              className="group relative rounded-3xl border border-slate-800/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand/50 hover:bg-slate-800/80"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-brand flex items-center justify-center text-xl font-bold shadow-lg shadow-brand/40">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-brand font-medium mb-4">{step.duration}</p>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* 2. Features Section (Alternating Layout) */}
      <div className="relative z-10 bg-slate-900/60 py-24 border-y border-slate-800/50 backdrop-blur-md">
        <Container>
          <div className="space-y-32">
            {data.features.map((feature: any, index: number) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  key={index} 
                  className={`flex flex-col gap-12 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Text Content */}
                  <div className="flex-1 space-y-8">
                    <div>
                      {feature.subtitle && (
                        <h3 className="text-brand font-bold uppercase tracking-wider mb-2 text-sm drop-shadow-sm">{feature.subtitle}</h3>
                      )}
                      <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">
                        {feature.title}
                      </h2>
                      <p className="text-xl text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      {feature.points.map((point: any, pIndex: number) => (
                        <div key={pIndex} className="flex gap-4 items-start bg-slate-800/20 p-4 rounded-xl border border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                          <CheckCircle2 className="w-6 h-6 text-brand shrink-0 mt-1" />
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1 uppercase">{point.title}</h4>
                            <p className="text-slate-400 leading-relaxed">{point.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Icon/Image Placeholder */}
                  <div className="flex-1 w-full flex justify-center items-center">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative w-full max-w-md aspect-square rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center shadow-2xl backdrop-blur-xl"
                    >
                      <div className="absolute inset-0 bg-brand/10 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute inset-4 rounded-full border border-dashed border-slate-600/50 animate-[spin_60s_linear_infinite]" />
                      {featureIcons[index % featureIcons.length]}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </div>

      {/* 3. Pricing Section */}
      <PricingSection data={pricing} lang={lang} />
    </div>
  )
}

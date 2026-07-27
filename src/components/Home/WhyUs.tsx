"use client"

import { Check, MonitorSmartphone, Smartphone, Image as ImageIcon } from "lucide-react"
import { FcAlarmClock, FcMoneyTransfer } from "react-icons/fc"
import { GrUpdate } from "react-icons/gr"
import { MdCancel } from "react-icons/md"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { PortfolioButton } from "../ui/portfolio-button"
import { ReactNode } from "react"

export default function WhyUs({ dictionary }: { dictionary: any }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  // Map the data into an array of cards
  const cards: { feature: string; us: ReactNode; others: ReactNode; icon: ReactNode }[] = [
    {
      feature: dictionary.features[0],
      icon: <FcAlarmClock size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: dictionary.keywords[5], // "6-10 Dias"
      others: dictionary.keywords[6], // "2-4 Meses"
    },
    {
      feature: dictionary.features[1],
      icon: <FcMoneyTransfer size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: "600+ USD",
      others: "3k+ USD",
    },
    {
      feature: dictionary.features[2],
      icon: <ImageIcon size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: (
        <span className="flex items-center gap-2">
          <Check className="text-white rounded-full bg-green-500 p-0.5" size={20} /> {dictionary.keywords[2]}
        </span>
      ), // "Hecho"
      others: (
        <span className="flex items-center gap-2">
          <MdCancel className="text-red-500" size={20} /> {dictionary.keywords[3]}
        </span>
      ), // "No incluido"
    },
    {
      feature: dictionary.features[3],
      icon: <MonitorSmartphone size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: (
        <span className="flex items-center gap-2">
          <Check className="text-white rounded-full bg-green-500 p-0.5" size={20} /> {dictionary.keywords[2]}
        </span>
      ),
      others: (
        <span className="flex items-center gap-2">
          <MdCancel className="text-red-500" size={20} /> {dictionary.keywords[4]}
        </span>
      ), // "Diseño o desarrollo"
    },
    {
      feature: dictionary.features[4],
      icon: <Smartphone size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: (
        <span className="flex items-center gap-2">
          <Check className="text-white rounded-full bg-green-500 p-0.5" size={20} /> {dictionary.keywords[2]}
        </span>
      ),
      others: (
        <span className="flex items-center gap-2">
          <MdCancel className="text-red-500" size={20} /> {dictionary.keywords[3]}
        </span>
      ),
    },
    {
      feature: dictionary.features[5],
      icon: <GrUpdate size={35} className="mx-auto text-cyan-400 drop-shadow-md" />,
      us: (
        <span className="flex items-center gap-2">
          <Check className="text-white rounded-full bg-green-500 p-0.5" size={20} /> {dictionary.keywords[2]}
        </span>
      ),
      others: (
        <span className="flex items-center gap-2">
          <MdCancel className="text-red-500" size={20} /> {dictionary.keywords[3]}
        </span>
      ),
    },
  ]

  return (
    <section id="why-us" className="mx-auto max-w-screen-2xl px-4 pt-16 text-center sm:pt-24 lg:px-6 mb-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-brand/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <h2
          className="mb-4 text-center text-5xl font-extrabold !leading-tight sm:text-7xl text-white"
          dangerouslySetInnerHTML={{ __html: dictionary.title }}
        ></h2>
        <p className="mb-12 text-slate-300 text-lg max-w-2xl mx-auto">{dictionary.subtitle}</p>

        {/* Embla Carousel */}
        <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
          <div className="flex touch-pan-y backface-hidden -ml-4">
            {cards.map((card, idx) => (
              <div 
                key={idx} 
                className="pl-4 min-w-[280px] sm:min-w-[320px] md:min-w-[380px] flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] group"
              >
                <div className="h-full flex flex-col p-6 rounded-3xl bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] hover:border-brand/30 hover:bg-slate-800/80 relative overflow-hidden">
                  
                  {/* Subtle Gradient Glow inside Card */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/20 blur-[50px] rounded-full transition-opacity opacity-0 group-hover:opacity-100"></div>

                  <div className="mb-6 relative z-10">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{card.feature}</h3>
                  </div>

                  {/* Comparison Section */}
                  <div className="flex-grow flex flex-col justify-center space-y-4 relative z-10">
                    
                    {/* US */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand/20 to-brand/5 border border-brand/20">
                      <span className="font-semibold text-white/80 uppercase text-xs tracking-wider">ADDSTRATEGIC</span>
                      <span className="font-bold text-white text-base md:text-lg flex items-center">{card.us}</span>
                    </div>

                    {/* OTHERS */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/5 border border-red-500/10 grayscale-[50%]">
                      <span className="font-medium text-slate-400 uppercase text-xs tracking-wider">Otros</span>
                      <span className="font-medium text-slate-400 text-sm md:text-base flex items-center opacity-80">{card.others}</span>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center w-full">
          <PortfolioButton text="Explorar Portafolio" />
        </div>
      </div>
    </section>
  )
}

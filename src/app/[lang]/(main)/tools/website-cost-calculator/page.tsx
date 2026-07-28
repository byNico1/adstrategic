"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import { Button } from "@/shadcn/button"
import {
  Monitor,
  Layout,
  Smartphone,
  Globe,
  ShoppingCart,
  Zap,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
  AppWindow,
  BookOpen,
  Check,
  ArrowLeft,
  Clock
} from "lucide-react"
import { cn } from "@/utils/utils"

const basePrices = {
  landing: { min: 600, max: 1200, label: "Landing Page" },
  business: { min: 1200, max: 2800, label: "Business Website" },
  ecommerce: { min: 2500, max: 6000, label: "E-commerce Store" },
  webapp: { min: 4000, max: 15000, label: "Web Application" },
  portfolio: { min: 500, max: 1000, label: "Portfolio / Blog" }
}

const featureAdders = {
  contact_form: { min: 0, max: 0, label: "Contact Form" },
  blog_cms: { min: 200, max: 500, label: "Blog / CMS" },
  user_accounts: { min: 800, max: 1500, label: "User Accounts" },
  payments: { min: 600, max: 1200, label: "Payment Processing" },
  admin_dashboard: { min: 1200, max: 3000, label: "Admin Dashboard" },
  api_integrations: { min: 400, max: 1000, label: "API Integrations" },
  multilingual: { min: 300, max: 700, label: "Multilingual Support" },
  animations: { min: 300, max: 800, label: "Custom Animations" },
  live_chat: { min: 100, max: 300, label: "Live Chat" },
  booking: { min: 800, max: 2000, label: "Booking System" }
}

export default function WebsiteCostCalculatorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    type: "landing",
    features: [] as string[],
    design: "custom",
    timeline: "standard",
    content: "client",
    contact: { name: "", email: "" }
  })

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.websiteCalculator
  const common = tools.common

  const calculateTotal = () => {
    const base = basePrices[selections.type as keyof typeof basePrices]
    let min = base.min
    let max = base.max

    selections.features.forEach(f => {
      const adder = featureAdders[f as keyof typeof featureAdders]
      if (adder) {
        min += adder.min
        max += adder.max
      }
    })

    const multipliers = {
      design: selections.design === "custom" ? 1.3 : 1.0,
      timeline: selections.timeline === "urgent" ? 1.4 : 1.0,
      content: selections.content === "help" ? 1.2 : 1.0
    }

    min *= multipliers.design * multipliers.timeline * multipliers.content
    max *= multipliers.design * multipliers.timeline * multipliers.content

    return { min: Math.round(min), max: Math.round(max) }
  }

  const handleFeatureToggle = (id: string) => {
    setSelections(prev => ({
      ...prev,
      features: prev.features.includes(id) 
        ? prev.features.filter(f => f !== id)
        : [...prev.features, id]
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold text-white mb-8">{content.steps.type}</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "landing", icon: Layout, label: "Landing Page", desc: "Single page focused on conversions" },
                { id: "business", icon: Monitor, label: "Business Website", desc: "Multi-page about/services/contact" },
                { id: "ecommerce", icon: ShoppingCart, label: "E-commerce Store", desc: "Products, cart, checkout, payments" },
                { id: "webapp", icon: AppWindow, label: "Web Application", desc: "Custom functionality, user accounts" },
                { id: "portfolio", icon: BookOpen, label: "Portfolio / Blog", desc: "Personal or professional showcase" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelections({ ...selections, type: t.id })
                    setStep(2)
                  }}
                  className={cn(
                    "flex items-center gap-6 p-6 rounded-2xl border text-left transition-all group",
                    selections.type === t.id ? "border-brand bg-brand/10 text-brand" : "border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                  )}
                >
                  <div className={cn("p-4 rounded-xl shrink-0 group-hover:scale-110 transition-transform", selections.type === t.id ? "bg-brand/20 text-brand" : "bg-white/5 text-muted-foreground")}>
                    <t.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-1">{t.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold text-white mb-8">{content.steps.features}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(featureAdders).map(([id, data]) => (
                <button
                  key={id}
                  onClick={() => handleFeatureToggle(id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                    selections.features.includes(id) ? "border-brand bg-brand/10 text-brand" : "border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.04]"
                  )}
                >
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0", selections.features.includes(id) ? "bg-brand border-brand" : "border-white/20")}>
                    {selections.features.includes(id) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-8 flex gap-4">
               <Button variant="ghost" onClick={() => setStep(1)} className="text-white hover:bg-white/5 px-8">Back</Button>
               <Button onClick={() => setStep(3)} className="bg-brand hover:bg-brand/90 text-white flex-1 py-6 font-bold rounded-xl">Next Step</Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold text-white mb-8">{content.steps.design}</h3>
            
            <div className="space-y-8">
              <section>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Design Preference</label>
                <div className="grid grid-cols-2 gap-4">
                  {["template", "custom"].map(d => (
                    <button 
                      key={d}
                      onClick={() => setSelections({...selections, design: d})}
                      className={cn("p-4 rounded-xl border font-bold capitalize transition-all", selections.design === d ? "border-brand bg-brand text-white" : "border-white/5 bg-white/[0.02] text-muted-foreground")}
                    >
                      {d} Design
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Timeline</label>
                <div className="grid grid-cols-3 gap-4">
                  {["flexible", "standard", "urgent"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelections({...selections, timeline: t})}
                      className={cn("p-3 rounded-xl border text-sm font-bold capitalize transition-all", selections.timeline === t ? "border-brand bg-brand text-white" : "border-white/5 bg-white/[0.02] text-muted-foreground")}
                    >
                      {t === "flexible" ? "No rush" : t}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Content Assistance</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setSelections({...selections, content: "client"})}
                    className={cn("p-4 rounded-xl border text-sm font-bold transition-all", selections.content === "client" ? "border-brand bg-brand text-white" : "border-white/5 bg-white/[0.02] text-muted-foreground")}
                  >
                    I provide content
                  </button>
                  <button 
                    onClick={() => setSelections({...selections, content: "help"})}
                    className={cn("p-4 rounded-xl border text-sm font-bold transition-all", selections.content === "help" ? "border-brand bg-brand text-white" : "border-white/5 bg-white/[0.02] text-muted-foreground")}
                  >
                    Need help with content
                  </button>
                </div>
              </section>
            </div>

            <div className="pt-8 flex gap-4">
               <Button variant="ghost" onClick={() => setStep(2)} className="text-white hover:bg-white/5 px-8">Back</Button>
               <Button onClick={() => setStep(4)} className="bg-brand hover:bg-brand/90 text-white flex-1 py-6 font-bold rounded-xl">Almost there</Button>
            </div>
          </div>
        )
      case 4:
        const total = calculateTotal()
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="bg-brand/5 border border-brand/20 rounded-3xl p-10 text-center">
              <h3 className="text-muted-foreground font-bold uppercase tracking-wider text-xs mb-4">{content.resultTitle}</h3>
              <div className="flex items-center justify-center gap-2 mb-6 text-brand">
                <span className="text-4xl md:text-6xl font-black italic">
                   ${total.min.toLocaleString()} – ${total.max.toLocaleString()}
                </span>
                <span className="text-xl font-bold self-end mb-2 uppercase italic opacity-60">USD</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-10 border-t border-brand/10 pt-8">
                 <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    <span className="text-white font-bold">{basePrices[selections.type as keyof typeof basePrices].label}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="text-white font-bold">{selections.features.length} Features selected</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-white font-bold capitalize">{selections.timeline} Timeline</span>
                 </div>
              </div>

              <div className="bg-brand/10 p-6 rounded-2xl mb-10 text-left">
                <p className="text-sm text-brand leading-relaxed">
                   <strong>ADDSTRATEGIC typically delivers</strong> this type of project in <strong>6-10 business days</strong> starting at <strong>$600 USD</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => window.location.href = `/${lang}#contact`}
                  className="flex-1 py-8 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform"
                >
                  {content.cta.button}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="py-8 px-8 border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl active:scale-95 transition-transform"
                >
                  Recalculate
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-lg mx-auto italic">
              {content.cta.text}
            </p>
          </div>
        )
    }
  }

  return (
    <ToolLayout
      lang={lang}
      title={content.title}
      subtitle={content.subtitle}
      privacyText={common.privacy}
      backToToolsText={common.backToTools}
      ctaText={content.cta.text}
      ctaButtonText="Request your free proposal today"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 flex items-center gap-3">
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                step >= s ? "bg-brand" : "bg-white/10"
              )} 
            />
          ))}
        </div>

        {renderStep()}
      </div>
    </ToolLayout>
  )
}

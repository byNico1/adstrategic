"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import { Button } from "@/shadcn/button"
import { 
  AppWindow, 
  Smartphone, 
  Database, 
  Layers, 
  Monitor,
  Check,
  ChevronRight,
  ShieldCheck,
  Box,
  Users,
  Clock
} from "lucide-react"
import { cn } from "@/utils/utils"

const basePrices = {
  mobile_app: { min: 5000, max: 25000, months: '2-5', label: "Mobile App" },
  web_app: { min: 3000, max: 20000, months: '1-4', label: "Web Application" },
  management_system: { min: 4000, max: 18000, months: '2-4', label: "Management System (CRM/ERP)" },
  api_backend: { min: 2000, max: 10000, months: '1-3', label: "API / Backend Service" },
  desktop: { min: 3000, max: 15000, months: '2-4', label: "Desktop Software" }
}

const featureAdders = {
  auth: { min: 400, max: 1000, label: "User Authentication" },
  admin: { min: 1000, max: 3000, label: "Admin Panel / Dashboard" },
  analytics: { min: 600, max: 1500, label: "Data Reporting & Analytics" },
  integrations: { min: 500, max: 2000, label: "3rd-Party Integrations" },
  payments: { min: 800, max: 2000, label: "Payment Processing" },
  realtime: { min: 1000, max: 2500, label: "Real-time Features (Chat/Notif)" },
  files: { min: 400, max: 1200, label: "Document Management" },
  workflows: { min: 1200, max: 4000, label: "Automated Workflows" }
}

export default function SoftwareCostEstimatorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    type: "web_app",
    features: [] as string[],
    scale: "small",
    complexity: "moderate",
    platforms: ["web"] as string[]
  })

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.softwareEstimator
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

    const scaleMult = selections.scale === "large" ? 1.6 : (selections.scale === "medium" ? 1.2 : 1.0)
    const complexMult = selections.complexity === "complex" ? 1.5 : (selections.complexity === "simple" ? 0.9 : 1.0)
    const platformCount = selections.platforms.length

    min *= scaleMult * complexMult * (1 + (platformCount - 1) * 0.4)
    max *= scaleMult * complexMult * (1 + (platformCount - 1) * 0.4)

    return { 
      min: Math.round(min), 
      max: Math.round(max),
      months: base.months
    }
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
            <h3 className="text-xl font-bold text-white mb-8">What are you building?</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "mobile_app", icon: Smartphone, label: "Mobile App", desc: "iOS, Android, or both native applications" },
                { id: "web_app", icon: AppWindow, label: "Web Application", desc: "Browser-based software (SaaS, Dashboards)" },
                { id: "management_system", icon: Database, label: "Management System", desc: "Internal tools, CRM, ERP, Booking" },
                { id: "api_backend", icon: Layers, label: "API / Backend", desc: "Data services and 3rd-party-integrations" },
                { id: "desktop", icon: Monitor, label: "Desktop Software", desc: "Native Windows or Mac applications" },
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
            <h3 className="text-xl font-bold text-white mb-8">Core features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(featureAdders).map(([id, data]) => (
                <button
                  key={id}
                  onClick={() => handleFeatureToggle(id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                    selections.features.includes(id) ? "border-brand bg-brand/10 text-brand shadow-xl shadow-brand/10" : "border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.04]"
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
               <Button onClick={() => setStep(3)} className="bg-brand hover:bg-brand/90 text-white flex-1 py-6 font-bold rounded-xl shadow-xl shadow-brand/20">Analyze complexity</Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold text-white mb-8">Scale & Complexity</h3>
            
            <div className="space-y-8">
              <section>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Estimated Daily Users</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "small", label: "< 50", sub: "Small team" },
                    { id: "medium", label: "50-500", sub: "SMB scale" },
                    { id: "large", label: "500+", sub: "Large scale" }
                  ].map(lvl => (
                    <button 
                      key={lvl.id}
                      onClick={() => setSelections({...selections, scale: lvl.id})}
                      className={cn("p-4 rounded-xl border transition-all text-center", selections.scale === lvl.id ? "border-brand bg-brand text-white" : "border-white/5 bg-white/[0.02] text-muted-foreground")}
                    >
                      <p className="font-bold">{lvl.label}</p>
                      <p className="text-[10px] uppercase tracking-tighter opacity-70">{lvl.sub}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Data Complexity</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "simple", label: "Simple", desc: "Basic records and lists" },
                    { id: "moderate", label: "Moderate", desc: "Multiple connected data types" },
                    { id: "complex", label: "Complex", desc: "Advanced logic and calculations" }
                  ].map(lvl => (
                    <button 
                      key={lvl.id}
                      onClick={() => setSelections({...selections, complexity: lvl.id})}
                      className={cn("p-4 rounded-xl border text-left flex items-center justify-between transition-all", selections.complexity === lvl.id ? "border-brand bg-brand/10 text-brand" : "border-white/5 bg-white/[0.02] text-white")}
                    >
                      <div>
                        <p className="font-bold">{lvl.label}</p>
                        <p className="text-xs text-muted-foreground">{lvl.desc}</p>
                      </div>
                      {selections.complexity === lvl.id && <Check className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-8 flex gap-4">
               <Button variant="ghost" onClick={() => setStep(2)} className="text-white hover:bg-white/5 px-8">Back</Button>
               <Button onClick={() => setStep(4)} className="bg-brand hover:bg-brand/90 text-white flex-1 py-6 font-bold rounded-xl shadow-xl shadow-brand/20">Generate Estimate</Button>
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
                    <Box className="w-4 h-4" />
                    <span className="text-white font-bold">{basePrices[selections.type as keyof typeof basePrices].label}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-white font-bold">{total.months} Months timeline</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-white font-bold capitalize">{selections.scale} Scale</span>
                 </div>
              </div>

              <div className="bg-brand/10 p-8 rounded-2xl mb-10 text-left flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand shrink-0 mt-1" />
                <p className="text-sm text-brand leading-relaxed">
                   {content.cta.text}
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
                  Restart
                </Button>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground italic max-w-lg mx-auto leading-relaxed">
              Estimates are based on standard industry rates for senior development teams.
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
      ctaText="Ready to build your masterpiece?"
      ctaButtonText="Request a technical consultation"
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

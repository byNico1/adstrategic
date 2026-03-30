"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import { Button } from "@/shadcn/button"
import { 
  Search, 
  Zap, 
  ShieldCheck, 
  Accessibility, 
  BarChart3, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  Gauge
} from "lucide-react"
import { cn } from "@/utils/utils"

interface AuditResult {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  metrics: {
    fcp: string
    lcp: string
    cls: string
    si: string
  }
}

export default function WebsiteAuditPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.websiteAudit
  const common = tools.common

  const runAudit = async () => {
    if (!url) return
    let targetUrl = url
    if (!url.startsWith("http")) targetUrl = `https://${url}`
    
    setIsProcessing(true)
    setError(null)
    setResult(null)

    try {
      // API Key is not strictly required for small volume, but using public v5 API
      const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo`
      
      const response = await fetch(apiEndpoint)
      const data = await response.json() as any

      if (data.error) {
        throw new Error(data.error.message || "Could not analyze website.")
      }

      const categories = data.lighthouseResult.categories
      const audits = data.lighthouseResult.audits

      setResult({
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories["best-practices"].score * 100),
        seo: Math.round(categories.seo.score * 100),
        metrics: {
          fcp: audits["first-contentful-paint"].displayValue,
          lcp: audits["largest-contentful-paint"].displayValue,
          cls: audits["cumulative-layout-shift"].displayValue,
          si: audits["speed-index"].displayValue,
        }
      })
    } catch (err: any) {
      console.error(err)
      setError("Failed to audit website. Please ensure the URL is correct and public.")
    } finally {
      setIsProcessing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
    if (score >= 50) return "text-amber-500 border-amber-500/20 bg-amber-500/5"
    return "text-red-500 border-red-500/20 bg-red-500/5"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <ToolLayout
      lang={lang}
      title={content.title}
      subtitle={content.subtitle}
      privacyText="Note: We use the Google PageSpeed API. By using this tool, you agree to Google's terms of service."
      backToToolsText={common.backToTools}
      ctaText={content.cta.text}
      ctaButtonText={content.cta.button}
    >
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
        {/* URL Input */}
        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl overflow-hidden relative group">
           <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <div className="flex-1 relative">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                 <input 
                   placeholder="https://example.com" 
                   value={url}
                   onChange={e => setUrl(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white outline-none focus:border-brand transition-all text-lg font-medium"
                   onKeyDown={e => e.key === 'Enter' && runAudit()}
                 />
              </div>
              <Button 
                onClick={runAudit}
                disabled={isProcessing || !url}
                className="py-5 px-10 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform shrink-0"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "Run Audit"}
              </Button>
           </div>
           
           {/* Decorative background pulse when loading */}
           {isProcessing && <div className="absolute inset-0 bg-brand/5 animate-pulse" />}
        </div>

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm animate-in shake duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Main Scores Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: "Performance", score: result.performance, icon: Zap },
                 { label: "Accessibility", score: result.accessibility, icon: Accessibility },
                 { label: "Best Practices", score: result.bestPractices, icon: ShieldCheck },
                 { label: "SEO", score: result.seo, icon: BarChart3 },
               ].map((item) => (
                 <div key={item.label} className={cn("flex flex-col items-center p-8 rounded-3xl border transition-all hover:scale-[1.02]", getScoreColor(item.score))}>
                    <div className="relative w-24 h-24 mb-6">
                       {/* SVG Progress Circle */}
                       <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/5" strokeWidth="3" />
                          <circle cx="18" cy="18" r="16" fill="none" className={cn("stroke-current", getScoreBg(item.score))} strokeWidth="3" strokeDasharray={`${item.score}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-black">{item.score}</span>
                       </div>
                    </div>
                    <item.icon className="w-5 h-5 mb-2 opacity-60" />
                    <span className="text-[10px] uppercase font-black tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>

            {/* Detailed Metrics */}
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
               <div className="flex items-center gap-3 mb-8">
                  <Gauge className="w-5 h-5 text-brand" />
                  <h3 className="font-bold text-white uppercase tracking-widest text-sm">Core Web Vitals & Metrics</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <MetricItem label="First Contentful Paint" value={result.metrics.fcp} />
                     <MetricItem label="Largest Contentful Paint" value={result.metrics.lcp} />
                  </div>
                  <div className="space-y-6">
                     <MetricItem label="Cumulative Layout Shift" value={result.metrics.cls} />
                     <MetricItem label="Speed Index" value={result.metrics.si} />
                  </div>
               </div>
            </div>

            {/* Success Message */}
            <div className="p-8 bg-brand/5 border border-brand/20 rounded-3xl flex items-center gap-6">
               <div className="p-4 bg-brand/20 rounded-full text-brand shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
               </div>
               <div>
                  <h4 className="text-white font-bold mb-1">Audit complete for <span className="text-brand">{url}</span></h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Improve these scores to boost your Google ranking and conversion rates. Our team can help you achieve a 90+ score across all categories.
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

function MetricItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
       <span className="text-sm text-muted-foreground">{label}</span>
       <span className="text-lg font-bold text-white">{value}</span>
    </div>
  )
}

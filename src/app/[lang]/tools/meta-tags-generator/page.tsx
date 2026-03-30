"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import { Button } from "@/shadcn/button"
import { 
  Tag, 
  Copy, 
  Check, 
  Eye, 
  Share2, 
  Globe, 
  Monitor,
  Layout,
  ExternalLink
} from "lucide-react"
import { cn } from "@/utils/utils"

export default function MetaTagsGeneratorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    title: "ADDSTRATEGIC | Software & Web Development Agency",
    description: "Empower your business with custom software and professional websites. Fast delivery, premium design, and scalable solutions.",
    url: "https://www.addstrategic.com",
    image: "https://www.addstrategic.com/og-image.jpg",
    siteName: "ADDSTRATEGIC",
    type: "website"
  })

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.metaTags
  const common = tools.common

  const generateCode = () => {
    return `<!-- Primary Meta Tags -->
<title>${form.title}</title>
<meta name="title" content="${form.title}">
<meta name="description" content="${form.description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${form.type}">
<meta property="og:url" content="${form.url}">
<meta property="og:title" content="${form.title}">
<meta property="og:description" content="${form.description}">
<meta property="og:image" content="${form.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${form.url}">
<meta property="twitter:title" content="${form.title}">
<meta property="twitter:description" content="${form.description}">
<meta property="twitter:image" content="${form.image}">`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout
      lang={lang}
      title={content.title}
      subtitle={content.subtitle}
      privacyText={common.privacy}
      backToToolsText={common.backToTools}
      ctaText={content.cta.text}
      ctaButtonText={content.cta.button}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
        {/* Form */}
        <div className="space-y-6 bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand/10 rounded-lg text-brand">
                 <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Site Information</h3>
           </div>

           <div className="space-y-4">
              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Page Title</label>
                 <input 
                   value={form.title}
                   onChange={e => setForm({...form, title: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors text-sm"
                 />
                 <p className="text-[10px] text-brand mt-1 text-right font-medium">{form.title.length} / 60 characters</p>
              </div>

              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Meta Description</label>
                 <textarea 
                   value={form.description}
                   onChange={e => setForm({...form, description: e.target.value})}
                   rows={3}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors text-sm resize-none"
                 />
                 <p className="text-[10px] text-brand mt-1 text-right font-medium">{form.description.length} / 160 characters</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Canonical URL</label>
                    <input 
                      value={form.url}
                      onChange={e => setForm({...form, url: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors text-xs"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Image URL (OG:Image)</label>
                    <input 
                      value={form.image}
                      onChange={e => setForm({...form, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors text-xs"
                    />
                 </div>
              </div>
           </div>

           <div className="pt-4">
              <Button 
                onClick={copyToClipboard}
                className="w-full py-6 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy HTML Meta Tags"}
              </Button>
           </div>
        </div>

        {/* Previews */}
        <div className="space-y-8">
           {/* Google Preview */}
           <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Globe className="w-4 h-4" />
                 </div>
                 <h3 className="font-bold text-white uppercase tracking-wider text-xs">Google Search Preview</h3>
              </div>
              <div className="space-y-1 max-w-lg">
                 <p className="text-[10px] text-white/40 mb-1 flex items-center gap-1">
                   {form.url} <span className="text-white/20">▼</span>
                 </p>
                 <h4 className="text-[#8ab4f8] text-xl font-medium hover:underline cursor-pointer truncate">
                    {form.title}
                 </h4>
                 <p className="text-[#bdc1c6] text-sm leading-relaxed line-clamp-2">
                    {form.description}
                 </p>
              </div>
           </div>

           {/* Social Preview */}
           <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Share2 className="w-4 h-4" />
                 </div>
                 <h3 className="font-bold text-white uppercase tracking-wider text-xs">Social Card Preview</h3>
              </div>
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 max-w-md shadow-2xl">
                 <div className="aspect-[1.91/1] bg-white/10 relative overflow-hidden flex items-center justify-center">
                    {form.image ? (
                       <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                         (e.target as any).src = "https://via.placeholder.com/1200x630/1a1a1a/55A7A6?text=OG+Image+Preview"
                       }} />
                    ) : (
                       <Share2 className="w-12 h-12 text-white/20" />
                    )}
                 </div>
                 <div className="p-4 space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{new URL(form.url || "https://example.com").hostname}</p>
                    <p className="text-white font-bold text-sm truncate">{form.title}</p>
                    <p className="text-muted-foreground text-[10px] line-clamp-2">{form.description}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Code Area */}
      <div className="mt-12 group relative">
         <div className="absolute -top-3 left-6 px-3 py-1 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-full z-10 shadow-lg">Generated Code</div>
         <pre className="bg-[#0D1117] border border-white/10 rounded-3xl p-8 pt-10 font-mono text-xs text-brand/80 overflow-x-auto leading-relaxed scrollbar-hide">
            <code>{generateCode()}</code>
         </pre>
         <button 
           onClick={copyToClipboard}
           className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all active:scale-95"
         >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
         </button>
      </div>
    </ToolLayout>
  )
}

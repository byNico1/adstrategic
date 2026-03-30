"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import { Button } from "@/shadcn/button"
import { 
  Palette, 
  Copy, 
  RefreshCw, 
  Check, 
  Layers,
  Zap,
  MousePointer2,
  ChevronRight
} from "lucide-react"
import { cn } from "@/utils/utils"

// Color helper functions
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : { r: 0, g: 0, b: 0 }
}

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, x)).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s, l = (max + min) / 2
  if (max === min) h = s = 0
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360; s /= 100; l /= 100
  let r, g, b
  if (s === 0) r = g = b = l
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

export default function ColorPaletteGeneratorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [baseColor, setBaseColor] = useState("#55A7A6")
  const [harmony, setHarmony] = useState<"monochromatic" | "analogous" | "complementary" | "triadic" | "split">("analogous")
  const [palette, setPalette] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    let colors: string[] = []

    switch (harmony) {
      case "monochromatic":
        colors = [
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 40))) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.max(20, hsl.l - 20))) as [number, number, number]),
          baseColor,
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.min(90, hsl.l + 20))) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 40))) as [number, number, number]),
        ]
        break
      case "analogous":
        colors = [
          rgbToHex(...Object.values(hslToRgb((hsl.h + 330) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 345) % 360, hsl.s, hsl.l)) as [number, number, number]),
          baseColor,
          rgbToHex(...Object.values(hslToRgb((hsl.h + 15) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l)) as [number, number, number]),
        ]
        break
      case "complementary":
        colors = [
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 30))) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.max(20, hsl.l - 15))) as [number, number, number]),
          baseColor,
          rgbToHex(...Object.values(hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 180) % 360, hsl.s, Math.max(10, hsl.l - 20))) as [number, number, number]),
        ]
        break
      case "triadic":
        colors = [
          rgbToHex(...Object.values(hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 120) % 360, hsl.s, Math.max(10, hsl.l - 20))) as [number, number, number]),
          baseColor,
          rgbToHex(...Object.values(hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 240) % 360, hsl.s, Math.max(10, hsl.l - 20))) as [number, number, number]),
        ]
        break
      case "split":
        colors = [
          rgbToHex(...Object.values(hslToRgb((hsl.h + 150) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 150) % 360, hsl.s, Math.max(10, hsl.l - 20))) as [number, number, number]),
          baseColor,
          rgbToHex(...Object.values(hslToRgb((hsl.h + 210) % 360, hsl.s, hsl.l)) as [number, number, number]),
          rgbToHex(...Object.values(hslToRgb((hsl.h + 210) % 360, hsl.s, Math.max(10, hsl.l - 20))) as [number, number, number]),
        ]
        break
    }
    setPalette(colors)
  }

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  useEffect(() => {
    generatePalette()
  }, [baseColor, harmony])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.colorPalette
  const common = tools.common

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const generateRandom = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setBaseColor(randomHex)
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
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
          <div>
            <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Base Color</label>
            <div className="flex gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 shrink-0">
                <input 
                  type="color" 
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                />
              </div>
              <input 
                type="text" 
                value={baseColor.toUpperCase()}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 font-mono text-xl text-white outline-none focus:border-brand transition-colors"
                maxLength={7}
              />
              <Button 
                onClick={generateRandom}
                variant="outline"
                className="h-16 w-16 rounded-2xl border-white/10 hover:bg-white/5 text-white"
              >
                <RefreshCw className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{content.harmony}</label>
            <div className="flex flex-wrap gap-2">
              {(["monochromatic", "analogous", "complementary", "triadic", "split"] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHarmony(h)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all",
                    harmony === h 
                      ? "bg-brand text-white shadow-lg shadow-brand/20" 
                      : "bg-white/5 text-muted-foreground border border-white/5 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Palette Display */}
        <div className="flex flex-col md:flex-row h-96 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
          {palette.map((color, idx) => (
            <div 
              key={idx}
              className="flex-1 relative group cursor-pointer overflow-hidden"
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color, idx)}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                    {copiedIndex === idx ? <Check className="w-6 h-6 text-white" /> : <Copy className="w-6 h-6 text-white" />}
                 </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center">
                 <span className="text-white font-mono font-bold text-sm tracking-widest drop-shadow-md">
                   {color.toUpperCase()}
                 </span>
              </div>
            </div>
          ))}
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <button 
             onClick={() => {
               const css = palette.map((c, i) => `--color-${i+1}: ${c};`).join('\n')
               copyToClipboard(css, 99)
             }}
             className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-brand/50 hover:bg-white/[0.04] transition-all group"
           >
             <div className="flex items-center gap-4">
                <div className="p-3 bg-brand/10 rounded-xl text-brand">
                   <Layers className="w-5 h-5" />
                </div>
                <div className="text-left">
                   <p className="text-white font-bold text-sm">Copy CSS Variables</p>
                   <p className="text-xs text-muted-foreground">Perfect for Tailwind or Vanilla CSS</p>
                </div>
             </div>
             {copiedIndex === 99 ? <Check className="w-5 h-5 text-brand" /> : <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />}
           </button>

           <button 
             onClick={() => {
               const hex = palette.join(', ')
               copyToClipboard(hex, 100)
             }}
             className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-brand/50 hover:bg-white/[0.04] transition-all group"
           >
             <div className="flex items-center gap-4">
                <div className="p-3 bg-brand/10 rounded-xl text-brand">
                   <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                   <p className="text-white font-bold text-sm">Copy HEX List</p>
                   <p className="text-xs text-muted-foreground">Separated by commas</p>
                </div>
             </div>
             {copiedIndex === 100 ? <Check className="w-5 h-5 text-brand" /> : <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />}
           </button>
        </div>

        {/* Pro Tip */}
        <div className="flex items-center gap-4 p-6 bg-brand/5 border border-brand/10 rounded-2xl italic text-sm text-brand">
           <MousePointer2 className="w-5 h-5 shrink-0" />
           <p><strong>Pro Tip:</strong> Click any color bar above to instantly copy its HEX code to your clipboard.</p>
        </div>
      </div>
    </ToolLayout>
  )
}

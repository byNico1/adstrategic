import React from "react"
import Link from "next/link"
import Breadcrumbs from "./Breadcrumbs"
import { Locale } from "@/src/i18n-config"
import { ShieldAlert, ArrowLeft } from "lucide-react"

interface ToolLayoutProps {
  lang: Locale
  title: string
  subtitle: string
  privacyText: string
  backToToolsText: string
  ctaText: string
  ctaButtonText: string
  children: React.ReactNode
}

export default function ToolLayout({
  lang,
  title,
  subtitle,
  privacyText,
  backToToolsText,
  ctaText,
  ctaButtonText,
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs lang={lang} items={[{ label: title }]} />
        
        <Link 
          href={`/${lang}/tools`} 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {backToToolsText}
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Content (The Tool) */}
        <div className="mb-16">
          {children}
        </div>

        {/* Privacy Info */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-16 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-brand/10 p-4 rounded-full">
            <ShieldAlert className="w-6 h-6 text-brand" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-xs">Privacy Guaranteed</h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {privacyText}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border border-brand/20 bg-gradient-to-br from-brand/5 to-transparent rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 uppercase italic tracking-wider">
            {ctaText}
          </h3>
          <Link
            href={`/${lang}#contact`}
            className="inline-block px-10 py-5 bg-brand hover:bg-brand/90 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand/20"
          >
            {ctaButtonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

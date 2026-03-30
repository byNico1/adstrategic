"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"

// We use dynamic import with ssr: false to prevent pdfjs-dist from being evaluated 
// on the server, which avoids the 'Object.defineProperty called on non-object' error.
const PDFToWordClient = dynamic(() => import("./PDFToWordClient"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
       <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse uppercase tracking-widest text-xs font-black">Initializing Engine...</p>
       </div>
    </div>
  )
})

export default function PDFToWordPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  return <PDFToWordClient lang={lang} dictionary={dictionary} />
}

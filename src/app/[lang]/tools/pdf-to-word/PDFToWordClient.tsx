"use client"

import React, { useState, useEffect } from "react"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import {
  FileText,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileArchive,
  Loader2
} from "lucide-react"
import { Document, Packer, Paragraph, TextRun } from "docx"
import { cn } from "@/utils/utils"

export default function PDFToWordClient({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    blob: Blob
    pageCount: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pdfjs, setPdfjs] = useState<any>(null)

  useEffect(() => {
    // Dynamic import inside useEffect ensures it only runs in browser
    // This avoids the 'Object.defineProperty called on non-object' error during SSR evaluation
    import("pdfjs-dist").then(mod => {
      mod.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.version}/pdf.worker.min.mjs`
      setPdfjs(mod)
    }).catch(err => {
      console.error("Failed to load PDF engine:", err)
      setError("Failed to initialize PDF engine.")
    })
  }, [])

  const { tools } = dictionary
  const content = tools.pdfToWord
  const common = tools.common

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      if (selectedFile && selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.")
        return
      }
      setFile(selectedFile || null)
      setError(null)
      setResult(null)
    }
  }

  const convertToWord = async () => {
    if (!file || !pdfjs) return
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise
      const numPages = pdf.numPages
      const docSections: any[] = []

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        
        // Group items by their vertical position (lines)
        const lines: { [key: number]: string } = {}
        textContent.items.forEach((item: any) => {
          const y = Math.round(item.transform[5])
          if (!lines[y]) lines[y] = ""
          lines[y] += item.str + " "
        })

        // Sort lines by Y descending (top to bottom)
        const sortedY = Object.keys(lines).map(Number).sort((a, b) => b - a)
        const pageParagraphs = sortedY.map(y => new Paragraph({
          children: [new TextRun(lines[y] || "")],
          spacing: { after: 200 }
        }))

        docSections.push({
          properties: {},
          children: pageParagraphs
        })
      }

      const doc = new Document({
        sections: docSections
      })

      const blob = await Packer.toBlob(doc)
      setResult({
        blob,
        pageCount: numPages
      })
    } catch (err: any) {
      console.error(err)
      setError("Error converting PDF. Ensure the file is not protected.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${file?.name.replace(".pdf", "")}_ADDSTRATEGIC.docx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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
      <div className="max-w-3xl mx-auto">
        {!file && !result && (
          <Dropzone
            onFilesSelected={handleFilesSelected}
            label={content.uploadLabel}
            hint="Max 20MB · .pdf only"
          />
        )}

        {file && !result && (
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 bg-brand/10 rounded-2xl mb-4">
                <FileArchive className="w-10 h-10 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
              <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>

            <Button
              onClick={convertToWord}
              disabled={isProcessing || !pdfjs}
              className="w-full py-8 text-lg font-bold bg-brand hover:bg-brand/90 text-white rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Converting...
                </div>
              ) : !pdfjs ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading Engine...
                </div>
              ) : (
                "Convert to Word"
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => setFile(null)}
              className="mt-4 text-muted-foreground hover:text-white"
            >
              Choose different file
            </Button>
          </div>
        )}

        {result && (
          <div className="bg-white/[0.03] border border-brand/20 rounded-3xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex p-4 bg-brand/10 text-brand rounded-full mb-6 text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.success}</h2>
            <p className="text-muted-foreground mb-4 italic">Pages converted: {result.pageCount}</p>
            
            <div className="p-6 bg-brand/5 border border-brand/10 rounded-2xl mb-10 text-sm text-brand italic">
              {content.note}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={downloadResult}
                className="flex-1 py-8 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <Download className="w-6 h-6" />
                {content.download}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                className="py-8 px-8 border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl active:scale-95 transition-transform"
              >
                <RefreshCw className="w-5 h-5 mr-3" />
                Restart
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

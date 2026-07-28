"use client"

import React, { useState, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import {
  Scissors,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Plus
} from "lucide-react"
import { PDFDocument } from "pdf-lib"
import JSZip from "jszip"
import { cn } from "@/utils/utils"

export default function PDFSplitPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    blob: Blob
    fileCount: number
    type: "pdf" | "zip"
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [splitMode, setSplitMode] = useState<"every" | "range" | "specific">("every")
  const [ranges, setRanges] = useState<string[]>([""])
  const [specificPages, setSpecificPages] = useState("")
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.pdfSplit
  const common = tools.common

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      if (selectedFile && selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.")
        return
      }
      if (selectedFile) {
        setFile(selectedFile)
        setError(null)
        setResult(null)
      }
    }
  }

  const splitPDF = async () => {
    if (!file) return
    setIsProcessing(true)
    setError(null)

    try {
      const originalArrayBuffer = await file.arrayBuffer()
      const originalPdf = await PDFDocument.load(originalArrayBuffer)
      setPageCount(originalPdf.getPageCount()) // Moved page count setting here
      const zip = new JSZip()
      let outputs: { blob: Blob; name: string }[] = []

      if (splitMode === "every") {
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(originalPdf, [i])
          newPdf.addPage(page)
          const bytes = await newPdf.save()
          outputs.push({
            blob: new Blob([bytes], { type: "application/pdf" }),
            name: `page_${i + 1}.pdf`
          })
        }
      } else if (splitMode === "range") {
        // Simple range parsing: "1-5", "6-10"
        for (const r of ranges) {
          if (!r.trim()) continue
          const [startStr, endStr] = r.split("-")
          const start = parseInt(startStr || "1") - 1
          const end = parseInt(endStr || pageCount.toString()) - 1

          if (isNaN(start) || isNaN(end) || start < 0 || end >= pageCount) {
             throw new Error(`Invalid range: ${r}`)
          }

          const newPdf = await PDFDocument.create()
          const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i)
          const copiedPages = await newPdf.copyPages(originalPdf, indices)
          copiedPages.forEach(p => newPdf.addPage(p))
          const bytes = await newPdf.save()
          outputs.push({
            blob: new Blob([bytes], { type: "application/pdf" }),
            name: `range_${start + 1}-${end + 1}.pdf`
          })
        }
      } else if (splitMode === "specific") {
        // Specific pages: "1, 3, 5-8"
        const pagesToExtract: number[] = []
        specificPages.split(",").forEach(part => {
          if (part.includes("-")) {
            const [startStr, endStr] = part.split("-")
            const start = parseInt(startStr!.trim())
            const end = parseInt(endStr!.trim())
            for (let i = start; i <= end; i++) pagesToExtract.push(i - 1)
          } else {
            const p = parseInt(part.trim())
            if (!isNaN(p)) pagesToExtract.push(p - 1)
          }
        })

        const uniquePages = Array.from(new Set(pagesToExtract)).filter(p => p >= 0 && p < pageCount).sort((a, b) => a - b)
        if (uniquePages.length === 0) throw new Error("No valid pages specified.")

        const newPdf = await PDFDocument.create()
        const copiedPages = await newPdf.copyPages(originalPdf, uniquePages)
        copiedPages.forEach(p => newPdf.addPage(p))
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" })
        outputs.push({
          blob: blob,
          name: `extracted_pages.pdf`
        })
      }

      if (outputs.length === 0) throw new Error("Processing failed.")
      
      if (outputs.length === 1) {
        setResult({
          blob: outputs[0]!.blob,
          fileCount: 1,
          type: "pdf"
        })
      } else {
        outputs.forEach(out => zip.file(out.name, out.blob))
        const zipBlob = await zip.generateAsync({ type: "blob" })
        setResult({
          blob: zipBlob,
          fileCount: outputs.length,
          type: "zip"
        })
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Error splitting PDF.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${file?.name.replace(".pdf", "")}_split_ADDSTRATEGIC.${result.type}`
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
            hint="Max 50MB · .pdf only"
          />
        )}

        {file && !result && (
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-10 p-4 bg-white/5 rounded-2xl">
              <div className="p-3 bg-brand/10 rounded-xl">
                <Scissors className="w-6 h-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate">{file.name}</p>
                <p className="text-xs text-brand font-black tracking-widest uppercase">{pageCount} Pages available</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6 mb-10">
              <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-4">Select Split Mode</h4>
              
              <div className="space-y-3">
                <button
                  onClick={() => setSplitMode("every")}
                  className={cn(
                    "w-full p-6 rounded-2xl border text-left flex items-center justify-between transition-all group",
                    splitMode === "every" ? "border-brand bg-brand/10 text-brand shadow-xl shadow-brand/10" : "border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                  )}
                >
                  <span className="font-bold">{content.modes.every}</span>
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", splitMode === "every" ? "border-brand" : "border-white/20")}>
                    {splitMode === "every" && <div className="w-3 h-3 bg-brand rounded-full animate-in zoom-in" />}
                  </div>
                </button>

                <div className={cn("rounded-2xl border transition-all overflow-hidden", splitMode === "range" ? "border-brand bg-brand/5" : "border-white/5 bg-white/[0.02]")}>
                  <button
                    onClick={() => setSplitMode("range")}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <span className={cn("font-bold", splitMode === "range" ? "text-brand" : "text-white")}>{content.modes.range}</span>
                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", splitMode === "range" ? "border-brand" : "border-white/20")}>
                      {splitMode === "range" && <div className="w-3 h-3 bg-brand rounded-full animate-in zoom-in" />}
                    </div>
                  </button>
                  {splitMode === "range" && (
                    <div className="p-6 pt-0 space-y-3 animate-in slide-in-from-top-2">
                       {ranges.map((range, idx) => (
                         <div key={idx} className="flex gap-2">
                            <input 
                              placeholder="e.g. 1-5" 
                              value={range}
                              onChange={(e) => {
                                const newRanges = [...ranges]
                                newRanges[idx] = e.target.value
                                setRanges(newRanges)
                              }}
                              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white w-full outline-none focus:border-brand transition-colors"
                            />
                            {ranges.length > 1 && (
                              <Button variant="ghost" size="icon" onClick={() => setRanges(ranges.filter((_, i) => i !== idx))}>
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                         </div>
                       ))}
                       <Button variant="outline" size="sm" onClick={() => setRanges([...ranges, ""])} className="w-full border-brand/20 text-brand hover:bg-brand/10">
                          <Plus className="w-4 h-4 mr-2" /> Add range
                       </Button>
                    </div>
                  )}
                </div>

                <div className={cn("rounded-2xl border transition-all overflow-hidden", splitMode === "specific" ? "border-brand bg-brand/5" : "border-white/5 bg-white/[0.02]")}>
                  <button
                    onClick={() => setSplitMode("specific")}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <span className={cn("font-bold", splitMode === "specific" ? "text-brand" : "text-white")}>{content.modes.specific}</span>
                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", splitMode === "specific" ? "border-brand" : "border-white/20")}>
                      {splitMode === "specific" && <div className="w-3 h-3 bg-brand rounded-full animate-in zoom-in" />}
                    </div>
                  </button>
                  {splitMode === "specific" && (
                    <div className="p-6 pt-0 animate-in slide-in-from-top-2">
                      <input 
                        placeholder="e.g. 1, 3, 5-8" 
                        value={specificPages}
                        onChange={(e) => setSpecificPages(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white w-full outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={splitPDF}
              disabled={isProcessing}
              className="w-full py-8 text-lg font-bold bg-brand hover:bg-brand/90 text-white rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </div>
              ) : (
                "Split PDF"
              )}
            </Button>
          </div>
        )}

        {result && (
          <div className="bg-white/[0.03] border border-brand/20 rounded-3xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex p-4 bg-brand/10 text-brand rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.success}</h2>
            <p className="text-muted-foreground mb-8 italic italic">Generated: {result.fileCount} {result.type === "zip" ? "files (.zip)" : "file (.pdf)"}</p>

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
                Start over
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm animate-in shake duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

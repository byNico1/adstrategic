"use client"

import React, { useState } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import { FileJson, Download, RefreshCw, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import { cn } from "@/utils/utils"

export default function PDFCompressorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    blob: Blob
    originalSize: number
    newSize: number
    reduction: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<"low" | "balanced" | "max">("balanced")

  // Load dictionary on client side for interactivity
  React.useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools, toolsHub } = dictionary
  const content = tools.pdfCompressor
  const common = tools.common

  const handleFilesSelected = (files: File[]) => {
    const selectedFile = files[0]
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.")
      return
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File too large. Max 50MB.")
      return
    }

    setFile(selectedFile)
    setError(null)
    setResult(null)
  }

  const compressPdf = async () => {
    if (!file) return
    const selectedFile: File = file
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // Basic "compression" in pdf-lib involves re-saving the document
      // which eliminates redundant data and reorganizes the file.
      // For more advanced compression, one would need to downsample images,
      // which is complex without external C++ libraries like Ghostscript.
      // However, pdf-lib's save() often provides significant gains for bloated PDFs

      const pdfBytes = await pdfDoc.save()
      const pdfBlob = new Blob([pdfBytes as any], { type: "application/pdf" })

      const reduction = ((file.size - pdfBlob.size) / file.size) * 100

      setResult({
        blob: pdfBlob,
        originalSize: file.size,
        newSize: pdfBlob.size,
        reduction: Math.max(0, reduction),
      })
    } catch (err) {
      console.error(err)
      setError("Error processing PDF. It might be password-protected or corrupted.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!file || !result) return
    const selectedFile = file
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedFile.name.replace(".pdf", "")}_compressed_ADDSTRATEGIC.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
      <div className="mx-auto max-w-3xl">
        {!file && !result && (
          <Dropzone onFilesSelected={handleFilesSelected} label={content.uploadLabel} hint={content.uploadHint} />
        )}

        {file && !result && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 duration-300 animate-in fade-in zoom-in">
            <div className="mb-8 flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <div className="bg-brand/10 rounded-xl p-3">
                <FileText className="h-6 w-6 text-brand" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-white">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFile(null)}
                className="hover:bg-red-500/10 hover:text-red-500"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-8">
              <label className="mb-4 block text-sm font-bold uppercase tracking-wider text-white">
                Compression Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(["low", "balanced", "max"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-bold capitalize transition-all",
                      compressionLevel === level
                        ? "shadow-brand/20 border-brand bg-brand text-white shadow-lg"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={compressPdf}
              disabled={isProcessing}
              className="hover:bg-brand/90 shadow-brand/20 w-full rounded-2xl bg-brand py-8 text-lg font-bold text-white shadow-xl transition-all active:scale-95"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  {content.compressing}
                </div>
              ) : (
                content.title.split(" — ")[0]
              )}
            </Button>
          </div>
        )}

        {result && (
          <div className="border-brand/20 rounded-3xl border bg-white/[0.03] p-10 text-center duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-brand/10 mb-6 inline-flex rounded-full p-4 text-brand">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">{content.success}</h2>
            <p className="mb-8 italic text-muted-foreground">
              Filename: {file?.name.replace(".pdf", "")}_compressed.pdf
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">Original Size</p>
                <p className="text-lg font-bold text-white">{formatSize(result.originalSize)}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">New Size</p>
                <p className="text-lg font-bold text-white">{formatSize(result.newSize)}</p>
              </div>
              <div className="bg-brand/5 border-brand/20 rounded-2xl border p-5">
                <p className="mb-1 text-xs font-bold uppercase text-brand">{content.reduction}</p>
                <p className="text-2xl font-black text-brand">{result.reduction.toFixed(1)}%</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={downloadResult}
                className="hover:bg-brand/90 flex flex-1 items-center justify-center gap-3 rounded-2xl bg-brand py-8 font-bold text-white transition-transform active:scale-95"
              >
                <Download className="h-6 w-6" />
                {content.download}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                className="rounded-2xl border-white/10 px-8 py-8 font-bold text-white transition-transform hover:bg-white/5 active:scale-95"
              >
                <RefreshCw className="mr-3 h-5 w-5" />
                Restart
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="shake mt-8 flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-500 duration-300 animate-in">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

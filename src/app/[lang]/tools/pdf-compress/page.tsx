"use client"

import React, { useState } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import { 
  FileJson, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from "lucide-react"
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
    if (files.length > 0) {
      const selectedFile = files[0]
      if (selectedFile && selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.")
        return
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File too large. Max 50MB.")
        return
      }
      setFile(selectedFile || null)
      setError(null)
      setResult(null)
    }
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
      // However, pdf-lib's save() often provides significant gains for bloated PDFs.
      
      const pdfBytes = await pdfDoc.save()
      const pdfBlob = new Blob([pdfBytes as any], { type: "application/pdf" })
      
      const reduction = ((file.size - pdfBlob.size) / file.size) * 100
      
      setResult({
        blob: pdfBlob,
        originalSize: file.size,
        newSize: pdfBlob.size,
        reduction: Math.max(0, reduction),
      })
    } catch (err: any) {
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
    link.download = `${selectedFile?.name.replace(".pdf", "")}_compressed_ADDSTRATEGIC.pdf`
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
      <div className="max-w-3xl mx-auto">
        {!file && !result && (
          <Dropzone
            onFilesSelected={handleFilesSelected}
            label={content.uploadLabel}
            hint={content.uploadHint}
          />
        )}

        {file && !result && (
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
              <div className="p-3 bg-brand/10 rounded-xl">
                <FileText className="w-6 h-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setFile(null)}
                className="hover:bg-red-500/10 hover:text-red-500"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="mb-8">
              <label className="text-sm font-bold text-white mb-4 block uppercase tracking-wider">Compression Level</label>
              <div className="grid grid-cols-3 gap-4">
                {(["low", "balanced", "max"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={cn(
                      "py-3 px-4 rounded-xl border text-sm font-bold transition-all capitalize",
                      compressionLevel === level
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={compressPDF}
              disabled={isProcessing}
              className="w-full py-8 text-lg font-bold bg-brand hover:bg-brand/90 text-white rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-95"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {content.compressing}
                </div>
              ) : (
                content.title.split(' — ')[0]
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
            <p className="text-muted-foreground mb-8 italic">Filename: {file?.name.replace(".pdf", "")}_compressed.pdf</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Original Size</p>
                <p className="text-lg font-bold text-white">{formatSize(result.originalSize)}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">New Size</p>
                <p className="text-lg font-bold text-white">{formatSize(result.newSize)}</p>
              </div>
              <div className="p-5 rounded-2xl bg-brand/5 border border-brand/20">
                <p className="text-xs font-bold text-brand uppercase mb-1">{content.reduction}</p>
                <p className="text-2xl font-black text-brand">{result.reduction.toFixed(1)}%</p>
              </div>
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
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm animate-in shake duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

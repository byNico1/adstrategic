"use client"

import React, { useState, useRef, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import {
  FileStack,
  Download,
  RefreshCw,
  CheckCircle2,
  GripVertical,
  Trash2,
  AlertCircle,
  Loader2,
  FileText,
  X
} from "lucide-react"
import { PDFDocument } from "pdf-lib"
import Sortable from "sortablejs"
import { cn } from "@/utils/utils"

interface QueuedFile {
  id: string
  file: File
  pageCount?: number
}

export default function PDFMergePage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [files, setFiles] = useState<QueuedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    blob: Blob
    totalPageCount: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const sortableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  useEffect(() => {
    if (sortableRef.current && files.length > 0 && !result) {
      const sortable = new Sortable(sortableRef.current, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: (evt: any) => {
        const { oldIndex, newIndex } = evt
        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
          const newFiles = [...files]
          const [moved] = newFiles.splice(oldIndex, 1)
          if (moved) {
            newFiles.splice(newIndex, 0, moved)
            setFiles(newFiles)
          }
        }
      },
      })
      return () => sortable.destroy()
    }
  }, [files, result])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.pdfMerge
  const common = tools.common

  const handleFilesSelected = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(f => f.type === "application/pdf")
    if (validFiles.length === 0) return

    const newQueuedFiles: QueuedFile[] = await Promise.all(
      validFiles.map(async (file) => {
        let pageCount = 0
        try {
          const arrayBuffer = await file.arrayBuffer()
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
          pageCount = pdfDoc.getPageCount()
        } catch (e) {
          console.error("Error reading PDF pages", e)
        }
        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          pageCount
        }
      })
    )

    setFiles(prev => [...prev, ...newQueuedFiles].slice(0, 10))
    setResult(null)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const mergePDFs = async () => {
    if (files.length < 2) return
    setIsProcessing(true)
    setError(null)

    try {
      const mergedPdf = await PDFDocument.create()
      let totalPages = 0

      for (const queued of files) {
        const arrayBuffer = await queued.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        totalPages += copiedPages.length
      }

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" }) // Changed mergedPdf to pdfBytes and added type cast

      setResult({
        blob,
        totalPageCount: totalPages
      })
    } catch (err: any) {
      console.error(err)
      setError("Error merging PDFs. Ensure all files are not corrupted and not password protected.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `merged_document_ADDSTRATEGIC.pdf`
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
        {!result && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <Dropzone
              onFilesSelected={handleFilesSelected}
              multiple={true}
              label={content.uploadLabel}
              hint={content.uploadHint}
              className={files.length > 0 ? "py-10" : "p-12"}
            />

            {files.length > 0 && (
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6 px-2">
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs">Files to merge ({files.length}/10)</h4>
                  <p className="text-xs text-muted-foreground italic">Drag to reorder</p>
                </div>

                <div ref={sortableRef} className="space-y-3 mb-8">
                  {files.map((queued, index) => ( // Added index to map
                    <div
                      key={queued.id}
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group transition-all"
                    >
                      <div className="drag-handle cursor-grab active:cursor-grabbing p-2 hover:text-brand text-muted-foreground transition-colors">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="p-2 bg-brand/10 rounded-lg shrink-0">
                        <FileText className="w-5 h-5 text-brand" /> {/* Changed Files to FileText */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{queued.file.name}</p> {/* Changed files[index].name to queued.file.name */}
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">
                          {queued.pageCount} pages · {(queued.file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(queued.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={mergePDFs}
                  disabled={files.length < 2 || isProcessing}
                  className="w-full py-8 text-lg font-bold bg-brand hover:bg-brand/90 text-white rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Merging...
                    </div>
                  ) : (
                    `Merge ${files.length} PDFs`
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="bg-white/[0.03] border border-brand/20 rounded-3xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex p-4 bg-brand/10 text-brand rounded-full mb-6 text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.success}</h2>
            <p className="text-muted-foreground mb-10 italic">Total merged pages: {result.totalPageCount}</p>

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
                  setFiles([])
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
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

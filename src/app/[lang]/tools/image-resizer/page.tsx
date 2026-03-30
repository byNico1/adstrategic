"use client"

import React, { useState, useRef, useEffect } from "react"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import ToolLayout from "@/components/Tools/ToolLayout"
import Dropzone from "@/components/Tools/Dropzone"
import { Button } from "@/shadcn/button"
import { 
  ImageIcon, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Maximize2, 
  Minimize2,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react"
import { cn } from "@/utils/utils"

export default function ImageResizerPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    blob: Blob
    width: number
    height: number
    size: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Settings
  const [width, setWidth] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [quality, setQuality] = useState(85)
  const [lockAspect, setLockAspect] = useState(true)
  const [scaleMode, setScaleMode] = useState<"dimensions" | "percentage">("dimensions")
  const [percentage, setPercentage] = useState(50)

  useEffect(() => {
    getDictionary(lang).then(setDictionary)
  }, [lang])

  if (!dictionary) return null

  const { tools } = dictionary
  const content = tools.imageResizer
  const common = tools.common

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      if (selectedFile && !selectedFile.type.startsWith("image/")) {
        setError("Invalid file type. Please upload an image.")
        return
      }
      if (!selectedFile) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setWidth(img.width)
          setHeight(img.height)
          setFile(selectedFile)
          setError(null)
          setResult(null)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleWidthChange = (val: string) => {
    const w = parseInt(val) || ""
    setWidth(w)
    if (lockAspect && image && w !== "") {
      setHeight(Math.round((w / image.width) * image.height))
    }
  }

  const handleHeightChange = (val: string) => {
    const h = parseInt(val) || ""
    setHeight(h)
    if (lockAspect && image && h !== "") {
      setWidth(Math.round((h / image.height) * image.width))
    }
  }

  const processImage = async () => {
    if (!image || !file) return
    setIsProcessing(true)
    setError(null)

    try {
      const canvas = document.createElement("canvas")
      let targetWidth = typeof width === "number" ? width : image.width
      let targetHeight = typeof height === "number" ? height : image.height

      if (scaleMode === "percentage") {
        targetWidth = Math.round(image.width * (percentage / 100))
        targetHeight = Math.round(image.height * (percentage / 100))
      }

      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")
      
      // Better quality for scaling down
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight)

      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"
      const outputQuality = outputType === "image/jpeg" ? quality / 100 : undefined
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResult({
              blob,
              width: targetWidth,
              height: targetHeight,
              size: blob.size
            })
            setIsProcessing(false)
          } else {
            throw new Error("Blob creation failed")
          }
        },
        outputType,
        outputQuality
      )
    } catch (err: any) {
      console.error(err)
      setError("Error processing image.")
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement("a")
    link.href = url
    const ext = file?.type.split("/")[1] || "jpg"
    link.download = `${file?.name.split(".")[0]}_resized_ADDSTRATEGIC.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const sizes = ["Bytes", "KB", "MB"]
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
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
        {!file && !result && (
          <Dropzone
            onFilesSelected={handleFilesSelected}
            accept="image/*"
            label="Drop your image here"
            hint="Supports JPG, PNG, WebP · Max 20MB"
          />
        )}

        {file && image && !result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col h-fit">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Original Preview</label>
               <div className="relative aspect-video bg-checkerboard rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                  <img src={image.src} alt="Original" className="max-w-full max-h-full object-contain shadow-2xl" />
               </div>
               <div className="flex justify-between text-xs text-muted-foreground italic">
                  <span>{image.width} × {image.height}px</span>
                  <span>{formatSize(file.size)}</span>
               </div>
            </div>

            {/* Controls */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-8">
               <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                  <button 
                    onClick={() => setScaleMode("dimensions")}
                    className={cn("flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all", scaleMode === "dimensions" ? "bg-brand text-white shadow-lg" : "text-muted-foreground hover:text-white")}
                  >
                    Dimensions
                  </button>
                  <button 
                    onClick={() => setScaleMode("percentage")}
                    className={cn("flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all", scaleMode === "percentage" ? "bg-brand text-white shadow-lg" : "text-muted-foreground hover:text-white")}
                  >
                    Percentage
                  </button>
               </div>

               {scaleMode === "dimensions" ? (
                 <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Width (px)</label>
                       <input 
                         type="number" 
                         value={width}
                         onChange={(e) => handleWidthChange(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors"
                       />
                    </div>
                    <button 
                      onClick={() => setLockAspect(!lockAspect)}
                      className={cn("mt-6 p-3 rounded-xl transition-all", lockAspect ? "text-brand bg-brand/10 shadow-inner" : "text-muted-foreground bg-white/5 hover:bg-white/10")}
                    >
                       {lockAspect ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Height (px)</label>
                       <input 
                         type="number" 
                         value={height}
                         onChange={(e) => handleHeightChange(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition-colors"
                       />
                    </div>
                 </div>
               ) : (
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Scale Percentage</label>
                       <span className="text-2xl font-black italic text-brand">{percentage}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={percentage}
                      onChange={(e) => setPercentage(parseInt(e.target.value))}
                      className="w-full accent-brand h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>
               )}

               {file?.type !== "image/png" && (
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Compression Quality</label>
                       <span className="text-2xl font-black italic text-brand">{quality}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full accent-brand h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>
               )}

               <Button 
                 onClick={processImage}
                 disabled={isProcessing}
                 className="w-full py-8 text-lg font-bold bg-brand hover:bg-brand/90 text-white rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-transform"
               >
                 {isProcessing ? <RefreshCw className="w-6 h-6 animate-spin" /> : "Resize Image"}
               </Button>
               
               <Button 
                  variant="ghost" 
                  onClick={() => setFile(null)}
                  className="w-full text-muted-foreground hover:text-white"
               >
                  Choose different image
               </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="max-w-3xl mx-auto bg-white/[0.03] border border-brand/20 rounded-3xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex p-4 bg-brand/10 text-brand rounded-full mb-6 text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Image ready!</h2>
            <p className="text-muted-foreground mb-10 italic">{result.width} × {result.height}px · {formatSize(result.size)}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={downloadResult}
                className="flex-1 py-8 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl shadow-brand/20"
              >
                <Download className="w-6 h-6" />
                Download Image
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
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .bg-checkerboard {
          background-image: 
            linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </ToolLayout>
  )
}

"use client"

import React, { useRef, useState } from "react"
import { Upload } from "lucide-react"
import { cn } from "@/utils/utils"

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  label: string
  hint?: string
  className?: string
}

export default function Dropzone({
  onFilesSelected,
  accept = ".pdf",
  multiple = false,
  label,
  hint,
  className,
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectFiles = (files: File[]) => {
    if (files.length === 0) return
    if (multiple) {
      onFilesSelected(files)
      return
    }
    const firstFile = files[0]
    if (!firstFile) return
    onFilesSelected([firstFile])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    selectFiles(files)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    selectFiles(files)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300",
        isDragging
          ? "border-brand bg-brand/5 scale-[1.01]"
          : "border-white/20 bg-white/[0.02] hover:border-brand/50 hover:bg-white/[0.04]",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
      
      <div className={cn(
        "mb-6 p-5 rounded-2xl bg-brand/10 text-brand group-hover:scale-110 transition-transform duration-300",
        isDragging && "scale-110"
      )}>
        <Upload className="w-10 h-10" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 text-center">
        {label}
      </h3>
      
      {hint && (
        <p className="text-sm text-muted-foreground text-center italic">
          {hint}
        </p>
      )}

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand/30 rounded-br-lg" />
    </div>
  )
}

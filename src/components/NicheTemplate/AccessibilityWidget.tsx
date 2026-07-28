"use client"

import { Accessibility } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/src/lib/utils"

type AccessibilityWidgetProps = {
  label: string
  toggleOutlineLabel: string
}

/**
 * Floating accessibility control. Currently stubs a focus-outline toggle.
 * Wire to a real a11y tool (e.g. UserWay / accessiBe) via niche config when ready.
 */
export function AccessibilityWidget({ label, toggleOutlineLabel }: AccessibilityWidgetProps) {
  const [open, setOpen] = useState(false)
  const [outlinesOn, setOutlinesOn] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("niche-a11y-outlines", outlinesOn)
    return () => {
      document.documentElement.classList.remove("niche-a11y-outlines")
    }
  }, [outlinesOn])

  return (
    <div className="fixed bottom-4 left-4 z-[110]">
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="mb-2 w-56 rounded-xl border border-border bg-card p-3 shadow-lg"
        >
          <button
            type="button"
            className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-accent"
            onClick={() => setOutlinesOn((prev) => !prev)}
            aria-pressed={outlinesOn}
          >
            {toggleOutlineLabel}
            <span className="ml-1 text-muted-foreground">({outlinesOn ? "on" : "off"})</span>
          </button>
        </div>
      )}
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <Accessibility className="size-6" aria-hidden="true" />
      </button>
    </div>
  )
}

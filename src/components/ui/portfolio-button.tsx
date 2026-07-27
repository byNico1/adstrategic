"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/shadcn/button"
import { cn } from "@/src/lib/utils"

interface PortfolioButtonProps {
  className?: string
  text?: string
}

export function PortfolioButton({ className, text = "Ver Nuestro Trabajo" }: PortfolioButtonProps) {
  const params = useParams()
  const lang = params?.lang || "es"

  return (
    <Button asChild size="lg" className={cn("mt-12", className)}>
      <Link href={`/${lang}/portfolio`}>
        {text}
      </Link>
    </Button>
  )
}

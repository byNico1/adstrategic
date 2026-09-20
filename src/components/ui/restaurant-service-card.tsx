"use client"

import { animate } from "framer-motion"
import { Smartphone, Sparkles, Wifi, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import React, { useEffect } from "react"
import Link from "next/link"
import { cn } from "@/utils/utils"
import { Card, CardTitle, CardDescription, CardSkeletonContainer } from "./product-card"
import { Button } from "./button"

interface Props {
  title: string
  subtitle: string
  description: string
  price: string
  billing: string
  features?: string[]
  limitations?: string[]
  examples?: string[]
  cta: string
  route: string
  highlight?: boolean
  className?: string
  id: string
}

export default function RestaurantServiceCard({
  id,
  title,
  subtitle,
  description,
  price,
  billing,
  features,
  limitations,
  examples,
  cta,
  route,
  highlight,
  className,
}: Props) {
  return (
    <Card className={cn("relative flex h-full flex-col", highlight ? "border-brand border bg-brand/5 shadow-[0_0_30px_rgba(85,167,166,0.15)] dark:bg-brand/10" : "", className)}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white shadow-lg">
          RECOMMENDED
        </div>
      )}
      
      <CardSkeletonContainer showGradient={!highlight}>
        <Skeleton id={id} />
      </CardSkeletonContainer>
      
      <div className="mt-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-baseline justify-between">
          <CardTitle className="py-0">{title}</CardTitle>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            {subtitle}
          </span>
        </div>
        
        <CardDescription className="mb-6 min-h-[3rem]">{description}</CardDescription>
        
        <div className="mb-6 flex items-end gap-2 border-b border-gray-200 pb-6 dark:border-gray-800">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{price}</span>
          {billing && <span className="mb-1 text-sm font-medium text-gray-500">{billing}</span>}
        </div>
        
        <div className="flex-grow space-y-4 text-sm text-gray-700 dark:text-gray-300">
          {features && features.length > 0 && (
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          
          {limitations && limitations.length > 0 && (
            <ul className="space-y-3 pt-2">
              {limitations.map((limitation, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          )}

          {examples && examples.length > 0 && (
            <div className="pt-2">
              <span className="font-semibold block mb-2">Connects to:</span>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, i) => (
                  <span key={i} className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-4">
          <Link href={route} className="w-full">
            <Button 
              className={cn("w-full group", highlight ? "bg-brand hover:bg-brand/90 text-white" : "bg-gray-900 dark:bg-white dark:text-black")}
              size="lg"
            >
              {cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

const IconsToRender = ({ id }: { id: string }) => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      {id === "digital-menu-basic" && (
        <Container className="circle-1">
          <Smartphone className="h-8 w-8 text-brand" />
        </Container>
      )}
      {id === "digital-menu-essence" && (
        <div className="flex shrink-0 flex-row items-center justify-center gap-2">
          <Container className="circle-1 h-12 w-12">
            <Smartphone className="h-6 w-6 text-brand" />
          </Container>
          <Container className="circle-2">
            <Sparkles className="h-8 w-8 text-[#0082fb]" />
          </Container>
        </div>
      )}
      {id === "nfc-touchpoints" && (
        <Container className="circle-3">
          <Wifi className="h-8 w-8 text-brand" />
        </Container>
      )}
    </div>
  )
}

const Skeleton = ({ id }: { id: string }) => {
  const scale = [1, 1.1, 1]
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"]
  const sequence = [
    [".circle-1", { scale, transform }, { duration: 0.8 }],
    [".circle-2", { scale, transform }, { duration: 0.8 }],
    [".circle-3", { scale, transform }, { duration: 0.8 }],
  ]

  useEffect(() => {
    // @ts-ignore
    animate(sequence, { repeat: Infinity, repeatDelay: 1 })
  }, [])

  return <IconsToRender id={id} />
}

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        `flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] dark:bg-[rgba(40,40,40,0.70)]
    `,
        className
      )}
    >
      {children}
    </div>
  )
}

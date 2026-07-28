import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib/utils"

type SplitFeatureProps = {
  id?: string
  heading: string
  /** Single paragraph body. Prefer `paragraphs` when the section needs multiple blocks. */
  body?: string
  paragraphs?: string[]
  bullets?: string[]
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
  imageOverlay?: string
  /** Desktop image position. On mobile image always stacks on top. */
  imagePosition?: "left" | "right"
  className?: string
}

export function SplitFeature({
  id,
  heading,
  body,
  paragraphs,
  bullets,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imageOverlay,
  imagePosition = "left",
  className,
}: SplitFeatureProps) {
  const imageBlock = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
      <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      {imageOverlay && (
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center bg-background/70 py-4 backdrop-blur-sm">
          <span className="text-2xl font-extrabold tracking-widest text-brand sm:text-4xl">{imageOverlay}</span>
        </div>
      )}
    </div>
  )

  const bodyBlocks = paragraphs?.length ? paragraphs : body ? [body] : []

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{heading}</h2>
      {bodyBlocks.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {paragraph}
        </p>
      ))}
      {bullets && bullets.length > 0 && (
        <ul className="mb-8 mt-2 space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm sm:text-base">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      <div className={bullets?.length ? undefined : "mt-4"}>
        <Button size="lg" className="rounded-md px-8 sm:text-lg" asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div
        className={cn(
          "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12",
          imagePosition === "right" && "lg:[&>*:first-child]:order-2"
        )}
      >
        {imageBlock}
        {textBlock}
      </div>
    </section>
  )
}

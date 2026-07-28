import { Phone } from "lucide-react"
import Link from "next/link"

import type { NicheConfig } from "@/src/config/niches/types"
import type { NicheDictionary } from "@/src/get-niche-dictionary"

type TopBarProps = {
  config: Pick<NicheConfig, "phoneNumber" | "phoneDisplay">
  dictionary: NicheDictionary["topBar"]
}

export function TopBar({ config, dictionary }: TopBarProps) {
  return (
    <div className="sticky top-0 z-[100] border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-center py-2 sm:justify-start">
        <Link
          href={`tel:${config.phoneNumber}`}
          className="inline-flex flex-col items-center rounded-full border border-primary/60 px-5 py-1.5 text-center transition-colors hover:border-primary hover:bg-primary/10 sm:items-start sm:text-left"
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
            <Phone className="size-3.5 text-brand" aria-hidden="true" />
            {config.phoneDisplay}
          </span>
          <span className="text-xs text-muted-foreground">{dictionary.tagline}</span>
        </Link>
      </div>
    </div>
  )
}

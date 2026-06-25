"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Locale } from "@/src/i18n-config"

export function LanguageToggle({ lang }: { lang: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    if (segments[1] === "en" || segments[1] === "es") {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }
    return segments.join("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {lang === "en" ? (
            <Image
              width={19.2}
              height={19.2}
              src="/assets/icons/usaflag.svg"
              className="h-[1.2rem] w-[1.2rem] transition-all "
              alt=""
            />
          ) : (
            <Image
              width={19.2}
              height={19.2}
              src="/assets/icons/spainflag.svg"
              className="absolute h-[1.2rem] w-[1.2rem] transition-all"
              alt=""
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.replace(redirectedPathName("en"))}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace(redirectedPathName("es"))}>Español</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

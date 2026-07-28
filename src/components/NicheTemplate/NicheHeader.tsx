"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LanguageToggle } from "@/components/ui/language-toggle"
import type { NicheConfig } from "@/src/config/niches/types"
import type { NicheDictionary } from "@/src/get-niche-dictionary"
import type { Locale } from "@/src/i18n-config"

type NicheHeaderProps = {
  config: Pick<NicheConfig, "logoSrc" | "logoAlt" | "navLinks" | "servicesDropdown" | "ctaUrl">
  dictionary: NicheDictionary["nav"]
  lang: Locale
}

export function NicheHeader({ config, dictionary, lang }: NicheHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const resolveLinkLabel = (key: string) => dictionary.links[key as keyof typeof dictionary.links] ?? key

  const resolveServiceLabel = (key: string) =>
    dictionary.servicesItems[key as keyof typeof dictionary.servicesItems] ?? key

  return (
    <header className="sticky z-[99] h-16 border-b border-border/40 bg-blured backdrop-blur sm:h-20">
      {isOpen && (
        <div
          className="absolute inset-x-0 top-16 h-[calc(100vh-4rem)] w-full bg-blured backdrop-blur sm:top-20 sm:h-[calc(100vh-5rem)] lg:hidden"
          aria-hidden="true"
        />
      )}

      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="#hero" className="z-50 shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            priority
            src={config.logoSrc}
            width={180}
            height={48}
            alt={config.logoAlt}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav
          className={`fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-6 px-5 py-8 transition-all duration-300 sm:top-20 lg:static lg:!translate-y-0 lg:flex-row lg:gap-1 lg:p-0 lg:!opacity-100 ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-[100vh] opacity-0 lg:pointer-events-auto"
          }`}
          aria-label="Main"
        >
          {config.navLinks.map((link) => (
            <Link key={link.labelKey} href={link.href} onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="lg" className="max-lg:text-lg">
                {resolveLinkLabel(link.labelKey)}
              </Button>
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="max-lg:text-lg">
                {dictionary.services}
                <ChevronDown className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {config.servicesDropdown.map((item) => (
                <DropdownMenuItem key={item.labelKey} asChild>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    {resolveServiceLabel(item.labelKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <LanguageToggle lang={lang} />
          </div>

          <Link href={config.ctaUrl} onClick={() => setIsOpen(false)} className="lg:hidden">
            <Button size="lg" className="rounded-full">
              {dictionary.contact}
            </Button>
          </Link>
        </nav>

        <div className="relative z-50 flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:inline-flex">
            <LanguageToggle lang={lang} />
          </div>
          <Link href={config.ctaUrl} className="hidden sm:inline-flex">
            <Button size="sm" className="rounded-md px-5">
              {dictionary.contact}
            </Button>
          </Link>
          <button
            type="button"
            className="lg:hidden"
            aria-label={isOpen ? dictionary.closeMenu : dictionary.openMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  )
}

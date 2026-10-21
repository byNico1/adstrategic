"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { IoMdClose, IoMdMenu } from "react-icons/io"
import { Button } from "@/shadcn/button"

import { type getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import { LanguageToggle } from "../ui/language-toggle"
import { ChevronDown } from "lucide-react"
import { cn } from "@/utils/utils"

export const Header = ({
  headerLinks,
  lang,
}: {
  headerLinks: Awaited<ReturnType<typeof getDictionary>>["HeaderLinks"]
  lang: Locale
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const contactLink = headerLinks.find((link) => "cta" in link && link.cta)
  const navLinks = headerLinks.filter((link) => !("cta" in link && link.cta))

  function handleClick() {
    setIsOpened((prev) => {
      if (prev) {
        setOpenAccordion(null)
      }
      return !prev
    })
  }

  function handleCloseMenu() {
    setIsOpened(false)
    setOpenAccordion(null)
  }

  function toggleAccordion(linkName: string) {
    setOpenAccordion((prev) => (prev === linkName ? null : linkName))
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-[99] h-20 border-black/20 bg-blured`}>
      {isOpened && (
        <div className={`absolute inset-x-0 top-20 h-[calc(100vh-5rem)] w-full bg-blured backdrop-blur lg:hidden`} />
      )}

      <div className="flex h-full items-center justify-around px-5 backdrop-blur">
        <Link href={"/"} className="z-50 flex items-center gap-5">
          <Image priority src="/addstrategic_banner.png" width={180} height={180} alt="logo" className=" w-64" />
        </Link>

        <div
          className={`fixed inset-x-0 top-20 z-40 flex flex-col items-center px-5 transition-all duration-500 max-lg:h-[calc(100vh-5rem)] max-lg:w-full max-lg:overflow-y-auto max-lg:py-8 max-lg:justify-start lg:static lg:!translate-y-0 lg:!opacity-100 lg:justify-center ${
            isOpened ? "translate-y-0 opacity-100" : "translate-y-[-100vh] opacity-0"
          }`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-6 px-5 font-semibold max-lg:text-lg lg:flex-row lg:gap-8">
            {navLinks.map((link) => {
              const hasSublinks = "sublinks" in link && Boolean(link.sublinks && link.sublinks.length > 0)

              if (hasSublinks) {
                const isOpen = openAccordion === link.name
                return (
                  <div key={link.name} className="w-full lg:w-auto">
                    {/* Versión móvil (Acordeón) */}
                    <div className="flex flex-col items-center w-full lg:hidden">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(link.name)}
                        className="flex items-center justify-center gap-2 text-xl font-semibold py-2 px-4 rounded-xl text-foreground hover:bg-white/5 active:bg-white/10 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            isOpen ? "rotate-180 text-brand" : "text-slate-400"
                          )}
                        />
                      </button>

                      {/* Contenido colapsable del acordeón */}
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out w-full max-w-sm",
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-2 mb-2" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                        )}
                      >
                        <div className="overflow-hidden flex flex-col items-center gap-1 rounded-2xl bg-slate-900/70 border border-white/10 p-2 backdrop-blur-md">
                          {link.sublinks.map((sub: any) => (
                            <Link
                              key={sub.name}
                              href={`${sub.url}`}
                              onClick={handleCloseMenu}
                              className={cn(
                                "block w-full text-center py-2.5 px-3 rounded-lg text-sm transition-colors",
                                sub.indent
                                  ? "text-brand font-medium hover:bg-brand/10"
                                  : "text-slate-200 hover:text-white hover:bg-white/10 font-medium"
                              )}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Versión Desktop (Dropdown hover) */}
                    <div className="hidden lg:block group relative">
                      <div className="flex items-center">
                        <Link href={`${link.url}`}>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="font-semibold text-base"
                          >
                            {link.name}
                            <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                          </Button>
                        </Link>
                      </div>
                      <div className="hidden group-hover:block absolute top-full left-0 w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl rounded-xl py-2 z-[100]">
                        {link.sublinks.map((sub: any) => (
                          <Link
                            key={sub.name}
                            href={`${sub.url}`}
                            className="block w-full text-left"
                          >
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start rounded-none px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800",
                                sub.indent ? "pl-8 text-brand" : "text-gray-800 dark:text-gray-200"
                              )}
                            >
                              {sub.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link onClick={handleCloseMenu} key={link.name} href={`${link.url}`}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="max-lg:text-xl max-lg:hover:bg-blue-200 max-lg:dark:hover:bg-cyan-700"
                  >
                    {link.name}
                  </Button>
                </Link>
              )
            })}

            <div className="lg:hidden">
              <LanguageToggle lang={lang} />
            </div>

            {contactLink && (
              <Link href={contactLink.url} onClick={handleCloseMenu} className="lg:hidden">
                <Button size="lg" className="rounded-full">
                  {contactLink.name}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="relative z-50 flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:inline-flex">
            <LanguageToggle lang={lang} />
          </div>

          {contactLink && (
            <Link href={contactLink.url} className="hidden sm:inline-flex">
              <Button size="sm" className="rounded-md px-5">
                {contactLink.name}
              </Button>
            </Link>
          )}

          <button className="lg:hidden" aria-label="mobile-menu" onClick={handleClick}>
            {isOpened ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            <span className="sr-only">Mobile menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

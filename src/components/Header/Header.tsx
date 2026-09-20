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

  const contactLink = headerLinks.find((link) => "cta" in link && link.cta)
  const navLinks = headerLinks.filter((link) => !("cta" in link && link.cta))

  function handleClick() {
    setIsOpened((prev) => !prev)
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
          className={`fixed inset-x-0 top-20 z-40 flex flex-col items-center justify-center px-5 transition-all duration-500 max-lg:min-h-[calc(100vh-5rem)] max-lg:w-full lg:static lg:!translate-y-0 lg:!opacity-100 ${
            isOpened ? "translate-y-0 opacity-100" : "translate-y-[-100vh] opacity-0"
          }`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-8 px-5 font-semibold max-lg:text-lg lg:flex-row">
            {navLinks.map((link) => (
              "sublinks" in link && link.sublinks ? (
                <div key={link.name} className="group relative w-full lg:w-auto">
                  <div className="flex items-center w-full justify-center lg:justify-start">
                    <Link href={`${link.url}`} onClick={() => setIsOpened(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="max-lg:text-xl max-lg:hover:bg-blue-200 max-lg:dark:hover:bg-cyan-700"
                      >
                        {link.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180 hidden lg:inline-block" />
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden max-lg:flex max-lg:flex-col max-lg:items-center max-lg:mt-2 lg:group-hover:block lg:absolute lg:top-full lg:left-0 lg:w-72 lg:bg-white lg:dark:bg-slate-900 lg:border lg:border-gray-200 lg:dark:border-slate-800 lg:shadow-xl lg:rounded-xl lg:py-2 z-[100]">
                    {link.sublinks.map((sub: any) => (
                      <Link key={sub.name} href={`${sub.url}`} onClick={() => setIsOpened(false)} className="block w-full text-center lg:text-left">
                        <Button
                          variant="ghost"
                          className={cn("w-full lg:justify-start rounded-none px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800", sub.indent ? "lg:pl-8 text-brand" : "text-gray-800 dark:text-gray-200")}
                        >
                          {sub.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link onClick={() => setIsOpened(false)} key={link.name} href={`${link.url}`}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="max-lg:text-xl max-lg:hover:bg-blue-200 max-lg:dark:hover:bg-cyan-700"
                  >
                    {link.name}
                  </Button>
                </Link>
              )
            ))}

            <div className="lg:hidden">
              <LanguageToggle lang={lang} />
            </div>

            {contactLink && (
              <Link href={contactLink.url} onClick={() => setIsOpened(false)} className="lg:hidden">
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

"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { IoMdClose, IoMdMenu } from "react-icons/io"
import { Button } from "@/shadcn/button"
import { ModeToggle } from "@/shadcn/mode-toggle"
import { type getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import { LanguageToggle } from "../ui/language-toggle"

export const Header = ({
  headerLinks,
  lang,
}: {
  headerLinks: Awaited<ReturnType<typeof getDictionary>>["HeaderLinks"]
  lang: Locale
}) => {
  const pathname = usePathname()

  const [isOpened, setIsOpened] = useState(false)

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
          <Image priority src="/adstrategic-180.webp" width={180} height={180} alt="logo" className="h-10 w-10" />
          <h2 className="hidden text-2xl font-semibold sm:inline">ADSTRATEGIC</h2>
        </Link>

        <div
          className={`fixed inset-x-0 top-20 z-40 flex flex-col items-center justify-center px-5 transition-all duration-500 max-lg:min-h-[calc(100vh-5rem)] max-lg:w-full lg:static lg:!translate-y-0 lg:!opacity-100 ${
            isOpened ? "translate-y-0 opacity-100" : "translate-y-[-100vh] opacity-0"
          }`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-8 px-5 font-semibold max-lg:text-lg lg:flex-row">
            {headerLinks.map((link) => (
              <Link onClick={() => setIsOpened(false)} key={link.name} href={`${link.url}`}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="max-lg:text-xl max-lg:hover:bg-blue-200 max-lg:dark:hover:bg-cyan-700"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
            {(pathname === "/" || pathname === "/es" || pathname === "/en") && <LanguageToggle lang={lang} />}
          </div>
        </div>
        <div className="relative flex items-center justify-center gap-5">
          <ModeToggle />
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

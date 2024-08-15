"use client"

import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const LINKS = [
  { name: "Blog", url: "/blog" },
  { name: "About Us", url: "/#about" },
  { name: "Services", url: "/#services" },
  { name: "Contact", url: "/#contact" },
]

export const Header = () => {
  const pathname = usePathname()
  const [isOpened, setIsOpened] = useState(false)

  const backgroundColor: "white" | "black" = pathname.includes("blog") ? "white" : "black"

  function handleClick() {
    setIsOpened((prev) => !prev)
  }

  const bgContainerStyles = backgroundColor === "black" ? "bg-[#000000c6] text-white" : "bg-[#ffffffee] text-black"
  const bgTextStyles = backgroundColor === "black" ? "text-white" : "text-black"
  const bgBlurredStyles = backgroundColor === "black" ? "max-md:bg-[#000000c6]" : "max-md:bg-[#ffffffee]"
  const btnStyles = backgroundColor === "white" && `max-md:hover:text-white `

  return (
    <header className={`fixed inset-x-0 top-0 z-[99] h-20 border-black/20 ${bgContainerStyles}`}>
      {isOpened && (
        <div
          className={`absolute inset-x-0 top-20 h-[calc(100vh-5rem)] w-full backdrop-blur md:hidden ${bgBlurredStyles}`}
        />
      )}

      <div className="flex h-full items-center justify-around px-5 backdrop-blur">
        <Link href={"/"} className="z-50 flex items-center gap-5">
          <Image src="/adstrategic-180.png" width={180} height={180} alt="logo" className="h-10 w-10" />
          <h2 className="hidden text-2xl font-semibold sm:inline">ADSTRATEGIC</h2>
        </Link>

        <div
          className={`fixed inset-x-0 top-20 z-40 flex flex-col items-center justify-center px-5 transition-all duration-500 max-md:min-h-[calc(100vh-5rem)] max-md:w-full md:static md:!translate-y-0 md:!opacity-100 ${bgTextStyles} ${
            isOpened ? "translate-y-0 opacity-100" : "translate-y-[-100vh] opacity-0"
          }`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-8 px-5 font-semibold max-md:text-lg md:flex-row">
            {LINKS.map((link) => (
              <Link
                onClick={() => setIsOpened(false)}
                key={link.name}
                href={`${link.url}`}
                className={`delay-50 h-full cursor-pointer items-center justify-center text-center max-md:inline-flex max-md:min-h-12 max-md:min-w-32 max-md:rounded-xl max-md:px-6 max-md:py-2.5 max-md:text-lg max-md:transition-colors max-md:hover:bg-blue-600 md:hover:border-b-2 md:hover:border-b-brand ${btnStyles}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <button aria-label="mobile-menu" onClick={handleClick}>
            {isOpened ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">Mobile menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

import "styles/tailwind.css"
import "styles/hero.css"
import Image from "next/image"
import Footer from "@/components/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-around px-5 pt-10 text-white">
            <div className="z-30 flex items-center gap-5">
              <Image src="/adstrategic-180.png" width={180} height={180} alt="" className="h-16 w-16" />
              <h2 className="hidden text-2xl font-semibold md:inline">ADSTRATEGIC</h2>
            </div>
            <div className="font-semiboldbold z-30 hidden items-center gap-5 sm:flex [&_p]:text-lg ">
              <a href="#about" className="  hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                About Us
              </a>
              <a href="#services" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Services
              </a>
              <a href="#process" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Process
              </a>
              <a href="#contact" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Contact
              </a>
            </div>
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  )
}

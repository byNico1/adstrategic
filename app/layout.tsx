import "styles/tailwind.css"
import "styles/hero.css"
import Image from "next/image"
import ShowModal from "./components/ShowModal"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="relative">
          <div className="flex items-center justify-around px-5 pt-10 text-white">
            <div className="z-50 flex items-center gap-5">
              <Image src="/adstrategic-180.png" width={180} height={180} alt="" className="h-16 w-16" />
              <h2 className="hidden text-2xl font-semibold sm:inline">ADSTRATEGIC</h2>
            </div>
            <div className="font-semiboldbold z-50 hidden items-center gap-5 sm:flex [&_p]:text-lg ">
              <a href="#about" className="  hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                About Us
              </a>
              <a href="#process" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Process
              </a>
              <a href="#info" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Info
              </a>
              <a href="#contact" className=" hover:cursor-pointer hover:border-b-2 hover:border-b-brand">
                Contact
              </a>
            </div>
          </div>

          <section className="bg-white dark:bg-gray-900">
            <div className="grid min-h-[80vh] px-4 pb-8 text-center lg:py-16">
              <Image
                alt=""
                fill
                sizes="100vw"
                src="/info.jpg"
                style={{
                  objectFit: "cover",
                }}
                className="hero "
              />
              <div className="absolute inset-0 z-20 bg-[#1e1e1ed7]" />
              <div className="z-20 mx-auto place-self-center">
                <p className="mb-8 text-lg font-medium text-[#ffffff]">Effortless Business Growth</p>

                <h2 className="mb-8 max-w-2xl text-3xl font-extrabold !leading-tight tracking-wide text-white md:text-4xl xl:text-5xl">
                  Experience <span className="text-brand">growth</span> in your{" "}
                  <span className="text-brand">business</span> effortlesly as we bring you
                  <span className="text-brand"> top-tier leads</span>
                </h2>

                <p className="mb-8 text-lg font-medium text-white">
                  For A <span className="text-brand underline">Limited Time</span> Only
                </p>

                <ShowModal />
              </div>
            </div>
          </section>
        </header>
        {children}
        <footer className="flex flex-col items-center justify-center gap-2 pb-10 pt-14">
          <Image src="/adstrategic-180.png" width={180} height={180} alt="" className="h-20 w-20" />
          {/* <h2 className="text-3xl">Adstrategic</h2> */}
          <p>Adstrategic - &copy;2023 All Rights Reserved</p>
        </footer>
      </body>
    </html>
  )
}

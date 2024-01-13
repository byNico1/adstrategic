import { Metadata } from "next"
import Image from "next/image"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "lp-items"
import ShowModal from "./components/ShowModal"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <h2 className=" mb-4 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:text-5xl" id="about">
          Who are <span className="text-brand">We</span>?
        </h2>

        <p className="mx-auto mb-12 max-w-4xl text-center xl:mb-24">
          We&apos;re an agency that grows businesses by delivering top-tier leads through strategic advertising on
          popular social media sites. Our targeted approach not only frees you up to concentrate on your work but also
          ensures your growth is driven by genuinely interested clients, making your business expansion smooth and
          efficient.
        </p>

        <h2
          className="mb-8 text-center text-3xl font-extrabold !leading-tight md:text-4xl xl:mb-12 xl:text-5xl"
          id="process"
        >
          Our <span className="text-brand">Process</span>?
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="Card">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                1
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold">Gather Content</h3>
            </div>
            <p className="text-center">
              We gather the essence of your brand - captivating visuals, engaging copy, and key messages. This lays the
              foundation for a compelling and impactful social media presence.
            </p>
          </div>
          <div className="">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                2
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold">Launching Ads</h3>
            </div>
            <p className="text-center">
              Launching Ads is where the magic happens. With data-driven precision, we ensure your message resonates,
              driving engagement and conversions for optimal social media success
            </p>
          </div>
          <div className="Card">
            <div className="flex flex-col justify-center gap-10 xl:flex-row xl:justify-start">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-black xl:mx-0">
                3
              </div>
              <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">Generate Leads</h3>
            </div>
            <p className="text-center">
              Our SMMA employs dynamic strategies, converting social media interactions into top-tier qualified leads
              that drive your business forward. Experience the power of strategic lead generation with our dedicated
              approach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900" id="info">
        <div className="relative grid min-h-[70vh] px-4 py-8 text-center lg:py-16">
          <Image
            alt=""
            fill
            sizes="100vw"
            src="/hero.jpg"
            style={{
              objectFit: "cover",
            }}
            className="hero z-10"
          />
          <div className="absolute inset-0 z-10 bg-[#000000c3]" />
          <div className="z-10 mx-auto place-self-center">
            <h2 className="mb-2 max-w-2xl text-3xl font-extrabold !leading-tight tracking-wide text-white md:text-4xl xl:text-5xl">
              Get 10 New Top-Tier Leads
            </h2>
            <p className="mb-12 max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-brand md:text-3xl xl:text-4xl">
              Within 30 days
            </p>

            <form className="mx-auto w-full max-w-xl rounded-md bg-white p-8">
              <div className="mx-auto  flex w-3/4 flex-col ">
                <div className="mb-4 flex flex-col items-start justify-start">
                  <label className="mb-2 block pr-4 text-left font-bold text-gray-500" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                    id="name"
                    type="text"
                    placeholder="Name"
                  ></input>
                </div>
                <div className="mb-4 flex flex-col ">
                  <label className="mb-1 block pr-4 text-left font-bold text-gray-500" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <div className=" flex flex-col ">
                  <label className="mb-1 block pr-4 text-left font-bold text-gray-500" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                  />
                </div>

                <Button className="my-6 text-base sm:mt-8 sm:text-xl">Send Me My Service</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto mt-10 flex w-full max-w-2xl flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex animate-infinite-scroll items-center justify-center md:justify-start ">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div
                key={singleItem.title}
                className="mx-8 flex flex-col items-center justify-center text-center md:mx-12 xl:mx-16"
              >
                <div className="mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full text-blue-700 dark:bg-primary-900 ">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
              </div>
            ))}
          </div>
          <div
            className="flex animate-infinite-scroll items-center justify-center md:justify-start "
            aria-hidden="true"
          >
            {LP_GRID_ITEMS.map((singleItem) => (
              <div
                key={singleItem.title}
                className="mx-8 flex flex-col items-center justify-center text-center md:mx-12 xl:mx-16"
              >
                <div className="mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full text-blue-700 dark:bg-primary-900 ">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

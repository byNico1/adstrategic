"use client"

import Image from "next/image"
import { useState } from "react"
import { type getDictionary } from "@/src/get-dictionary"
import { Button } from "../ui/button"
export default function Process({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["process"] }) {
  const [option, setOption] = useState<"web" | "software">("web")

  return (
    <section className="mx-auto max-w-screen-xl px-4 pt-16 sm:pt-24 lg:px-6" id="process">
      <h2
        className="mb-8 text-center text-5xl font-extrabold !leading-tight sm:text-7xl xl:mb-12"
        dangerouslySetInnerHTML={{ __html: dictionary.title }}
      ></h2>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-5">
        {Object.keys(dictionary.processInformation).map((key) => (
          <Button
            disabled={key === "Coming Soon" ? true : false}
            size="lg"
            variant={option === key ? "default" : "ghost"}
            key={key}
            onClick={() => setOption(key as "software" | "web")}
          >
            {/* {key === "web" ? "Web Development" : key === "marketing" ? "Digital Marketing" : "Coming Soon"} */}
            {dictionary.processInformation[key as keyof typeof dictionary.processInformation].title}
          </Button>
        ))}
      </div>

      <div className="grid-rows-2S mx-auto grid grid-cols-1 gap-5 max-lg:max-w-xl lg:grid-cols-2">
        <div className="grid place-items-center  rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              1
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold">
              {dictionary.processInformation[option].steps.step1.title}
            </h3>
          </div>

          <div className="relative mb-4 aspect-square w-full sm:aspect-video">
            <Image
              className="rounded-2xl"
              fill
              src={dictionary.processInformation[option].steps.step1.image}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          <p className="max-w-[460px] text-center">{dictionary.processInformation[option].steps.step1.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              2
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold">
              {dictionary.processInformation[option].steps.step2.title}
            </h3>
          </div>

          {option === "web" ? (
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl sm:aspect-video">
              <video
                width="800"
                height="450"
                autoPlay
                muted
                loop
                className="absolute inset-0 h-full w-full object-cover object-top"
              >
                <source src={dictionary.processInformation[option].steps.step2.image} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            option === "software" && (
              <div className="relative mb-4 aspect-square w-full sm:aspect-video">
                <Image
                  className="rounded-2xl"
                  fill
                  src={dictionary.processInformation[option].steps.step2.image}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  alt=""
                />
              </div>
            )
          )}

          <p className="max-w-[460px] text-center">{dictionary.processInformation[option].steps.step2.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              3
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">
              {dictionary.processInformation[option].steps.step3.title}
            </h3>
          </div>
          <div className="relative mb-4 aspect-square w-full sm:aspect-video">
            <Image
              className="rounded-2xl"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              src={dictionary.processInformation[option].steps.step3.image}
              alt=""
            />
          </div>
          <p className="max-w-[460px] text-center">{dictionary.processInformation[option].steps.step3.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              4
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">
              {dictionary.processInformation[option].steps.step4.title}
            </h3>
          </div>
          {option === "web" ? (
            <div className="relative mb-4 grid aspect-square w-full place-items-center rounded-2xl bg-foreground p-4 text-center text-background sm:aspect-video">
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src="/assets/process/web/loading-ready.svg"
                  className="mb-6 dark:!filter-none"
                  style={{
                    filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(16deg) brightness(102%) contrast(101%)",
                  }}
                  alt=""
                />
                <p className="text-lg font-bold">Your site has been published to</p>
                <p className="text-[#55A7A6] underline dark:text-blue-900">www.yoursite.com</p>
              </div>
            </div>
          ) : (
            option === "software" && (
              <div className="relative mb-4 aspect-square w-full sm:aspect-video">
                <Image
                  className="rounded-2xl"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  src={dictionary.processInformation[option].steps.step4.image}
                  alt=""
                />
              </div>
            )
          )}
          <p className="max-w-[460px] text-center">{dictionary.processInformation[option].steps.step4.description}</p>
        </div>
      </div>
    </section>
  )
}

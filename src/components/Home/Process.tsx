"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"

const processInformation = {
  marketing: {
    title: "Digital Marketing",
    id: "marketing",
    description:
      "We help you create engaging social media content, reach your target audience, and build a strong brand identity.",
    steps: {
      step1: {
        title: "Define goals",
        image: "/assets/process/marketing/define-goals.webp",
        description: "We hear your goals and align them with your business objectives",
      },
      step2: {
        title: "Define target audience",
        image: "/assets/process/marketing/target-audience.webp",
        description:
          "We make a marketing research to understand what is the perfect client for you so our goal is to reach them.",
      },
      step3: {
        title: "Create content",
        image: "/assets/process/marketing/record-content.webp",
        description:
          "We develop the social media content taking in count the defined goals, and target audience so everything is aligned.",
      },
      step4: {
        title: "Optimize and improve profile",
        image: "/assets/process/marketing/optimization.webp",
        description: "We optimize your profile and strategy to implement what is working better.",
      },
    },
  },
  web: {
    title: "Web Development",
    id: "web",
    description:
      "We build custom websites using modern web technologies, ensuring your brand is instantly recognizable and engaging.",
    steps: {
      step1: {
        title: "Design + Wireframe",
        image: "/assets/process/web/wireframe-preview.webp",
        description:
          "We outline all site pages and sections to get a clear idea of what the desired result is going to be.",
      },
      step2: {
        title: "Branding + Content",
        image: "/assets/process/web/wireframe-dev.webm",
        description: "We customize your website with your branding and company info.",
      },
      step3: {
        title: "Revision + Feedback",
        image: "/assets/process/web/reviews.webp",
        description: "We hear your feedback so we can quickly make necessary adjustments.",
      },
      step4: {
        title: "Launch",
        description: "After final quality checks, we connect your site to your custom domain and publish!",
      },
    },
  },
  "Coming Soon": {},
}

export default function Process() {
  const [option, setOption] = useState<"web" | "marketing">("web")

  return (
    <section className="mx-auto max-w-screen-xl px-4 pt-16 sm:pt-24 lg:px-6" id="process">
      <h2 className="mb-8 text-center text-5xl font-extrabold !leading-tight sm:text-7xl xl:mb-12">
        Our <span className="text-brand">Process</span>?
      </h2>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-5">
        {Object.keys(processInformation).map((key) => (
          <Button
            disabled={key === "Coming Soon" ? true : false}
            size="lg"
            variant={option === key ? "default" : "ghost"}
            key={key}
            onClick={() => setOption(key as "marketing" | "web")}
          >
            {key === "web" ? "Web Development" : key === "marketing" ? "Digital Marketing" : "Coming Soon"}
          </Button>
        ))}
      </div>

      <div className="grid-rows-2S mx-auto grid grid-cols-1 gap-5 max-lg:max-w-xl lg:grid-cols-2">
        <div className="grid place-items-center  rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              1
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold">{processInformation[option].steps.step1.title}</h3>
          </div>

          <div className="relative mb-4 aspect-square w-full sm:aspect-video">
            <Image
              className="rounded-2xl"
              fill
              src={processInformation[option].steps.step1.image}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          <p className="max-w-[460px] text-center">{processInformation[option].steps.step1.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              2
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold">{processInformation[option].steps.step2.title}</h3>
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
                <source src={processInformation[option].steps.step2.image} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            option === "marketing" && (
              <div className="relative mb-4 aspect-square w-full sm:aspect-video">
                <Image
                  className="rounded-2xl"
                  fill
                  src={processInformation[option].steps.step2.image}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  alt=""
                />
              </div>
            )
          )}

          <p className="max-w-[460px] text-center">{processInformation[option].steps.step2.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              3
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">
              {processInformation[option].steps.step3.title}
            </h3>
          </div>
          <div className="relative mb-4 aspect-square w-full sm:aspect-video">
            <Image
              className="rounded-2xl"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              src={processInformation[option].steps.step3.image}
              alt=""
            />
          </div>
          <p className="max-w-[460px] text-center">{processInformation[option].steps.step3.description}</p>
        </div>
        <div className="grid place-items-center rounded-2xl bg-accent px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-4 flex flex-col justify-center gap-4">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white dark:text-black">
              4
            </div>
            <h3 className="mb-4 text-center text-3xl font-extrabold md:mx-0">
              {processInformation[option].steps.step4.title}
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
            option === "marketing" && (
              <div className="relative mb-4 aspect-square w-full sm:aspect-video">
                <Image
                  className="rounded-2xl"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  src={processInformation[option].steps.step4.image}
                  alt=""
                />
              </div>
            )
          )}
          <p className="max-w-[460px] text-center">{processInformation[option].steps.step4.description}</p>
        </div>
      </div>
    </section>
  )
}

"use client"
import React, { useState } from "react"

import { type getDictionary } from "@/src/get-dictionary"

const FAQs = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["faqs"] }) => {
  return (
    <section className="relative z-20 overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <h2
                className=" mb-4 text-5xl font-extrabold sm:text-7xl dark:text-white"
                dangerouslySetInnerHTML={{ __html: dictionary.title }}
              ></h2>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            {dictionary.faqsData.slice(0, 3).map((data) => (
              <AccordionItem key={data.header} header={data.header} text={data.text} />
            ))}
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {dictionary.faqsData.slice(3).map((data) => (
              <AccordionItem key={data.header} header={data.header} text={data.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQs

const AccordionItem = ({ header, text }: { header: string; text: string }) => {
  const [active, setActive] = useState(false)

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActive(!active)
  }
  return (
    <div className="mb-8 w-full rounded-2xl bg-accent p-4 text-accent-foreground sm:p-8 lg:px-6 xl:px-8 ">
      <button className={`faq-btn flex w-full items-center text-left`} onClick={(e) => handleToggle(e)}>
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg text-primary">
          <svg
            className={`fill-primary stroke-primary duration-200 ease-in-out ${active ? "rotate-180" : ""}`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h2 className="mt-1 text-lg font-semibold">{header}</h2>
        </div>
      </button>

      <div className={`px-3 duration-200 ease-in-out  ${active ? "block" : "hidden"}`}>
        <p className="text-body-color dark:text-dark-6 py-3 text-base leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

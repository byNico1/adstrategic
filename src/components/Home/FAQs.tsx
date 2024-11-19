"use client"
import React, { useState } from "react"

const FAQs = () => {
  return (
    <section className="relative z-20 overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <h2 className=" mb-4 text-5xl font-extrabold sm:text-7xl dark:text-white">
                Answers to your <span className="text-brand">questions</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="How much does it cost to build a professional website with your agency?"
              text="Our website development packages start at just $300, making it an affordable solution for businesses of all sizes. This includes a responsive design optimized for desktop, tablet, and mobile devices. For advanced features, customization, or larger projects, we’ll provide a detailed quote tailored to your needs. Affordable website development that delivers results is our priority."
            />
            <AccordionItem
              header="Will my website be responsive and fully optimized for online visibility?"
              text="Yes, every website we create is fully responsive and designed to provide a seamless user experience across all devices. Additionally, we incorporate foundational SEO best practices to enhance your online visibility and ensure your site performs well in search engine rankings. For advanced SEO optimization, we offer additional services tailored to your goals."
            />
            <AccordionItem
              header="What is the estimated time to deliver a complete website solution?"
              text="Our turnaround time for a basic static website with a few pages is typically one week. For larger or more complex projects, we work closely with you to define a timeline that ensures quality while meeting your deadlines. Fast and efficient website delivery is one of our core strengths."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="What services are included in your website upkeep and support plans?"
              text="Our website maintenance plans include content updates, layout adjustments, performance monitoring, and security updates to keep your website running smoothly. Whether you need regular edits or occasional support, we ensure your website stays current and performs at its best. Trust us for hassle-free website management services."
            />
            <AccordionItem
              header="Do you offer tailored website designs crafted for my specific business needs?"
              text="Absolutely! We specialize in custom web design that reflects your brand identity and engages your audience. From color schemes to interactive features, every aspect of your website will be designed to meet your unique business goals. Stand out online with a website tailored specifically for you."
            />
            <AccordionItem
              header="What happens if I want to make changes to the initial website layout?"
              text="Client satisfaction is at the heart of our process. We welcome feedback and provide unlimited revisions to your website layout during the development phase. Your website will reflect exactly what you envision, ensuring you are 100% satisfied before the final launch."
            />
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

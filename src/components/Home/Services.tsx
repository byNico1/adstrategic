import dynamic from "next/dynamic"
import { Button } from "@/shadcn/button"

const CardDemo = dynamic(() => import("@/shadcn/product-card"))

const Services = () => {
  const servicesPlans = [
    {
      id: "software-pro",
      title: "Software Pro",
      subtitle: "The Perfect Plan To Start Or Grow Your Software Business",
      highlight: "TODAY.",
      list: [
        "Web Development",
        "Web Design",
        "Front-End Development",
        "Full-Stack Development",
        "Back-End Development",
      ],
    },
    {
      id: "pro-plan",
      title: "Pro Plan:",
      subtitle: "All You Need To Grow Your Business",
      highlight: "ASAP.",
      list: [
        "Web Development",
        "Video Editing",
        "Social Media Ads",
        "Social Media Management",
        "Branding Services (coming soon)",
      ],
    },
    {
      id: "video-pro",
      title: "Video Pro",
      subtitle: "The Best Plan To Skyrocket Your Video Content To The Next",
      highlight: "LEVEL.",
      list: [
        "Video Editing",
        "Simple Cut",
        "Linear Video Editing",
        "Non-linear Video Editing",
        "Assemble Video Editing",
      ],
    },
  ]

  return (
    <div className="bg-background px-2 pt-16 sm:px-6 sm:pt-24" id="services">
      <h2 className="mb-14 text-center text-3xl font-semibold">Services:</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(300px,_1fr))] justify-center gap-12">
        {servicesPlans.map((services) => (
          <CardDemo
            className={services.title.includes("Plan") ? "bg-gray-200 dark:bg-[rgba(20,20,20,0.7)]" : ""}
            key={services.id}
            title={services.title}
            description={services.subtitle}
            highlight={services.highlight}
          >
            <div className="relative z-20 mt-4 text-cyan-800 dark:text-muted-foreground">
              <Button className="mb-4 w-full">
                <a href="#contact">Get More Info</a>
              </Button>
              <ul className="mt-2 list-none">
                {services.list.map((product) => (
                  <Step title={product} key={`single-product-${product}`} />
                ))}
              </ul>
            </div>
          </CardDemo>
        ))}
      </div>
    </div>
  )
}

export default Services

const Step = ({ title }: { title: string }) => {
  return (
    <li className="mb-2 flex items-start gap-2">
      <CheckIcon />
      <p className="">{title}</p>
    </li>
  )
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mt-1 h-4 w-4 shrink-0 text-blue-500"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  )
}

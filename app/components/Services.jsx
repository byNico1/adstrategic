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
    <div className="bg-blue-50 px-6 py-16 sm:py-24">
      <h2 id="services" className="mb-14 text-center text-3xl font-semibold">
        Services:
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(300px,_1fr))] justify-center gap-12 ">
        {servicesPlans.map((services) => (
          <div
            key={`${services.id}`}
            className="flex flex-col items-start justify-between rounded-3xl border border-slate-400 bg-white px-8 py-10 transition-transform even:border-purple-900 hover:scale-105 hover:border-purple-900 even:hover:scale-110 xl:even:scale-110"
          >
            <div className="flex flex-col">
              <h3 className="mb-5 text-lg font-bold">{services.title}</h3>
              <p className="mb-5 text-gray-500">
                {services.subtitle} <span className="font-semibold text-black">{services.highlight}</span>
              </p>
            </div>
            <ul className="mb-10 text-gray-500">
              {services.list.map((service, i) => (
                <li key={`${i}-${services.title}-${services.id}`} className="flex items-center justify-start gap-4">
                  <img src="/assets/icons/check-svgrepo-com.svg" alt="" width={30} height={30} />
                  <span className="font-semibold">{service}</span>
                </li>
              ))}
            </ul>
            <button className="cursor-pointer rounded-lg border border-purple-900 bg-green-100 px-8 py-4 transition-all hover:bg-green-300">
              <a href="#contact">Learn More</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

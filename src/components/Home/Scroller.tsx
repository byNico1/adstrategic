import { LP_GRID_ITEMS } from "@/utils/lp-items"

const Scroller = () => {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <div className="flex animate-infinite-scroll items-center justify-center md:justify-start ">
        {LP_GRID_ITEMS.map((singleItem) => (
          <div
            key={singleItem.title}
            className="mx-8 flex flex-col items-center justify-center text-center md:mx-12 xl:mx-16"
          >
            <div className="dark:bg-primary-900 mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full text-blue-700 ">
              {singleItem.icon}
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
          </div>
        ))}
      </div>
      <div className="flex animate-infinite-scroll items-center justify-center md:justify-start " aria-hidden="true">
        {LP_GRID_ITEMS.map((singleItem) => (
          <div
            key={singleItem.title}
            className="mx-8 flex flex-col items-center justify-center text-center md:mx-12 xl:mx-16"
          >
            <div className="dark:bg-primary-900 mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full text-blue-700 ">
              {singleItem.icon}
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Scroller

import { type getDictionary } from "@/src/get-dictionary"
import dynamic from "next/dynamic"

const RestaurantServiceCard = dynamic(() => import("@/src/components/ui/restaurant-service-card"))

const RestaurantServices = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>["restaurantServices"] }) => {
  return (
    <div className="bg-background px-2 pt-20 pb-16 sm:px-6 sm:pt-32 sm:pb-24" id="restaurant-services">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gray-900 dark:text-white mb-6">
          {dictionary.title}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dictionary.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(320px,_1fr))] justify-center gap-8 px-4 lg:px-8">
        {dictionary.cards.map((card) => (
          <RestaurantServiceCard
            key={card.id}
            id={card.id}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            price={card.price}
            billing={card.billing}
            features={card.features}
            limitations={card.limitations}
            examples={card.examples}
            cta={card.cta}
            route={card.route}
            highlight={card.highlight}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantServices

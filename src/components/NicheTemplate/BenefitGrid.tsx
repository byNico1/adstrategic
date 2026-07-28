import { Check } from "lucide-react"

type BenefitCard = {
  title: string
  body: string
}

type BenefitGridProps = {
  id?: string
  heading: string
  intro: string
  cards: BenefitCard[]
}

export function BenefitGrid({ id, heading, intro, cards }: BenefitGridProps) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{heading}</h2>
        <p className="mb-10 text-base leading-relaxed text-muted-foreground sm:mb-14 sm:text-lg">{intro}</p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.title}
            className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/40 px-6 py-8 text-center backdrop-blur"
          >
            <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{card.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

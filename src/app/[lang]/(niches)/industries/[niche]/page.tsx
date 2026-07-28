import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BenefitGrid, CtaBanner, NicheHero, NicheTestimonials, SplitFeature } from "@/components/NicheTemplate"
import { getAllNicheSlugs, getNicheConfig } from "@/src/config/niches"
import { getNicheDictionary } from "@/src/get-niche-dictionary"
import { type Locale } from "@/src/i18n-config"

type PageProps = {
  params: { lang: Locale; niche: string }
}

export function generateStaticParams() {
  return getAllNicheSlugs().map((niche) => ({ niche }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getNicheConfig(params.niche)
  if (!config) return {}

  const dictionary = await getNicheDictionary(params.niche, params.lang)
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function NichePage({ params }: PageProps) {
  const config = getNicheConfig(params.niche)
  if (!config) {
    notFound()
  }

  const dictionary = await getNicheDictionary(params.niche, params.lang)

  return (
    <div className="container">
      <NicheHero config={config} dictionary={dictionary.hero} />

      <SplitFeature
        id="split-intro"
        heading={dictionary.splitIntro.heading}
        body={dictionary.splitIntro.body}
        bullets={dictionary.splitIntro.bullets}
        ctaLabel={dictionary.splitIntro.cta}
        ctaHref={config.ctaUrl}
        imageSrc={config.splitIntroImage}
        imageAlt={config.splitIntroImageAlt}
        imageOverlay={dictionary.splitIntro.imageOverlay}
        imagePosition="left"
      />

      <BenefitGrid
        id="why"
        heading={dictionary.whySection.heading}
        intro={dictionary.whySection.intro}
        cards={dictionary.whySection.cards}
      />

      <SplitFeature
        id="explainer"
        heading={dictionary.explainer.heading}
        body={dictionary.explainer.body}
        bullets={dictionary.explainer.bullets}
        ctaLabel={dictionary.explainer.cta}
        ctaHref={config.ctaUrl}
        imageSrc={config.explainerImage}
        imageAlt={config.explainerImageAlt}
        imagePosition="right"
      />

      <BenefitGrid
        id="key-factors"
        heading={dictionary.keyFactors.heading}
        intro={dictionary.keyFactors.intro}
        cards={dictionary.keyFactors.cards}
      />

      <NicheTestimonials config={config} dictionary={dictionary.testimonials} />

      <CtaBanner dictionary={dictionary.ctaBanner} ctaHref={config.ctaUrl} />

      <SplitFeature
        id="contact-section"
        heading={dictionary.contactSection.heading}
        paragraphs={dictionary.contactSection.paragraphs}
        ctaLabel={dictionary.contactSection.cta}
        ctaHref={config.ctaUrl}
        imageSrc={config.contactImage}
        imageAlt={config.contactImageAlt}
        imagePosition="left"
      />
    </div>
  )
}

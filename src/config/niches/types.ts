export type TrustBadge = {
  src: string
  alt: string
  width: number
  height: number
}

export type StatCard = {
  value: string
  /** Key into dictionary.hero.stats[i].label */
  labelIndex: number
}

export type NavLink = {
  /** Key into dictionary.nav.links[i].label — resolved at render via index */
  labelKey: string
  href: string
}

export type ServiceDropdownItem = {
  labelKey: string
  href: string
}

export type FooterLink = {
  labelKey: string
  href: string
}

export type ReviewConfig = {
  name: string
  rating: number
  role: string
  /** Index into dictionary.testimonials.reviews[i].text */
  textIndex: number
}

export type SocialLinks = {
  facebook?: string
  instagram?: string
  linkedin?: string
}

export type NicheConfig = {
  slug: string
  industryName: string
  /** Short tagline shown on the /industries listing card */
  cardTagline: string
  /** One-sentence description for the listing card */
  cardDescription: string
  /** CSS class from niche-themes.css, e.g. "theme-electrician" */
  themeClass: string
  logoSrc: string
  logoAlt: string
  heroImageSrc: string
  heroImageAlt: string
  phoneNumber: string
  phoneDisplay: string
  ctaUrl: string
  bookCallUrl: string
  trustBadges: TrustBadge[]
  statCards: StatCard[]
  navLinks: NavLink[]
  servicesDropdown: ServiceDropdownItem[]
  footerLinks: FooterLink[]
  socialLinks: SocialLinks
  splitIntroImage: string
  splitIntroImageAlt: string
  explainerImage: string
  explainerImageAlt: string
  contactImage: string
  contactImageAlt: string
  reviews: ReviewConfig[]
}

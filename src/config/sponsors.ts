export interface Sponsor {
  id: string
  name: string
  image: string
  alt: string
  website?: string
  description?: string
}

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Sponsor L1",
    image: "/assets/sponsors/L1.png",
    alt: "Logo de Sponsor L1",
    description: "Empresa líder en innovación tecnológica",
  },
  {
    id: "2",
    name: "Sponsor L2",
    image: "/assets/sponsors/L2.png",
    alt: "Logo de Sponsor L2",
    description: "Especialistas en soluciones digitales",
  },
  {
    id: "3",
    name: "Sponsor L3",
    image: "/assets/sponsors/L3.png",
    alt: "Logo de Sponsor L3",
    description: "Consultores estratégicos de alto nivel",
  },
  {
    id: "4",
    name: "Sponsor L4",
    image: "/assets/sponsors/L4.png",
    alt: "Logo de Sponsor L4",
    description: "Expertos en transformación empresarial",
  },
  {
    id: "5",
    name: "Sponsor L5",
    image: "/assets/sponsors/L5.png",
    alt: "Logo de Sponsor L5",
    description: "Innovadores en marketing digital",
  },
  {
    id: "6",
    name: "Sponsor L6",
    image: "/assets/sponsors/L6.png",
    alt: "Logo de Sponsor L6",
    description: "Líderes en estrategia de crecimiento",
  },
]

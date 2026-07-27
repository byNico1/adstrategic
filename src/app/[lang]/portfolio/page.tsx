import { Metadata } from "next"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import Container from "@/src/components/Container"
import { portfolioProducts, portfolioClients } from "@/src/config/portfolio"
import PortfolioCard from "./PortfolioCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  
  const title = lang === "es" ? "Nuestro Portafolio | ADDSTRATEGIC" : "Our Portfolio | ADDSTRATEGIC"
  const description = lang === "es" 
    ? "Explora los productos y proyectos que hemos construido en ADDSTRATEGIC. Software a medida, sitios web y plataformas."
    : "Explore the products and projects we have built at ADDSTRATEGIC. Custom software, websites, and platforms."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  }
}

export default async function PortfolioPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  const title = lang === "es" ? "Nuestro Portafolio" : "Our Portfolio"
  const subtitle = lang === "es" 
    ? "Explora el ecosistema de productos y los clientes que confían en nuestras soluciones tecnológicas."
    : "Explore our product ecosystem and the clients who trust our technology solutions."
  
  const productsTitle = lang === "es" ? "Productos AddStrategic" : "AddStrategic Products"
  const clientsTitle = lang === "es" ? "Proyectos y Clientes" : "Projects & Clients"

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* AddStrategic Products Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{productsTitle}</h2>
            <div className="h-[2px] bg-brand flex-grow opacity-50 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProducts.map((item, index) => (
              <PortfolioCard key={item.name} item={item} lang={lang} index={index} />
            ))}
          </div>
        </section>

        {/* Clients Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{clientsTitle}</h2>
            <div className="h-[2px] bg-brand flex-grow opacity-50 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioClients.map((item, index) => (
              <PortfolioCard key={item.name} item={item} lang={lang} index={index} />
            ))}
          </div>
        </section>
      </Container>
      
      {/* Floating CTA Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[199]">
        <Link href={`/${lang}/#contact`}>
          <Button size="lg" className="text-lg px-8 py-6 shadow-xl transition-transform hover:scale-105 active:scale-95">
            {lang === "es" ? "Comienza Ahora" : "Get Started"}
          </Button>
        </Link>
      </div>
    </main>
  )
}

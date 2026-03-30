import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Locale } from "@/src/i18n-config"

interface BreadcrumbsProps {
  lang: Locale
  items: { label: string; href?: string }[]
}

export default function Breadcrumbs({ lang, items }: BreadcrumbsProps) {
  return (
    <nav className="flex pb-8 text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap">
      <Link href={`/${lang}`} className="flex items-center hover:text-brand transition-colors">
        <Home className="w-4 h-4 mr-2" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4 mx-3 shrink-0" />
      <Link href={`/${lang}/tools`} className="hover:text-brand transition-colors">
        Tools
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-3 shrink-0" />
          {item.href ? (
            <Link href={`/${lang}${item.href}`} className="hover:text-brand transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

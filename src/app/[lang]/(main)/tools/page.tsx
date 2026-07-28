import { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/src/get-dictionary"
import { Locale } from "@/src/i18n-config"
import { 
  FileText, 
  FileArchive, 
  FilePlus, 
  Scissors, 
  Monitor, 
  Code2, 
  Palette, 
  Image as ImageIcon, 
  Tag, 
  Search 
} from "lucide-react"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {
    title: `${dictionary.toolsHub.title} | ADDSTRATEGIC`,
    description: dictionary.toolsHub.subtitle,
    alternates: {
      canonical: `https://www.addstrategic.com/${lang}/tools`,
    },
  }
}

const toolsData = [
  {
    id: "pdf-compress",
    icon: FileText,
    nameKey: "pdfCompressor",
    path: "/tools/pdf-compress",
  },
  {
    id: "pdf-to-word",
    icon: FileArchive,
    nameKey: "pdfToWord",
    path: "/tools/pdf-to-word",
  },
  {
    id: "pdf-merge",
    icon: FilePlus,
    nameKey: "pdfMerge",
    path: "/tools/pdf-merge",
  },
  {
    id: "pdf-split",
    icon: Scissors,
    nameKey: "pdfSplit",
    path: "/tools/pdf-split",
  },
  {
    id: "website-cost-calculator",
    icon: Monitor,
    nameKey: "websiteCalculator",
    path: "/tools/website-cost-calculator",
  },
  {
    id: "software-cost-estimator",
    icon: Code2,
    nameKey: "softwareEstimator",
    path: "/tools/software-cost-estimator",
  },
  {
    id: "color-palette-generator",
    icon: Palette,
    nameKey: "colorPalette",
    path: "/tools/color-palette-generator",
  },
  {
    id: "image-resizer",
    icon: ImageIcon,
    nameKey: "imageResizer",
    path: "/tools/image-resizer",
  },
  {
    id: "meta-tags-generator",
    icon: Tag,
    nameKey: "metaTags",
    path: "/tools/meta-tags-generator",
  },
  {
    id: "website-audit",
    icon: Search,
    nameKey: "websiteAudit",
    path: "/tools/website-audit",
  },
]

export default async function ToolsHubPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  const { toolsHub, tools: toolsContent } = dictionary

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-brand/10 text-brand rounded-full">
          {toolsHub.eyebrow}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          {toolsHub.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {toolsHub.subtitle}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {toolsData.map((tool) => {
            const Icon = tool.icon
            const content = toolsContent[tool.nameKey as keyof typeof toolsContent] as any
            
            return (
              <Link
                key={tool.id}
                href={`/${lang}${tool.path}`}
                className="group relative flex flex-col p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand/20"
              >
                <div className="mb-5 p-3 rounded-lg bg-brand/10 w-fit group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-7 h-7 text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand transition-colors">
                  {content.title.split(' — ')[0]}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {content.subtitle}
                </p>
                <div className="mt-auto pt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                  Open tool <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-32">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/5 to-transparent text-center">
          <h2 className="text-3xl font-bold mb-4 text-white uppercase italic tracking-wider">
            {toolsHub.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {toolsHub.cta.description}
          </p>
          <Link
            href={`/${lang}#contact`}
            className="inline-block px-10 py-5 bg-brand hover:bg-brand/90 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand/20"
          >
            {toolsHub.cta.button}
          </Link>
        </div>
      </div>
    </div>
  )
}

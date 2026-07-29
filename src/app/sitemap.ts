import { MetadataRoute } from "next"
import { getAllNicheSlugs } from "@/src/config/niches"
import { getListOfPosts } from "@/src/lib/posts"
import { Post } from "@/types/posts"

const MAX_POSTS = 1000

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/portfolio`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/how-we-work`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/industries`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/tools`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/tools/website-audit`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/website-cost-calculator`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/software-cost-estimator`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/meta-tags-generator`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/color-palette-generator`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/image-resizer`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/pdf-compress`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/pdf-merge`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/pdf-split`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/pdf-to-word`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publication = await getListOfPosts({ endData: null })

  const posts: Array<Post> = publication.posts.edges.map(({ node }) => node)

  const initialPageInfo = publication.posts.pageInfo
  const fetchPosts = async (after: string | null) => {
    const publication = await getListOfPosts({ endData: after })
    const pageInfo = publication.posts.pageInfo

    posts.push(...publication.posts.edges.map((edge) => edge.node))

    if (pageInfo.hasNextPage && posts.length < MAX_POSTS) {
      await fetchPosts(pageInfo.endCursor)
    }
  }

  if (initialPageInfo.hasNextPage) {
    await fetchPosts(initialPageInfo.endCursor)
  }

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, publishedAt }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(Date.parse(publishedAt)),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const nicheEntries: MetadataRoute.Sitemap = getAllNicheSlugs().map((niche) => ({
    url: `${BASE_URL}/industries/${niche}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...nicheEntries, ...postEntries]
}

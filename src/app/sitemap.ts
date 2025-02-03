import { MetadataRoute } from "next"
import { getListOfPosts } from "@/src/lib/posts"
import { Post } from "@/types/posts"

const MAX_POSTS = 1000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publication = await getListOfPosts({ endData: null })

  const posts: Array<Post> = publication.posts.edges.map(({ node }) => node)

  const initialPageInfo = publication.posts.pageInfo
  const fetchPosts = async (after: string | null) => {
    const publication = await getListOfPosts({ endData: after })

    if (!publication) {
      return
    }
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
    lastModified: new Date(Date.parse(publishedAt)),
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    ...postEntries,
  ]
}

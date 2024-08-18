import { MetadataRoute } from "next"
import { query } from "@/utils/hashnode"
import { Post, QueryPostsList } from "types/posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: { publication },
  } = (await query({
    query: `
    query($host: String!) {
      publication(host: $host) {
        id
        posts(first: 10) {
          edges {
            node {
              slug
              publishedAt
            }
          }
        }
      }
    }
  `,
    variables: {
      host: "adstrategic.hashnode.dev",
    },
  })) as QueryPostsList

  const posts: Array<Post> = publication.posts.edges.map(({ node }) => node)
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

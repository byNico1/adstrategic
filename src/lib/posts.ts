import { Post, PublicationPosts, QueryPostResult, QueryPostsList } from "@/types/posts"
import { query } from "./hashnode"

const HASHNODE_HOST = "adstrategic.hashnode.dev"

export const emptyPublication: PublicationPosts = {
  posts: {
    edges: [],
    pageInfo: {
      endCursor: "",
      hasNextPage: false,
    },
  },
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = (await query({
    query: `
    query($host: String!, $slug: String!) {
      publication(host: $host) {
        id
        post(slug: $slug) {
          features {
            tableOfContents {
              isEnabled
              items {
                id
                level
                parentId
                slug
                title
              }
            }
          }
          seo {
            title
            description
          }
          ogMetaData {
            image
          }
          readTimeInMinutes
          author {
            name
            profilePicture
            socialMediaLinks {
              twitter
            }
          }
          content {
            html
          }
          coverImage {
            url
          }
          id
          publishedAt
          title
        }
      }
    }
  `,
    variables: {
      host: HASHNODE_HOST,
      slug: slug,
    },
  })) as QueryPostResult | null

  return result?.data?.publication?.post ?? null
}

export async function getListOfPosts({ endData }: { endData: string | null }): Promise<PublicationPosts> {
  const result = (await query({
    query: `
    query ($host: String!, $endData: String) {
      publication(host: $host) {
        id
        posts(first: 10, after: $endData) {
        edges {
          node {
            seo {
              title
              description
            }
            coverImage {
              url
            }
            id
            publishedAt
            slug
            title
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  `,
    variables: {
      host: HASHNODE_HOST,
      endData,
    },
  })) as QueryPostsList | null

  return result?.data?.publication ?? emptyPublication
}

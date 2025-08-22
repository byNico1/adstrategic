import { Post, QueryPostResult, QueryPostsList } from "@/types/posts"
import { query } from "./hashnode"

export async function getPostBySlug(slug: string) {
  const {
    data: { publication },
  } = (await query({
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
      host: "adstrategic.hashnode.dev",
      slug: slug,
    },
  })) as QueryPostResult
  return publication?.post as Post
}

export async function getListOfPosts({ endData }: { endData: string | null }) {
  const {
    data: { publication },
  } = (await query({
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
      host: "adstrategic.hashnode.dev",
      endData,
    },
  })) as QueryPostsList

  return publication
}

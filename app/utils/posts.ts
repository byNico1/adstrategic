import { Post, QueryPostResult } from "@/types/posts"
import { query } from "./hashnode"

export async function getPostBySlug(slug: string) {
  const {
    data: { publication },
  } = (await query({
    query: `
    query($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
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

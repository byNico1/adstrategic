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

export async function getListOfPosts() {
  const {
    data: { publication },
  } = (await query({
    query: `
    query ($host: String!) {
      publication(host: $host) {
        id
        posts(first: 10) {
         edges {
            node {
              coverImage {
                url
              }
              id
              publishedAt
              slug
              title
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

  return publication
}

export interface Post {
  seo: {
    title: string
    description: string
  }
  ogMetaData: {
    image: string
  }
  author: {
    name: string
    profilePicture: string
    socialMediaLinks?: {
      twitter: string
    }
  }
  readTimeInMinutes: string
  content: {
    html: string
  }
  id: string
  coverImage: {
    url: string
  }
  publishedAt: string
  slug: string
  title: string
}

export interface QueryPostResult {
  data: {
    publication: {
      post: Post
    }
  }
}

export interface QueryPostsList {
  data: {
    publication: {
      posts: {
        edges: Array<{
          node: Post
        }>
        pageInfo: {
          endCursor: string
          hasNextPage: boolean
        }
      }
    }
  }
}

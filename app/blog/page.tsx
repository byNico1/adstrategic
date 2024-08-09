import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/Container/Container"
import type { Post, QueryPostsList } from "@/types/posts"
import { query } from "@/utils/hashnode"

// fix: cover image and change seo title

export const metadata: Metadata = {
  title: "Adstrategic - Blog",
  description:
    "Latest blog posts on business growth, software development, video editing, strategic planning, and digital marketing.",
  openGraph: {
    images: [
      {
        url: "/blog/cover-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default async function Blog() {
  const {
    data: { publication },
  } = (await query({
    query: `
    query($host: String!) {
      publication(host: $host) {
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

  const posts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node)

  return (
    <>
      <section className="mt-24">
        <h1 className="mb-8 text-center text-2xl font-medium uppercase">Adstrategic - Blog</h1>
        <Container>
          <ul className="grid grid-cols-1 gap-0 overflow-hidden rounded-md border border-black/10 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => {
              return (
                <li
                  key={post.id}
                  className="border-b border-black/10 p-6 [&:not(:nth-child(3n+3))]:border-r [&:nth-last-child(-n+3)]:border-b-0"
                >
                  <Link href={`/blog/${post.slug}`} className="mb-16 grid grid-cols-1 gap-8">
                    <Image
                      width="600"
                      height="400"
                      className="rounded border border-zinc-200"
                      src={post.coverImage.url}
                      alt=""
                    />
                    <div>
                      <h2 className="mb-5 overflow-hidden text-ellipsis border-b-2 pb-5 text-2xl font-bold uppercase leading-tight tracking-wide">
                        {post.title}
                      </h2>
                      <p className="text-zinc-500">
                        {new Date(post.publishedAt).toLocaleDateString("en-us", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </>
  )
}

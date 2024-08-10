import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/Container/Container"
import Reveal from "@/components/Reveal"
import type { Post, QueryPostsList } from "@/types/posts"
import { query } from "@/utils/hashnode"

// fix image metadata

export const metadata: Metadata = {
  title: "The Adstrategic Blog | Improve your Marketing and Software skills",
  description:
    "Learn and expand your Digital Marketing and Software Development knowledge with detailed tutoriales and examples.",
  // openGraph: {
  //   images: [
  //     {
  //       url: "/blog/cover-image.jpg",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  // },
}

export default async function Blog() {
  const {
    data: { publication },
  } = (await query({
    query: `
    query ($host: String!) {
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
        <div className="relative mb-10 overflow-hidden border-b border-dashed border-black/10 bg-white py-20 text-center">
          <Container className="relative z-20">
            <Reveal center>
              <h1 className="mb-4 font-roboto text-4xl font-medium">The Adstrategic Blog</h1>
            </Reveal>
            <p className="">
              Learn and expand your Digital Marketing and Software Development knowledge with detailed tutoriales and
              examples.
            </p>
          </Container>
          <div className="absolute bottom-[-100px] right-[calc(50%-150px)] z-0 blur-lg grayscale">
            <img src="/adstrategic-180.png" width={300} height={300} alt="" />
          </div>
        </div>

        <Container>
          <ul className="grid grid-cols-1 gap-0 overflow-hidden rounded-md border border-black/10 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => {
              return (
                <li
                  key={post.id}
                  className="cursor-pointer border-b border-black/10 p-6 hover:bg-black/10 [&:not(:nth-child(3n+3))]:border-r [&:nth-last-child(-n+3)]:border-b-0"
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
                      <h2 className="mb-5 overflow-hidden text-ellipsis border-b-2 border-gray-400 pb-5 text-2xl font-bold uppercase leading-tight tracking-wide">
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

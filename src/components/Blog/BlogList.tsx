import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcn/card"
import { getListOfPosts } from "@/src/lib/posts"
import { Post } from "@/types/posts"

import BlogList from "./MorePosts"

export function RenderPosts({ posts }: { posts: Array<Post> }) {
  return (
    <ul className="mx-auto mt-16 grid max-w-[26rem] grid-cols-1 gap-6 px-4 sm:max-w-[52.5rem] sm:grid-cols-2 sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-y-8 lg:px-8 xl:gap-x-8">
      {posts.map((post) => {
        return (
          <li key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="">
              <Card className="h-full hover:bg-accent">
                <CardHeader>
                  <Image
                    width="640"
                    height="427"
                    loading="eager"
                    className="rounded-lg border border-zinc-200 shadow-lg"
                    src={post.coverImage.url}
                    quality={50}
                    priority
                    alt=""
                  />
                </CardHeader>
                <CardContent>
                  <h2 className="mb-5 overflow-hidden text-ellipsis border-b-2 border-gray-400 pb-5 text-2xl font-bold uppercase leading-tight tracking-wide">
                    {post.title}
                  </h2>
                </CardContent>
                <CardFooter>
                  <p className="text-muted-foreground group-hover:text-primary">
                    {new Date(post.publishedAt).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default async function FirstRenderBlogs() {
  const publication = await getListOfPosts({ endData: null })

  const initialPosts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node)
  const endData = publication.posts.pageInfo.endCursor
  const hasNextPage = publication.posts.pageInfo.hasNextPage

  return <BlogList initialPosts={initialPosts} initialEndData={endData} initialHasNextPage={hasNextPage} />
}

export async function LastThreePosts() {
  const publication = await getListOfPosts({ endData: null })

  const posts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node)

  return <RenderPosts posts={posts.slice(0, 3)} />
}

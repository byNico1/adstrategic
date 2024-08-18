import Image from "next/image"
import Link from "next/link"
import { getListOfPosts } from "@/utils/posts"
import { Post } from "types/posts"

function RenderPosts({ posts }: { posts: Array<Post> }) {
  return (
    <ul className="mx-auto mt-16 grid max-w-[26rem] grid-cols-1 gap-6 px-4 sm:max-w-[52.5rem] sm:grid-cols-2 sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-y-8 lg:px-8 xl:gap-x-8">
      {posts.map((post) => {
        return (
          <>
            <li
              key={post.id}
              className="dark:highlight-white/5 group group relative cursor-pointer rounded-3xl bg-slate-50 p-6 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700/50"
            >
              <Link href={`/blog/${post.slug}`} className="mb-16 grid grid-cols-1 gap-8">
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
                <div>
                  <h2 className="mb-5 overflow-hidden text-ellipsis border-b-2 border-gray-400 pb-5 text-2xl font-bold uppercase leading-tight tracking-wide">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 group-hover:text-blue-400">
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
          </>
        )
      })}
    </ul>
  )
}

export default async function BlogList() {
  const publication = await getListOfPosts()

  const posts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node)

  return <RenderPosts posts={posts} />
}

export async function LastThreePosts() {
  const publication = await getListOfPosts()

  const posts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node)

  return <RenderPosts posts={posts.slice(0, 3)} />
}

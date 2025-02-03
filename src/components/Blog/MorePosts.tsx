"use client"

import { useState } from "react"
import { Button } from "@/shadcn/button"
import { getListOfPosts } from "@/src/lib/posts"
import { Post } from "@/types/posts"

import { RenderPosts } from "./BlogList"

export default function BlogList({
  initialPosts,
  initialEndData,
  initialHasNextPage,
}: {
  initialPosts: Array<Post>
  initialEndData: string
  initialHasNextPage: boolean
}) {
  const [posts, setPosts] = useState(initialPosts)
  const [cursor, setCursor] = useState(initialEndData)
  const [hasMore, setHasMore] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  // Handle fetching more posts on button click
  const fetchMorePosts = async () => {
    if (!hasMore || loading) return

    setLoading(true)

    const newPublication = await getListOfPosts({ endData: cursor })

    const newPosts = newPublication.posts.edges.map(({ node }: { node: Post }) => node)
    setPosts((prevPosts) => [...prevPosts, ...newPosts])
    setCursor(newPublication.posts.pageInfo.endCursor)
    setHasMore(newPublication.posts.pageInfo.hasNextPage)
    setLoading(false)
  }

  return (
    <div>
      <RenderPosts posts={posts} />
      {hasMore && (
        <Button onClick={fetchMorePosts} disabled={loading} size="lg" className="mx-auto mt-8 block">
          {loading ? "Loading..." : "Load More Posts"}
        </Button>
      )}
    </div>
  )
}

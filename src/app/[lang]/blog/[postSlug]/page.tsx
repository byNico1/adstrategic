import { Metadata } from "next"

import { notFound } from "next/navigation"
import BlogContainer from "@/components/Blog/BlogContainer"
import MarkdownToHtml from "@/components/MarkdownToHtml"
import { getPostBySlug } from "@/src/lib/posts"

type PostParams = Promise<{
  postSlug: string
}>

export async function generateMetadata(props: { params: PostParams }): Promise<Metadata> {
  const params = await props.params
  const postSlug = params.postSlug
  const post = await getPostBySlug(postSlug)

  if (!post) {
    notFound()
  }

  return {
    title: post?.title,
    description: post?.seo?.description,
    openGraph: {
      images: [
        {
          url: post?.ogMetaData?.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function PostPage(props: { params: PostParams }) {
  const params = await props.params
  const postSlug = params.postSlug
  const post = await getPostBySlug(postSlug)

  if (!post) {
    notFound()
  }

  return (
    <div className="">
      <BlogContainer post={post}>
        <MarkdownToHtml post={post} />
      </BlogContainer>
    </div>
  )
}

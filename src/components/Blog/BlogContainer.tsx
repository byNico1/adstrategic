"use client"

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { Post } from "@/types/posts"
import { PostTOC } from "../post-toc"

const BlogContainer = ({ post, children }: { post: Post; children: React.ReactNode }) => {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight)
    }
  }, [])

  return (
    <div className="mx-auto grid grid-cols-8 grid-rows-1 pb-8 lg:max-w-6xl lg:grid-cols-10 lg:gap-12 2xl:max-w-7xl">
      <div className="z-20 col-span-8 row-start-1 px-4 md:z-10 lg:col-span-10 lg:col-start-1 lg:px-0 2xl:col-span-6 2xl:col-start-4">
        <article className="mx-auto w-full max-w-xl md:max-w-2xl lg:max-2xl:mb-24 xl:order-1">
          <div ref={ref} className="pt-[70px] sm:pt-[80px]">
            <div className="mb-12 aspect-video overflow-hidden rounded xl:order-2">
              <Image
                width="1080"
                height="720"
                priority
                className="mb-6 h-auto w-full object-contain xl:mb-12"
                src={post.coverImage.url}
                alt="cover"
              />
            </div>
            <h1 className="font-roboto mb-8 text-3xl font-normal uppercase leading-none sm:text-5xl">{post.title}</h1>
            <div className="mb-8 flex w-full flex-row flex-wrap items-center justify-start gap-2">
              <div className="flex items-center gap-2">
                <Image
                  width="48"
                  height="48"
                  className="h-auto w-12 rounded-full"
                  src={post.author.profilePicture}
                  alt=""
                />
                <p className="mb-[.1rem] text-lg font-bold">{post.author.name}</p>
              </div>
              <span className="block font-bold">·</span>
              <time dateTime={`${new Date(post.publishedAt)}`}>
                {new Date(post.publishedAt).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span className="block font-bold">·</span>
              <p className="hover:underline">{post.readTimeInMinutes} min read</p>
            </div>
            <p className="mb-6 italic text-muted-foreground">
              Published on
              {` `}
              {new Date(post.publishedAt).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {children}
        </article>
      </div>

      <PostTOC post={post} marginTop={height} />
    </div>
  )
}

export default BlogContainer

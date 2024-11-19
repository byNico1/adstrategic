import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { notFound } from "next/navigation"
import Reveal from "@/components/Animations/Reveal"
import Container from "@/components/Container"
import Form from "@/components/Form/Form"
import { FacebookIcon, IGIcon } from "@/components/Icons/Icons"
import MarkdownToHtml from "@/components/MarkdownToHtml"
import { getPostBySlug } from "@/utils/posts"

interface PostParams {
  params: {
    postSlug: string
  }
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.postSlug)

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

export default async function PostPage({ params }: PostParams) {
  const post = await getPostBySlug(params.postSlug)

  if (!post) {
    notFound()
  }

  return (
    <div className="">
      <div className="sticky top-20 z-10 h-16 border-t border-dashed border-black/20 bg-blured backdrop-blur dark:border-white/20">
        <Container>
          <div className="flex h-16 flex-wrap items-center justify-between py-4">
            <Link
              href={"/blog"}
              className="flex items-center justify-center gap-3 py-1 text-sm font-medium leading-5 hover:border-b-2 hover:border-b-brand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to blog
            </Link>
            <div className="flex justify-center space-x-6 py-1">
              <a
                href="https://www.facebook.com/profile.php?id=61555157255389"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/adstrategic.agency/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <IGIcon />
              </a>
            </div>
          </div>
        </Container>
      </div>

      <div className="mt-28">
        <Container>
          <div className="-mx-4 md:flex md:flex-row md:flex-wrap md:justify-between">
            <div className="mx-auto w-full flex-1 px-4 sm:max-w-[80%]">
              <div className="sticky rounded-md border border-border md:top-40 md:max-h-[calc(100vh-250px)] md:overflow-y-scroll lg:top-44">
                <div className="mx-auto px-5 pb-0 pt-8 text-center">
                  <h2 className="mb-2 max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide lg:text-3xl">
                    Get 10 New Top-Tier Leads
                  </h2>
                  <Reveal center>
                    <p className="max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-[#4b9594] lg:text-4xl">
                      Within 30 days
                    </p>
                  </Reveal>
                  <Form />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 flex-1 px-4 sm:max-w-[80%] md:mt-0 md:max-w-[58%] md:flex-[0_0_58%]">
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
              <article className="mx-auto w-full xl:order-1">
                <h1 className="font-roboto mb-8 text-3xl font-normal uppercase leading-none sm:text-5xl">
                  {post.title}
                </h1>
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

                <MarkdownToHtml post={post} />
              </article>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

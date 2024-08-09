import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Container from "@/components/Container/Container"
import { BlogForm } from "@/components/Form"
import MarkdownToHtml from "@/components/MarkdownToHtml"
import Reveal from "@/components/Reveal"
import { FacebookIcon, IGIcon } from "@/components/UI/Icons"
import type { Post, QueryPostResult } from "@/types/posts"
import { query } from "@/utils/hashnode"

interface PostParams {
  params: {
    postSlug: string
  }
}

async function fetchPost({ params }: PostParams) {
  const {
    data: { publication },
  } = (await query({
    query: `
    query($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          seo {
            title
            description
          }
          ogMetaData {
        image
      }
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
      slug: params.postSlug,
    },
  })) as QueryPostResult
  return publication?.post as Post
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const post = await fetchPost({ params })
  return {
    title: post.title,
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
  const post = await fetchPost({ params })

  return (
    <div className="">
      <div className="sticky top-20 z-10 h-16 border-t border-dashed border-black/20 bg-[#ffffffe6] backdrop-blur">
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
            {/* fix width: */}
            <div className="mx-auto w-full flex-1 px-4 sm:max-w-[80%]">
              <div className="sticky md:top-40 lg:top-44">
                <div className="mx-auto rounded-md border border-black/10 p-5 text-center">
                  <h2 className="mb-2 max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-black md:text-3xl">
                    Get 10 New Top-Tier Leads
                  </h2>
                  <Reveal center>
                    <p className="max-w-2xl text-2xl font-extrabold !leading-tight tracking-wide text-brand md:text-3xl xl:text-4xl">
                      Within 30 days
                    </p>
                  </Reveal>
                  <BlogForm />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 flex-1 px-4 sm:max-w-[80%] md:mt-0 md:max-w-[58%] md:flex-[0_0_58%]">
              <div className="mb-12 aspect-video overflow-hidden rounded xl:order-2">
                <Image
                  width="984"
                  height="554"
                  className="mb-6 h-auto w-full object-contain xl:mb-12"
                  src={post.coverImage.url}
                  alt=""
                />
              </div>
              <article className="mx-auto w-full xl:order-1">
                <h1 className="mb-8 text-4xl font-normal uppercase leading-none sm:text-6xl">{post.title}</h1>
                <div className="mb-8 flex max-w-3xl items-center gap-4">
                  <Image
                    width="48"
                    height="48"
                    className="h-auto w-12 rounded-full"
                    src={post.author.profilePicture}
                    alt=""
                  />
                  <div>
                    <p className="mb-[.1rem] text-lg font-bold">{post.author.name}</p>
                    <ul className="flex gap-3">
                      <li className="text-sm">
                        <a className="hover:text-blue-500 hover:underline" href={post.author.socialMediaLinks.twitter}>
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mb-6 italic text-zinc-500">
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

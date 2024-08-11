import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import BlogList from "@/components/Blog/BlogList"
import Container from "@/components/Container/Container"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "The Adstrategic Blog | Improve your Marketing and Software skills",
  description:
    "Learn and expand your Digital Marketing and Software Development knowledge with detailed tutoriales and examples.",
}

export default function Blog() {
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
            <Image src="/adstrategic-180.png" width={300} height={300} alt="" />
          </div>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <BlogList />
        </Suspense>
      </section>
    </>
  )
}

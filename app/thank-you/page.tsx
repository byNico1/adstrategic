import Link from "next/link"
import { Suspense } from "react"
import { LastThreePosts } from "@/components/Blog/BlogList"
import { Button } from "@/components/Button/Button"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import Reveal from "@/components/Reveal"

export default function ThankYou() {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col items-center justify-center px-2">
        <div className="mx-auto mb-10 mt-32 w-full max-w-xl text-center">
          <p className="mb-8 text-green-900">Email Sent Succesfully</p>
          <Reveal>
            <h1 className="mb-4 text-4xl font-extrabold ">Thank you for submitting our form</h1>
          </Reveal>
          <p>We will contact you ASAP⚡.</p>
        </div>

        <Button className="">
          <Link href="/blog">Go to our blog</Link>
        </Button>

        <h2 className="my-8 text-center text-3xl !leading-tight">Recommended Reads</h2>
      </div>

      <div className="border-t border-black/10">
        <Suspense fallback={<LoadingSkeleton />}>
          <LastThreePosts />
        </Suspense>
      </div>
    </div>
  )
}

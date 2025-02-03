"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Post, TableOfContentsItem } from "@/types/posts"
import { Button } from "./ui/button"

const mapTableOfContentItems = (toc: TableOfContentsItem[]) => {
  try {
    // `toc` is sometimes an array of arrays or an array of objects. Hashnode is trying to investigate this issue.
    // Meanwhile, we can use the following code to map the table of content items to handle both cases.
    return (toc ?? []).map((tocItem) => {
      const item = Array.isArray(tocItem) ? tocItem[0] : (tocItem as TableOfContentsItem)
      return {
        id: (item as TableOfContentsItem).id,
        level: (item as TableOfContentsItem).level,
        slug: (item as TableOfContentsItem).slug,
        title: (item as TableOfContentsItem).title,
        parentId: (item as TableOfContentsItem).parentId ?? null,
      }
    })
  } catch (error) {
    console.error("Error while mapping table of content items", {
      error,
    })
    return []
  }
}

const Toc = ({ data, parentId }: { data: TableOfContentsItem[]; parentId: TableOfContentsItem["parentId"] }) => {
  const children = data.filter((item) => item.parentId === parentId)
  if (children.length === 0) return null
  return (
    <ul className="list-inside font-semibold max-2xl:overflow-y-scroll dark:border-slate-800">
      {children.map((item) => (
        <li key={item.id} className="px-2 py-0.5 align-middle">
          <div className="flex items-center gap-2 rounded-lg hover:underline">
            <a
              href={`#heading-${item.slug}`}
              className="w-full py-2.5 pl-3 pr-2.5 text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              {item.title}
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

export const PostTOC = ({ post, marginTop }: { post: Post; marginTop: number }) => {
  const [open, setOpen] = useState(false)
  const [showTOC, setShowTOC] = useState(false)

  console.log(marginTop)
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      console.log(window.innerHeight)
      if (window.innerHeight + window.scrollY - 70 > marginTop) {
        setShowTOC(true)
      } else {
        setShowTOC(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [marginTop])
  // TODO: fix mobile Table of contents

  if (!post) return null
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showTOC ? 1 : 0, y: showTOC ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className="sticky bottom-8 z-40 col-span-8 w-full self-end px-4 lg:order-2 lg:col-span-9 lg:col-start-1 lg:row-start-1 lg:ml-auto lg:mr-0 lg:w-96 lg:pl-8 lg:pr-0 2xl:hidden"
      >
        <div className="mx-auto flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-sm border border-black/20 bg-secondary text-sm text-secondary-foreground md:max-w-2xl lg:absolute lg:bottom-0">
          <button
            onClick={() => setOpen(!open)}
            className={`mx-auto flex w-full max-w-xl cursor-pointer items-center justify-between px-4 py-6 md:max-w-2xl ${
              open && "border-b border-dashed border-black/30 dark:border-white"
            }`}
          >
            <span className="font-semibold">On this page</span>
            {open ? <Minus /> : <Plus />}
          </button>
          {open && <Toc parentId={null} data={mapTableOfContentItems(post.features.tableOfContents.items)} />}
        </div>
      </motion.div>
      <div className="col-span-full hidden self-start overflow-auto lg:sticky lg:top-20 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:p-4 lg:pr-0 2xl:-ml-8 2xl:block">
        <div className="relative mb-10 w-full overflow-hidden rounded-2xl border border-slate-200 bg-secondary text-secondary-foreground dark:border-slate-800 dark:bg-slate-900">
          <div
            className={`p-4 pt-0
            ${open ? "max-h-[60vh] overflow-y-scroll pb-8" : "max-h-[388px] overflow-hidden"}
          `}
          >
            <div className="pt-4">
              <h2 className="px-[18px] py-2 text-sm font-medium uppercase text-slate-600 dark:text-slate-400">
                Table of contents
              </h2>
            </div>

            <Toc parentId={null} data={mapTableOfContentItems(post.features.tableOfContents.items)} />

            {!open && (
              <div className="absolute bottom-0 right-0 w-full">
                <div className="h-40 bg-gradient-to-t from-white to-transparent dark:from-slate-900" />
              </div>
            )}
          </div>
          <div className="relative z-20 mb-4 flex items-center justify-center">
            <Button variant="ghost" onClick={() => setOpen(!open)}>
              <span className="text-sm text-slate-600 dark:text-slate-300">Show More</span>

              {open ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

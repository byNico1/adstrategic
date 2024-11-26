"use client"

import { Bell } from "lucide-react"
import dynamic from "next/dynamic"

import { type getDictionary } from "@/src/get-dictionary"

const Sheet = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.Sheet))
const SheetTrigger = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetTrigger))
const SheetContent = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetContent))
const SheetHeader = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetHeader))
const SheetTitle = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetTitle))
const Form = dynamic(() => import("@/components/Form/Form"))

const SheetOpener = ({
  dictionary,
  formDictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["sheetOpener"]
  formDictionary: Awaited<ReturnType<typeof getDictionary>>["form"]
}) => {
  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-0 z-[199] flex items-center justify-between gap-4 bg-muted pr-5 max-sm:inset-x-0 sm:left-5 sm:bg-transparent">
        <div className="bg-primary px-5 py-2 text-primary-foreground sm:rounded-t-lg sm:p-4">
          <Bell />
        </div>
        <span className="text-xl font-bold sm:sr-only sm:p-3">{dictionary.text}</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{dictionary.title}</SheetTitle>
          <Form className="!w-full" dictionary={formDictionary} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SheetOpener

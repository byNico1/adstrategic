"use client"

import { Bell } from "lucide-react"
import dynamic from "next/dynamic"

const Sheet = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.Sheet))
const SheetTrigger = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetTrigger))
const SheetContent = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetContent))
const SheetHeader = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetHeader))
const SheetTitle = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetTitle))
const Form = dynamic(() => import("@/components/Form/Form"))

const SheetOpener = () => {
  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-0 z-[199] flex items-center justify-between gap-4 bg-muted pr-5 max-sm:inset-x-0 sm:left-5 sm:bg-transparent">
        <div className="bg-primary px-5 py-2 text-primary-foreground sm:rounded-t-lg sm:p-4">
          <Bell />
        </div>
        <span className="text-xl font-bold sm:hidden sm:p-3">REQUEST PROPOSAL</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Request a Web Design and Marketing Proposal</SheetTitle>
          <Form className="!w-full" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SheetOpener

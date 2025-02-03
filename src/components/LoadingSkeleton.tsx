import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8 px-4 py-32 sm:px-6 lg:px-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

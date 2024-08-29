export default function LoadingSkeleton() {
  return (
    <div className="mb-16 mt-28 flex flex-col gap-2 px-2 md:flex-row">
      {Array(3)
        .fill(0)
        .map((parent, i) => (
          <div key={`parent-${i}`} className="flex-1">
            {Array(4)
              .fill(0)
              .map((el, index) => (
                <div key={index}>
                  <div className="mx-auto flex max-w-[20rem] flex-1 flex-row items-center gap-2 rounded border-r-4 bg-white p-2 shadow-lg">
                    <div className="h-[4.5rem] w-[4.5rem] animate-pulse rounded-full bg-gray-300"></div>
                    <div className="flex w-9/12 flex-col gap-2">
                      <span className="h-2 w-11/12 animate-pulse rounded-full bg-gray-300"></span>
                      <span className="h-2 w-9/12 animate-pulse rounded-full bg-gray-300"></span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}

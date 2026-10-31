
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-6 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-64 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Joined Event Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Image */}
              <div className="h-52 animate-pulse bg-gray-200 dark:bg-gray-800" />

              {/* Content */}
              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-3 pt-2">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>

                {/* View Event Button */}
                <div className="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

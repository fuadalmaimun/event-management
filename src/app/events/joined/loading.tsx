
export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="h-10 w-64 max-w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        {/* Joined Event Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Image */}
              <div className="h-52 animate-pulse bg-muted" />

              {/* Content */}
              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

                <div className="space-y-3 pt-2">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>

                {/* View Event Button */}
                <div className="h-12 animate-pulse rounded-lg bg-muted" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

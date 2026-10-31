
export default function Loading() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
        </div>

        {/* Total Events Skeleton */}
        <div className="mb-6 rounded-2xl border bg-card p-5">
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-9 w-16 animate-pulse rounded bg-muted" />
        </div>

        {/* Event Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              {/* Image */}
              <div className="h-48 animate-pulse bg-muted" />

              {/* Event Information */}
              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                </div>

                {/* Location */}
                <div className="space-y-3 border-t pt-4">
                  <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                </div>

                {/* View, Edit, Delete Buttons */}
                <div className="grid grid-cols-3 gap-2 border-t pt-4">
                  <div className="h-10 animate-pulse rounded-lg bg-muted" />
                  <div className="h-10 animate-pulse rounded-lg bg-muted" />
                  <div className="h-10 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}


import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden rounded-[2rem] bg-forest p-6 sm:p-9 lg:p-10">
          <div className="space-y-4">
            <Skeleton className="h-7 w-40 rounded-full bg-white/15" />

            <Skeleton className="h-10 w-3/4 max-w-lg bg-white/15 sm:h-12" />

            <Skeleton className="h-4 w-full max-w-xl bg-white/15" />
            <Skeleton className="h-4 w-2/3 max-w-md bg-white/15" />

            <Skeleton className="mt-5 h-12 w-44 rounded-full bg-lime/30" />
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-forest/10 bg-card p-5 sm:p-6 dark:border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-16" />
                  <Skeleton className="h-3 w-36" />
                </div>

                <Skeleton className="h-12 w-12 rounded-2xl" />
              </div>
            </div>
          ))}
        </section>

        {/* Analytics Heading */}
        <section className="mt-9">
          <div className="mb-5 space-y-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          {/* Analytics Charts */}
          <div className="grid gap-5 lg:grid-cols-5">
            {/* Bar Chart Skeleton */}
            <div className="rounded-2xl border border-forest/10 bg-card p-5 sm:p-6 lg:col-span-3 dark:border-white/10">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>

              <div className="mt-8 flex h-[230px] items-end justify-around gap-5 px-4">
                {[55, 85, 65, 100, 75].map((height, index) => (
                  <Skeleton
                    key={index}
                    className="w-12 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-4 flex justify-around">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Pie Chart Skeleton */}
            <div className="rounded-2xl border border-forest/10 bg-card p-5 sm:p-6 lg:col-span-2 dark:border-white/10">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52 max-w-full" />
              </div>

              <div className="flex h-[280px] items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[28px] border-muted">
                  <div className="absolute -right-3 top-2 h-20 w-20 rounded-full border-[20px] border-muted/70" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mt-9">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div className="space-y-3">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-8 w-64 max-w-full" />
            </div>
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-forest/10 bg-card p-5 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>

                <Skeleton className="mt-5 h-6 w-4/5" />
                <Skeleton className="mt-2 h-4 w-2/3" />

                <div className="mt-5 space-y-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

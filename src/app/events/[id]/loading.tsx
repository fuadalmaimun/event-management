export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-background text-foreground">
      {/* Hero Skeleton */}
      <section className="relative">
        <div className="relative h-[420px] overflow-hidden bg-muted sm:h-[480px] lg:h-[560px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-7 sm:px-8 lg:px-10">
              {/* Back Button */}
              <div className="h-10 w-36 rounded-full bg-white/30" />

              {/* Hero Content */}
              <div className="max-w-3xl space-y-5 pb-4">
                <div className="h-8 w-32 rounded-full bg-white/30" />
                <div className="h-10 w-3/4 max-w-xl rounded-lg bg-white/30 sm:h-14" />

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <div className="h-5 w-48 rounded bg-white/30" />
                  <div className="h-5 w-56 rounded bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:px-10">
        {/* Left Content */}
        <div className="min-w-0 space-y-7">
          {/* About Heading */}
          <div className="space-y-4">
            <div className="h-4 w-36 rounded bg-muted" />
            <div className="h-8 w-3/4 max-w-lg rounded bg-muted" />
            <div className="h-4 w-full max-w-2xl rounded bg-muted" />
            <div className="h-4 w-5/6 max-w-xl rounded bg-muted" />
          </div>

          {/* Description Card */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-muted" />
              <div className="h-6 w-48 rounded bg-muted" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="h-4 w-11/12 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>

            <div className="my-8 border-t border-border" />

            <div className="h-7 w-48 rounded bg-muted" />

            {/* Benefits */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-muted" />

                  <div className="flex-1 space-y-3 pt-1">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Card */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="h-6 w-48 rounded bg-muted" />

            <div className="mt-5 flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full bg-muted" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-52 max-w-full rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="min-w-0">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-forest/10 dark:shadow-black/30 sm:p-7 lg:sticky lg:top-24">
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="mt-4 h-8 w-4/5 rounded bg-muted" />

            <div className="mt-4 space-y-3">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
            </div>

            {/* Event Information */}
            <div className="my-7 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-muted" />

                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-20 rounded bg-muted" />
                    <div className="h-4 w-40 max-w-full rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="rounded-2xl bg-lime-mist p-4 dark:bg-lime/10">
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="mt-3 h-3 w-full rounded bg-muted" />
            </div>

            {/* Join Button */}
            <div className="mt-6 h-12 w-full rounded-xl bg-muted" />

            <div className="mx-auto mt-4 h-3 w-48 max-w-full rounded bg-muted" />
          </div>
        </aside>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Heart,
  HeartHandshake,
  MapPin,
  Sparkles,
  Globe,
} from "lucide-react";

const communityImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000&q=85",
    alt: "Volunteers working together",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&q=85",
    alt: "Community volunteers helping people",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&q=85",
    alt: "People joining a community activity",
  },
];

export default function Banner() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-deep text-on-forest">
        {/* Decorative background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 gt-grid opacity-70" />
          <div className="absolute -left-40 -top-56 h-[540px] w-[540px] rounded-full bg-forest-mid/45 blur-3xl" />
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-lime/15 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-forest-soft/30 blur-3xl" />
        </div>

        {/* Worldwide community decoration */}
        <Globe
          aria-hidden="true"
          strokeWidth={0.7}
          className="gt-spin-slow absolute -right-32 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 text-lime/25 lg:block"
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-28 pt-12 sm:px-8 sm:pb-32 sm:pt-16 lg:px-12 lg:pb-40 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

            {/* Image collage */}
            <div
              className="gt-enter relative order-2 mx-auto w-full max-w-[540px] lg:order-1 lg:max-w-none"
              style={{ animationDelay: "180ms" }}
            >
              <div
                aria-hidden
                className="absolute -left-4 -top-4 h-24 w-24 rounded-[28px] border-2 border-lime/50 sm:-left-6 sm:-top-6 sm:h-28 sm:w-28"
              />

              {/* Main image */}
              <div className="relative ml-4 aspect-[4/4.5] w-[78%] overflow-hidden rounded-[32px] shadow-2xl shadow-black/45 ring-1 ring-lime/25 sm:rounded-[40px]">
                <Image
                  src={communityImages[0].src}
                  alt={communityImages[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 75vw, 35vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-forest shadow-sm backdrop-blur-md sm:left-5 sm:top-5 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-forest-mid" />
                  Real people. Real impact.
                </div>

                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-lime">
                    Together we can
                  </p>
                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Make a difference.
                  </h2>
                </div>
              </div>

              {/* Floating image card 1 */}
              <div className="gt-float absolute -right-1 top-[8%] w-[43%] overflow-hidden rounded-[24px] border-4 border-white/90 shadow-2xl shadow-black/30 sm:-right-2 sm:rounded-[28px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={communityImages[1].src}
                    alt={communityImages[1].alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="bg-white px-3 py-3 text-forest sm:px-4">
                  <p className="text-xs font-black sm:text-sm">
                    Helping hands
                  </p>
                  <p className="mt-1 text-[10px] text-forest/65 sm:text-xs">
                    Small acts, big impact
                  </p>
                </div>
              </div>

              {/* Floating image card 2 */}
              <div className="absolute -bottom-5 right-[2%] w-[46%] -rotate-3 overflow-hidden rounded-[24px] border-4 border-white/90 shadow-2xl shadow-black/30 transition-transform duration-500 hover:rotate-0 sm:right-[3%] sm:rounded-[28px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={communityImages[2].src}
                    alt={communityImages[2].alt}
                    fill
                    sizes="(max-width: 1024px) 42vw, 22vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="bg-white px-3 py-3 text-forest sm:px-4">
                  <p className="text-xs font-black sm:text-sm">
                    Stronger together
                  </p>
                  <p className="mt-1 text-[10px] text-forest/65 sm:text-xs">
                    One community, one goal
                  </p>
                </div>
              </div>

           
              {/* Community icon */}
              <div className="absolute -right-2 bottom-[35%] grid h-12 w-12 place-items-center rounded-full border border-lime/30 bg-forest-mid text-lime shadow-xl sm:-right-5 sm:h-14 sm:w-14">
                <Globe size={25} />
              </div>
            </div>

            {/* Hero copy */}
            <div className="order-1 lg:order-2">
              <div
                className="gt-enter inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/12 px-4 py-2"
                style={{ animationDelay: "60ms" }}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-forest">
                  <Heart size={13} fill="currentColor" />
                </span>
                <span className="text-[11px] font-black uppercase tracking-[2.4px] text-lime sm:text-xs">
                  A little good goes a long way
                </span>
              </div>

              <h1
                className="gt-enter mt-7 text-[clamp(2.7rem,6.4vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.035em] text-white"
                style={{ animationDelay: "150ms" }}
              >
                Make room
                <br />
                for <span className="text-lime">good.</span>
                <br />
                Make it{" "}
                <span className="relative inline-block">
                  happen.
                  <svg
                    viewBox="0 0 290 14"
                    fill="none"
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 w-full"
                  >
                    <path
                      d="M4 8C74 2 195 2 284 7"
                      stroke="#C9F35B"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p
                className="gt-enter mt-8 max-w-[30rem] text-base leading-8 text-on-forest/75 sm:text-lg"
                style={{ animationDelay: "300ms" }}
              >
                Great communities don’t happen by accident. Discover local
                events, lend a hand, and turn small acts of kindness into
                something bigger.
              </p>

              <div
                className="gt-enter mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                style={{ animationDelay: "430ms" }}
              >
                <Link
                  href="/events"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-lime px-7 py-4 text-sm font-black uppercase tracking-[1.2px] text-forest transition duration-300 hover:-translate-y-1 hover:bg-lime-bright hover:shadow-xl hover:shadow-lime/25"
                >
                  Explore events
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href="/register"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-[1.2px] transition duration-300 hover:-translate-y-1 hover:border-lime hover:text-lime"
                >
                  Start making a difference
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Curved wave */}
        <svg
          aria-hidden
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 left-0 h-[64px] w-full sm:h-[96px]"
        >
          <path
            d="M0,72 C220,124 470,18 720,44 C980,72 1210,124 1440,64 L1440,130 L0,130 Z"
            className="fill-background"
          />
        </svg>
      </section>

      {/* Floating social proof card */}
      <div className="relative z-20 mx-auto -mt-10 max-w-[1440px] px-5 sm:-mt-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-[28px] border border-forest/10 bg-card/95 px-6 py-6 shadow-2xl shadow-forest/15 backdrop-blur-xl sm:flex-row sm:justify-between sm:px-8 dark:border-white/10 dark:bg-card/90">
          <div className="flex -space-x-3">
            {[
              "photo-1534528741775-53994a69daeb",
              "photo-1500648767791-00dcc994a43e",
              "photo-1531123897727-8f129e1688ce",
            ].map((photo) => (
              <div
                key={photo}
                className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-card bg-muted"
              >
                <Image
                  src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=100&h=100&q=80`}
                  alt="Community member"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ))}

            <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-card bg-lime text-sm font-black text-forest">
              +
            </span>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-base font-black text-foreground">
              Good things start with us.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Find your next way to give back.
            </p>
          </div>

          <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-forest text-lime sm:grid dark:bg-lime dark:text-forest-deep">
            <HeartHandshake size={26} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </>
  );
}

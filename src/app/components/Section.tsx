import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Leaf,
  GraduationCap,
  PawPrint,
  HandHeart,
  Users,
  CalendarDays,
  Globe2,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import FeatureCard from "./FeatureCard";

const causes = [
  {
    title: "Environment",
    description: "Protect nature and create a greener future.",
    icon: Leaf,
  },
  {
    title: "Education",
    description: "Help make learning accessible to everyone.",
    icon: GraduationCap,
  },
  {
    title: "Animal Welfare",
    description: "Give animals the care they deserve.",
    icon: PawPrint,
  },
  {
    title: "Community Support",
    description: "Support people who need a helping hand.",
    icon: HandHeart,
  },
];

const steps = [
  {
    title: "Discover",
    description:
      "Explore volunteer opportunities and find a cause you care about.",
    icon: CalendarDays,
  },
  {
    title: "Get Involved",
    description: "Join an event and meet like-minded people.",
    icon: Users,
  },
  {
    title: "Make an Impact",
    description: "Take action and make a real difference.",
    icon: HeartHandshake,
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85",
    title: "Together for a better world",
    category: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=700&q=85",
    title: "Sharing kindness",
    category: "Volunteering",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=85",
    title: "Supporting education",
    category: "Education",
  },
];

const impactItems = [
  {
    icon: Users,
    title: "People First",
    text: "A community where everyone can contribute.",
  },
  {
    icon: HeartHandshake,
    title: "Purpose Driven",
    text: "Turn your passion into meaningful action.",
  },
  {
    icon: Globe2,
    title: "Local Change",
    text: "Start making a difference in your community.",
  },
];

const whyItems = [
  {
    icon: Globe2,
    title: "One connected community",
    text: "Bring volunteers and organizers together.",
  },
  {
    icon: ShieldCheck,
    title: "Meaningful opportunities",
    text: "Discover activities where your contribution matters.",
  },
  {
    icon: HeartHandshake,
    title: "Real human connection",
    text: "Meet people who share your passion.",
  },
];

function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[3px]",
        tone === "dark"
          ? "bg-lime/15 text-lime ring-1 ring-lime/30"
          : "bg-lime-mist text-forest ring-1 ring-forest/10 dark:bg-lime/15 dark:text-lime dark:ring-lime/25",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-lime" : "bg-forest-mid dark:bg-lime",
        )}
      />
      {children}
    </span>
  );
}

export default function HomeSections() {
  return (
    <>
      {/* Impact */}
      <section
        id="impact"
        className="relative bg-background px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Why it matters</Eyebrow>

              <h2 className="mt-6 max-w-[15ch] text-[clamp(2.1rem,4.6vw,3.75rem)] font-black uppercase leading-[0.94] tracking-[-0.03em] text-foreground">
                Small actions can create{" "}
                <span className="gt-marker">big changes.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                GoodTogether brings people together to build stronger, kinder
                communities.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ml-auto w-full max-w-[540px]">
                <div
                  aria-hidden
                  className="absolute -bottom-5 -left-5 h-full w-full rounded-[36px] bg-lime/45 dark:bg-lime/15"
                />
                <div className="relative aspect-[16/11] overflow-hidden rounded-[30px] shadow-xl shadow-forest/10 ring-1 ring-forest/10 dark:ring-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=85"
                    alt="Community volunteers working together to make a positive impact"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-forest-deep/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {impactItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[28px] border border-forest/10 bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:border-lime hover:shadow-xl hover:shadow-forest/10 dark:border-white/10 dark:hover:border-lime/60"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-1 w-full bg-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-lime transition-transform duration-300 group-hover:rotate-6 dark:bg-lime/15 dark:text-lime">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-7 text-xl font-black text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="relative overflow-hidden bg-muted/60 px-5 py-20 sm:px-8 lg:px-12 lg:py-28 dark:bg-muted/25">
        <div
          aria-hidden
          className="gt-dots absolute right-6 top-6 hidden h-40 w-40 opacity-60 sm:block dark:opacity-20"
        />

        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Find your purpose</Eyebrow>

            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-foreground">
              Choose a cause. <span className="gt-marker">Be the change.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {causes.map((cause, index) => {
              const Icon = cause.icon;
              const isDeep = index % 2 === 1;
              return (
                <article
                  key={cause.title}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-[28px] border p-6 transition duration-300 hover:-translate-y-1.5",
                    isDeep
                      ? "border-transparent bg-forest text-on-forest shadow-lg shadow-forest/15 hover:shadow-xl hover:shadow-forest/25"
                      : "border-forest/10 bg-card hover:border-lime hover:shadow-xl hover:shadow-forest/10 dark:border-white/10 dark:hover:border-lime/60",
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -right-10 -top-10 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-125",
                      isDeep ? "bg-lime/15" : "bg-lime-mist dark:bg-lime/10",
                    )}
                  />

                  <div
                    className={cn(
                      "relative grid h-12 w-12 place-items-center rounded-xl",
                      isDeep
                        ? "bg-lime text-forest"
                        : "bg-forest text-lime dark:bg-lime/15 dark:text-lime",
                    )}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="relative mt-7 text-lg font-black text-inherit">
                    {cause.title}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-3 text-sm leading-6",
                      isDeep ? "text-on-forest/75" : "text-muted-foreground",
                    )}
                  >
                    {cause.description}
                  </p>

                  <Link
                    href="/upcoming-events"
                    className={cn(
                      "relative mt-6 inline-flex items-center gap-2 text-sm font-black",
                      isDeep ? "text-lime" : "text-forest dark:text-lime",
                    )}
                  >
                    Explore events
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events - API later */}
      <section className="relative isolate overflow-hidden bg-forest-deep px-5 py-20 text-on-forest sm:px-8 lg:px-12 lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 gt-grid opacity-70" />
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-forest-mid/40 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow tone="dark">Make your move</Eyebrow>

              <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.75rem)] font-black uppercase leading-[0.94] tracking-[-0.03em] text-white">
                Upcoming Events
              </h2>

              <p className="mt-4 max-w-lg text-base leading-7 text-on-forest/75">
                Find your next opportunity to make a difference.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-lime/40 px-5 py-3 text-xs font-black uppercase tracking-[1.8px] text-lime transition duration-300 hover:-translate-y-0.5 hover:bg-lime hover:text-forest sm:self-auto"
            >
              View all events <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[36px] border border-dashed border-lime/45 bg-white/[0.04] px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-lime/[0.07] to-transparent"
            />

            <div className="relative">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-forest shadow-lg shadow-lime/20">
                <CalendarDays size={30} />
              </span>

              <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                Exciting events are waiting
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-on-forest/75 sm:text-base">
                Upcoming volunteer opportunities will appear here. Events will
                be loaded from MongoDB.
              </p>

              <Link
                href="/events"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-black uppercase tracking-[1.2px] text-forest transition duration-300 hover:-translate-y-1 hover:bg-lime-bright hover:shadow-xl hover:shadow-lime/25"
              >
                Browse events <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="mx-auto">Simple and meaningful</Eyebrow>

            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-foreground">
              Three steps to <span className="gt-marker">make an impact.</span>
            </h2>
          </div>

          <div className="relative mt-16">
            <div
              aria-hidden
              className="absolute left-[16.67%] right-[16.67%] top-10 hidden border-t-2 border-dashed border-forest/20 md:block dark:border-lime/25"
            />

            <div className="grid gap-10 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-forest text-lime ring-8 ring-background dark:bg-lime dark:text-forest-deep">
                      <Icon size={30} />

                      <span className="absolute -right-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full bg-lime text-[11px] font-black text-forest ring-2 ring-background dark:bg-forest dark:text-lime">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-black text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[34ch] text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="community"
        className="bg-muted/60 px-5 py-20 sm:px-8 lg:px-12 lg:py-28 dark:bg-muted/25"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <Eyebrow>Moments that matter</Eyebrow>

            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-foreground">
              Good things happen <span className="gt-marker">together.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {gallery.map((item, index) => (
              <article
                key={item.title}
                className={cn(
                  "group relative h-72 overflow-hidden rounded-[30px] bg-forest shadow-lg shadow-forest/10 sm:h-80 md:h-[26rem]",
                  index === 1 && "md:mt-12",
                  index === 2 && "md:mt-6",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block rounded-full bg-lime px-3 py-1 text-[10px] font-black uppercase tracking-[1.6px] text-forest">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-white sm:text-xl">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FeatureCard />
      {/* Why GoodTogether */}
      <section className="bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>More than volunteering</Eyebrow>

            <h2 className="mt-6 max-w-[14ch] text-[clamp(2.1rem,4.6vw,3.75rem)] font-black uppercase leading-[0.94] tracking-[-0.03em] text-foreground">
              A community built on <span className="gt-marker">kindness.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
              GoodTogether is a place where people, purpose, and opportunities
              meet.
            </p>

            <Link
              href="/register"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-black uppercase tracking-[1.2px] text-lime transition duration-300 hover:-translate-y-1 hover:bg-forest-mid hover:shadow-xl hover:shadow-forest/25 dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
            >
              Join our community
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="space-y-4">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group flex gap-5 rounded-[26px] border border-forest/10 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-lime hover:shadow-xl hover:shadow-forest/10 dark:border-white/10 dark:hover:border-lime/60"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest text-lime transition-transform duration-300 group-hover:rotate-6 dark:bg-lime/15 dark:text-lime">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="font-black text-card-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter - UI only */}
      <section className="bg-background px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[40px] bg-lime px-6 py-14 text-center text-forest sm:px-12 sm:py-16">
          <div aria-hidden className="absolute inset-0">
            <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full border-[14px] border-forest/10" />
            <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full border-[14px] border-forest/10" />
            <div className="gt-dots absolute inset-0 opacity-30" />
          </div>

          <div className="relative">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-forest text-lime shadow-lg shadow-forest/20">
              <Mail size={26} />
            </span>

            <h2 className="mx-auto mt-7 max-w-2xl text-[clamp(2rem,4.4vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
              A little good in your inbox.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-forest/75">
              Stay connected with inspiring stories and upcoming volunteer
              opportunities.
            </p>

            {/* Newsletter Form */}
            <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-forest/10 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-xl bg-transparent px-5 py-4 text-sm text-forest outline-none placeholder:text-forest/50"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-forest px-7 py-4 text-sm font-bold text-lime transition hover:bg-forest/90"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-xs font-medium text-forest/60">
              No spam. Just good news and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-forest to-forest-deep px-5 py-20 text-on-forest sm:px-8 lg:px-12 lg:py-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 gt-grid opacity-60" />
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1440px] text-center">
          <Eyebrow tone="dark" className="mx-auto">
            Your journey starts here
          </Eyebrow>

          <h2 className="mx-auto mt-7 max-w-[18ch] text-[clamp(2.2rem,5vw,4.25rem)] font-black uppercase leading-[0.94] tracking-[-0.03em] text-white">
            Ready to do something good?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-on-forest/75 sm:text-lg">
            Find your people. Find your purpose. Make a difference.
          </p>

          <Link
            href="/register"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-sm font-black uppercase tracking-[1.2px] text-forest transition duration-300 hover:-translate-y-1 hover:bg-lime-bright hover:shadow-xl hover:shadow-lime/25"
          >
            Get Started
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </>
  );
}

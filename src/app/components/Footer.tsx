import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-lime/20 bg-forest-deep px-5 pb-10 pt-16 text-on-forest sm:px-8 lg:px-12 lg:pt-20">
      {/* Decorative backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gt-grid opacity-50" />
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-forest-mid/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-forest">
                <HeartHandshake size={25} strokeWidth={1.9} />
              </span>
              <span className="text-2xl font-extrabold tracking-[-0.8px] text-white">
                GoodTogether.
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-on-forest/70">
              Bringing people together through kindness, volunteering,
              and meaningful community experiences.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                { label: "IG", href: "https://instagram.com" },
                { label: "FB", href: "https://facebook.com" },
                { label: "in", href: "https://linkedin.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-sm font-black text-on-forest/75 transition duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-forest"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[2.6px] text-lime">
              Explore
            </h3>
            <div className="mt-6 flex flex-col gap-3.5 text-sm text-on-forest/70">
              <Link
                href="/"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Home
              </Link>
              <Link
                href="/upcoming-events"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Upcoming Events
              </Link>
              <Link
                href="/#impact"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Our Impact
              </Link>
              <Link
                href="/#community"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Community
              </Link>
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[2.6px] text-lime">
              Get Involved
            </h3>
            <div className="mt-6 flex flex-col gap-3.5 text-sm text-on-forest/70">
              <Link
                href="/register"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/login"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Log In
              </Link>
              <Link
                href="/add-event"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Create an Event
              </Link>
              <Link
                href="/upcoming-events"
                className="w-fit font-semibold transition duration-300 hover:translate-x-1 hover:text-lime"
              >
                Find Events
              </Link>
            </div>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <div
          aria-hidden
          className="gt-ghost mt-16 select-none text-center text-[clamp(2.4rem,12vw,10rem)] font-black uppercase leading-none tracking-[-0.04em]"
        >
          GoodTogether.
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-on-forest/55 sm:flex-row">
          <p>© {new Date().getFullYear()} GoodTogether. All rights reserved.</p>
          <p>Made with care for a better community.</p>
        </div>
      </div>
    </footer>
  );
}

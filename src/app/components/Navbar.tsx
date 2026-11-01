"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  HeartHandshake,
  Menu,
  X,
  CalendarPlus,
  CalendarDays,
  Users,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const navLinks = [{ label: "Upcoming Events", href: "/events" }];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  // Elevate the bar once the page is scrolled for a layered, premium feel.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await authClient.signOut();

      setProfileOpen(false);
      setMenuOpen(false);

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const userName = user?.name || "User";
  const userImage = user?.image;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-forest/10 bg-background/85 backdrop-blur-xl transition-shadow duration-300 dark:border-white/10 ${
        scrolled
          ? "shadow-lg shadow-forest/10 dark:shadow-black/40"
          : "shadow-none"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          aria-label="GoodTogether home"
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-forest text-lime transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-11 sm:w-11 dark:bg-lime dark:text-forest-deep">
            <HeartHandshake size={22} strokeWidth={1.9} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-background dark:bg-forest" />
          </span>

          <span className="text-lg font-extrabold tracking-[-0.7px] text-foreground sm:text-xl">
            good
            <span className="font-medium text-forest/65 dark:text-lime/75">
              together.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-forest/10 bg-white/60 p-1.5 md:flex dark:border-white/10 dark:bg-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[12px] font-black uppercase tracking-[1.6px] text-forest/65 transition-colors duration-300 hover:bg-lime hover:text-forest dark:text-on-forest/65 dark:hover:bg-lime dark:hover:text-forest-deep"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle />

          {/* Authentication */}
          {!isPending && (
            <>
              {!user ? (
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-[13px] font-extrabold text-lime transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-mid hover:shadow-lg hover:shadow-forest/25 sm:inline-flex dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
                >
                  Log in <ArrowUpRight size={15} />
                </Link>
              ) : (
                <div className="relative hidden items-center gap-2 sm:flex">
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setProfileOpen(!profileOpen)}
                      onBlur={(e) => {
                        if (
                          !e.currentTarget.parentElement?.contains(
                            e.relatedTarget as Node,
                          )
                        ) {
                          setProfileOpen(false);
                        }
                      }}
                      aria-label="Open profile menu"
                      aria-expanded={profileOpen}
                      className="group flex items-center gap-2 rounded-full border border-forest/10 bg-card py-1 pl-1 pr-3 transition hover:border-lime dark:border-white/10"
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full bg-forest text-lime dark:bg-lime dark:text-forest-deep">
                        {userImage ? (
                          <Image
                            src={userImage}
                            alt={userName}
                            width={40}
                            height={40}
                            unoptimized
                            referrerPolicy="no-referrer"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center font-bold">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <ChevronDown size={15} className="text-foreground/60" />

                      {/* Name Tooltip */}
                      <span className="pointer-events-none absolute right-0 top-12 z-50 whitespace-nowrap rounded-lg bg-forest px-3 py-2 text-xs font-bold text-lime opacity-0 shadow-lg transition group-hover:opacity-100 dark:bg-lime dark:text-forest-deep">
                        {userName}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {profileOpen && (
                      <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-forest/10 bg-background p-2 shadow-xl dark:border-white/10">
                        <div className="border-b border-forest/10 px-3 py-3 dark:border-white/10">
                          <p className="truncate text-sm font-extrabold text-foreground">
                            {userName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>

                        <div className="space-y-1 py-2">
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-lime/20"
                          >
                            <LayoutDashboard size={17} />
                            Dashboard
                          </Link>

                          <Link
                            href="/events/create"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-lime/20"
                          >
                            <CalendarPlus size={17} />
                            Create Event
                          </Link>

                          <Link
                            href="/events/manage"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-lime/20"
                          >
                            <CalendarDays size={17} />
                            Manage Events
                          </Link>

                          <Link
                            href="/events/joined"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-lime/20"
                          >
                            <Users size={17} />
                            Joined Events
                          </Link>
                        </div>

                        <div className="border-t border-forest/10 pt-2 dark:border-white/10">
                          <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
                          >
                            <LogOut size={17} />
                            {loggingOut ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-lime md:hidden dark:border-white/15 dark:text-on-forest dark:hover:bg-lime dark:hover:text-forest-deep"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Lime Hairline */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-lime/60 to-transparent"
      />

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-forest/10 bg-background/95 px-4 pb-5 pt-4 backdrop-blur-xl md:hidden dark:border-white/10">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-forest/10 bg-card px-4 py-3.5 text-sm font-black uppercase tracking-[1.8px] text-foreground transition hover:border-lime hover:bg-lime/30 dark:border-white/10 dark:hover:border-lime/50 dark:hover:bg-lime/10"
              >
                {link.label}
                <ArrowUpRight
                  size={16}
                  className="text-forest/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest dark:text-lime/60 dark:group-hover:text-lime"
                />
              </Link>
            ))}

            {!isPending && (
              <>
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3.5 text-sm font-extrabold text-lime dark:bg-lime dark:text-forest-deep"
                  >
                    Log in <ArrowUpRight size={17} />
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card p-3 dark:border-white/10">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-forest text-lime dark:bg-lime dark:text-forest-deep">
                        {userImage ? (
                          <Image
                            src={userImage}
                            alt={userName}
                            width={40}
                            height={40}
                            unoptimized
                            referrerPolicy="no-referrer"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center font-bold">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card px-4 py-3.5 text-sm font-semibold text-foreground dark:border-white/10"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <Link
                      href="/events/create"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card px-4 py-3.5 text-sm font-semibold text-foreground dark:border-white/10"
                    >
                      <CalendarPlus size={17} />
                      Create Event
                    </Link>

                    <Link
                      href="/events/manage"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card px-4 py-3.5 text-sm font-semibold text-foreground dark:border-white/10"
                    >
                      <CalendarDays size={17} />
                      Manage Events
                    </Link>

                    <Link
                      href="/events/joined"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card px-4 py-3.5 text-sm font-semibold text-foreground dark:border-white/10"
                    >
                      <Users size={17} />
                      Joined Events
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 px-5 py-3.5 text-sm font-bold text-red-500 disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

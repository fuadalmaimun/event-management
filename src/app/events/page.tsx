
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import {
  CalendarDays,
  MapPin,
  AlertCircle,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  image: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  createdAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and category state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchUpcomingEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/events`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: Event[] = await response.json();

      const now = new Date();

      const upcomingEvents = data
        .filter((event) => {
          const eventDate = new Date(event.eventDate);

          return (
            !Number.isNaN(eventDate.getTime()) &&
            eventDate >= now
          );
        })
        .sort(
          (a, b) =>
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
        );

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Upcoming events error:", error);
      setError("Events load করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);

  // Search and category filtering
  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || event.eventType === category;

    return matchesSearch && matchesCategory;
  });

  // Get unique event categories
  const categories = [
    "All",
    ...new Set(events.map((event) => event.eventType)),
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-forest dark:text-lime">
            Discover & Participate
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover meaningful events, connect with people,
            and make a positive difference in your community.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events by title, location..."
                className="w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-11 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/10 dark:focus:border-lime dark:focus:ring-lime/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-red-500"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative md:w-64">
              <SlidersHorizontal
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-forest dark:text-lime"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm font-medium text-foreground outline-none transition focus:border-forest dark:focus:border-lime"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Result Count */}
          {!loading && !error && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-bold text-forest dark:text-lime">
                  {filteredEvents.length}
                </span>{" "}
                of {events.length} events
              </p>

              {(search || category !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="text-sm font-semibold text-forest hover:underline dark:text-lime"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-card shadow-sm"
              >
                <div className="h-52 bg-muted" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-24 rounded bg-muted" />
                  <div className="h-6 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-10 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto max-w-lg rounded-xl border border-red-300 bg-red-50 p-6 text-center text-red-700 dark:bg-red-950 dark:text-red-200">
            <AlertCircle className="mx-auto mb-3" size={32} />
            <p>{error}</p>

            <button
              onClick={() => void fetchUpcomingEvents()}
              className="mt-4 rounded-lg bg-forest px-5 py-2 text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <Reveal
                key={event._id}
                className="h-full"
                delay={(index % 3) * 80}
              >
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-lime hover:shadow-xl">
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-muted">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      No Image Available
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-xs font-bold text-forest">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold">
                    {event.title}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin
                      size={17}
                      className="shrink-0 text-forest dark:text-lime"
                    />
                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-forest dark:text-lime"
                    />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString(
                        "en-BD",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* View Event */}
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
                  >
                    View Event
                  </Link>
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* No Matching Events */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border px-5 py-16 text-center">
            <Search
              size={48}
              className="mx-auto mb-4 text-forest dark:text-lime"
            />

            <h2 className="text-2xl font-bold">
              No Events Found
            </h2>

            <p className="mt-3 text-muted-foreground">
              No events match your search. Try another keyword or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-lg bg-forest px-6 py-3 font-semibold text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
            >
              Show All Events
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

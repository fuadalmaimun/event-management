
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-12 text-[#101C18] dark:bg-[#101C18] dark:text-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-green-700 dark:text-lime-300">
            Discover & Participate
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Discover meaningful events, connect with people,
            and make a positive difference in your community.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1B3028] sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events by title, location..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-11 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10 dark:border-gray-600 dark:bg-[#101C18] dark:text-white dark:placeholder:text-gray-400 dark:focus:border-lime-300"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 dark:text-lime-300"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-green-600 dark:border-gray-600 dark:bg-[#101C18] dark:text-white dark:focus:border-lime-300"
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-bold text-green-700 dark:text-lime-300">
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
                  className="text-sm font-semibold text-green-700 hover:underline dark:text-lime-300"
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
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1B3028]"
              >
                <div className="h-52 bg-gray-200 dark:bg-gray-700" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
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
              className="mt-4 rounded-lg bg-[#173D32] px-5 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-[#1B3028]"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-[#DDF477] px-3 py-1 text-xs font-bold text-[#173D32]">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold">
                    {event.title}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin
                      size={17}
                      className="shrink-0 text-green-700 dark:text-lime-300"
                    />
                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-green-700 dark:text-lime-300"
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
                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#173D32] px-5 py-3 font-semibold text-white transition hover:bg-[#245A49] dark:bg-[#DDF477] dark:text-[#173D32] dark:hover:bg-lime-300"
                  >
                    View Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No Matching Events */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center dark:border-gray-600">
            <Search
              size={48}
              className="mx-auto mb-4 text-green-700 dark:text-lime-300"
            />

            <h2 className="text-2xl font-bold">
              No Events Found
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              No events match your search. Try another keyword or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-lg bg-[#173D32] px-6 py-3 font-semibold text-white transition hover:bg-[#245A49] dark:bg-[#DDF477] dark:text-[#173D32]"
            >
              Show All Events
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

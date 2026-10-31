
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Loader2,
  AlertCircle,
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

      // Only show upcoming events
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
        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-semibold">
                {events.length} Upcoming Events
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
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
                      <MapPin size={17} className="shrink-0 text-green-700 dark:text-lime-300" />
                      <span className="line-clamp-1">
                        {event.location}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CalendarDays size={17} className="shrink-0 text-green-700 dark:text-lime-300" />
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
          </>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center dark:border-gray-600">
            <CalendarDays
              size={48}
              className="mx-auto mb-4 text-green-700 dark:text-lime-300"
            />

            <h2 className="text-2xl font-bold">
              No Upcoming Events
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              There are no upcoming events right now.
              Please check back later!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

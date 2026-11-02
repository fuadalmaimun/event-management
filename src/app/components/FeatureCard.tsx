"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Event {
  _id: string;
  allEventId?: string;
  title: string;
  description: string;
  image: string;
  location: string;
  eventDate: string;
  eventType: string;
}

const FeatureCard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API}/events`);

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: Event[] = await res.json();

        const upcomingEvents = data
          .filter((event) => new Date(event.eventDate) >= new Date())
          .sort(
            (a, b) =>
              new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-20 transition-colors duration-300">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-lime-mist/70 blur-3xl dark:bg-lime/10" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-lime/15 blur-3xl dark:bg-lime/10" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-lime-mist px-4 py-2 text-sm font-semibold text-forest dark:border-lime/25 dark:bg-lime/10 dark:text-lime">
              <Sparkles size={16} />
              Make an Impact Together
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Explore Featured{" "}
              <span className="text-forest dark:text-lime">Events</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Discover meaningful events, connect with your community, and
              become part of something bigger.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-lime shadow-lg shadow-forest/20 transition hover:-translate-y-1 hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:shadow-lime/20 dark:hover:bg-lime-bright"
          >
            Explore All Events
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-3xl bg-muted"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <CalendarDays
              className="mx-auto mb-4 text-forest dark:text-lime"
              size={36}
            />
            <h3 className="text-lg font-bold text-foreground">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back later for exciting community events.
            </p>
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: events.length > 3,
            }}
            className="mx-auto w-full"
          >
            <CarouselContent className="-ml-4 py-3">
              {events.map((event) => (
                <CarouselItem
                  key={event._id}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/events/${event.allEventId || event._id}`}
                    className="group block h-full"
                  >
                    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-border bg-card shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-lime hover:shadow-xl hover:shadow-forest/10">
                      {/* Image */}
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Event Type */}
                      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {event.eventType}
                      </span>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
                          <MapPin className="size-4 shrink-0 text-lime" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        <h3 className="line-clamp-2 text-2xl font-bold transition-colors group-hover:text-lime">
                          {event.title}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">
                          {event.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                          <span className="flex items-center gap-2 text-sm text-white/80">
                            <CalendarDays className="size-4 shrink-0 text-lime" />
                            {new Date(event.eventDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>

                          <span className="flex items-center gap-2 text-sm font-semibold text-lime">
                            Explore
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious className="static size-12 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-forest hover:bg-forest hover:text-lime dark:hover:border-lime dark:hover:bg-lime dark:hover:text-forest-deep" />

              <span className="text-xs font-bold tracking-[0.25em] text-muted-foreground">
                DISCOVER MORE
              </span>

              <CarouselNext className="static size-12 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-forest hover:bg-forest hover:text-lime dark:hover:border-lime dark:hover:bg-lime dark:hover:text-forest-deep" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FeatureCard;

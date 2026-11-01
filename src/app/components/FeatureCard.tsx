
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Heart,
} from "lucide-react";

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
  title: string;
  description: string;
  image: string;
  location: string;
  eventDate: string;
  eventType: string;
}

const FeatureCard = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API}/events`);

        if (!res.ok) throw new Error("Failed to fetch events");

        const data: Event[] = await res.json();

        const upcomingEvents = data
          .filter((event) => new Date(event.eventDate) >= new Date())
          .sort(
            (a, b) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
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
              <span className="text-forest dark:text-lime">
                Events
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Discover meaningful events, connect with your community,
              and become part of something bigger.
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

        {/* Events Carousel */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <CalendarDays className="mx-auto mb-4 text-forest dark:text-lime" size={36} />
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
            <CarouselContent className="-ml-5 py-3">
              {events.map((event) => (
                <CarouselItem
                  key={event._id}
                  className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-lime hover:shadow-xl hover:shadow-forest/10">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        {event.eventType}
                      </span>

                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-white/90">
                          <MapPin size={15} />
                          {event.location}
                        </p>
                      </div>

                      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-forest shadow-md transition hover:scale-110 dark:text-lime">
                        <Heart size={17} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-[235px] flex-col p-5">
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest dark:text-lime">
                        <CalendarDays size={15} />
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>

                      <h3 className="line-clamp-1 text-xl font-bold text-card-foreground transition-colors group-hover:text-forest dark:group-hover:text-lime">
                        {event.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {event.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <Link
                          href={`/events/${event._id}`}
                          className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-lime-mist px-4 py-3 text-sm font-bold text-forest transition hover:bg-forest hover:text-lime dark:bg-lime/15 dark:text-lime dark:hover:bg-lime dark:hover:text-forest-deep"
                        >
                          View Event Details
                          <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <CarouselPrevious className="static size-11 translate-y-0 rounded-full border-border bg-card text-foreground shadow-sm transition hover:bg-forest hover:text-lime dark:hover:bg-lime dark:hover:text-forest-deep" />

              <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                DISCOVER MORE
              </span>

              <CarouselNext className="static size-11 translate-y-0 rounded-full border-border bg-card text-foreground shadow-sm transition hover:bg-forest hover:text-lime dark:hover:bg-lime dark:hover:text-forest-deep" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FeatureCard;

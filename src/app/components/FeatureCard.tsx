
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
    <section className="relative overflow-hidden bg-gray-50 py-20 transition-colors duration-300 dark:bg-[#0b1712]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl dark:bg-green-500/10" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-400">
              <Sparkles size={16} />
              Make an Impact Together
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              Explore Featured{" "}
              <span className="text-green-600 dark:text-green-400">
                Events
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
              Discover meaningful events, connect with your community,
              and become part of something bigger.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700 dark:bg-green-500 dark:text-gray-950 dark:hover:bg-green-400"
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
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
            <CalendarDays className="mx-auto mb-4 text-green-600 dark:text-green-400" size={36} />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
                  <div className="group h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/10 dark:border-gray-800 dark:bg-[#12251b] dark:hover:border-green-800 dark:hover:shadow-green-950/30">
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

                      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-green-700 shadow-md transition hover:scale-110 dark:bg-[#12251b] dark:text-green-400">
                        <Heart size={17} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-[235px] flex-col p-5">
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
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

                      <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                        {event.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <Link
                          href={`/events/${event._id}`}
                          className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-600 hover:text-white dark:bg-green-950/50 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-gray-950"
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
              <CarouselPrevious className="static size-11 translate-y-0 rounded-full border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-green-600 hover:text-white dark:border-gray-700 dark:bg-[#12251b] dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-950" />

              <span className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                DISCOVER MORE
              </span>

              <CarouselNext className="static size-11 translate-y-0 rounded-full border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-green-600 hover:text-white dark:border-gray-700 dark:bg-[#12251b] dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-950" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FeatureCard;

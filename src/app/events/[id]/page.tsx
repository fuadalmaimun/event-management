
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  CalendarDays,
  ArrowLeft,
  Heart,
  Users,
  Clock,
  ShieldCheck,
  HandHeart,
  Leaf,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import JoinButton from "@/app/components/JoinButton";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  image: string;
  location: string;
  eventDate: string;
  email: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const DetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(`${API}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const event: Event | null = await res.json();

  if (!event) notFound();

  const date = new Date(event.eventDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#f8faf9] text-gray-900 dark:bg-[#0b1512] dark:text-white">

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[560px]">

          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-7 sm:px-8 lg:px-10">

              <Link
                href="/events"
                className="flex w-fit items-center gap-2 rounded-full border border-white/30 bg-black/30 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                <ArrowLeft size={17} />
                Back to Events
              </Link>

              <div className="max-w-3xl pb-4 text-white">

                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg">
                  <Heart size={14} />
                  {event.eventType}
                </span>

                <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {event.title}
                </h1>

                <div className="mt-6 flex flex-col gap-3 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:gap-6">

                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="shrink-0 text-emerald-400" />
                    {event.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays size={18} className="shrink-0 text-emerald-400" />
                    {formattedDate}
                  </span>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:px-10">

        {/* Left Content */}
        <div className="min-w-0">

          {/* Section Heading */}
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[3px] text-emerald-600 dark:text-emerald-400">
              About this event
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              Be a part of something meaningful.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400">
              Every small action can create a meaningful impact.
              Discover this community initiative and become part
              of something positive.
            </p>
          </div>

          {/* Description Card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#12221c] sm:p-8">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <HandHeart size={23} />
              </div>

              <h3 className="text-xl font-bold">
                Event Description
              </h3>
            </div>

            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-gray-600 dark:text-gray-300 sm:text-base">
              {event.description}
            </p>

            <div className="my-8 border-t border-gray-100 dark:border-gray-700" />

            <h3 className="text-xl font-bold">
              Why Participate?
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10">
                  <HandHeart size={23} />
                </div>

                <div>
                  <h4 className="font-bold">Help Your Community</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Make a positive difference in people's lives.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
                  <Users size={23} />
                </div>

                <div>
                  <h4 className="font-bold">Meet Good People</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Connect with people who care about others.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/10">
                  <Leaf size={23} />
                </div>

                <div>
                  <h4 className="font-bold">Create Real Impact</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Contribute to a better and healthier world.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-500/10">
                  <Heart size={23} />
                </div>

                <div>
                  <h4 className="font-bold">Spread Kindness</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Every small action can make a big difference.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Organizer Card */}
          <div className="mt-7 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#12221c] sm:p-7">

            <div className="flex items-center gap-2">
              <ShieldCheck size={21} className="text-emerald-500" />
              <h3 className="text-xl font-bold">
                Event Organizer
              </h3>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Users size={25} />
              </div>

              <div className="min-w-0">
                <h4 className="font-bold">
                  Community Organizer
                </h4>

                <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                  {event.email}
                </p>
              </div>

              <div className="flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 sm:ml-auto">
                <ShieldCheck size={15} />
                Organizer
              </div>

            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <aside className="min-w-0">

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-200/40 dark:border-gray-800 dark:bg-[#12221c] dark:shadow-black/20 sm:p-7 lg:sticky lg:top-24">

            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles size={17} />
              Join the movement
            </div>

            <h3 className="mt-3 text-2xl font-black sm:text-3xl">
              Your presence matters.
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
              Be part of this community initiative and help
              create a positive impact.
            </p>

            {/* Event Information */}
            <div className="my-7 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10">
                  <CalendarDays size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Event Date
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
                  <Clock size={21} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Event Time
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formattedTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10">
                  <MapPin size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 break-words text-sm font-bold">
                    {event.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Info Box */}
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">

              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 size={18} />

                <span className="text-sm font-bold">
                  Everyone can make a difference
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-emerald-800/70 dark:text-emerald-300/70">
                Join this event and become part of something bigger.
              </p>

            </div>

            {/* Join Button */}
            <div className="mt-6 w-full [&_button]:!w-full">
              <JoinButton event={event} />
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Login required to join this event.
            </p>

          </div>

        </aside>

      </section>
    </main>
  );
};

export default DetailsPage;

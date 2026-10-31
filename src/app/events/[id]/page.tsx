import Link from "next/link";
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
  Share2,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

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

const DetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/events/${id}`, {
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
        <div className="relative h-[350px] overflow-hidden md:h-[500px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

          <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-between px-5 py-8 md:px-10">
            <Link
              href="/events"
              className="flex w-fit items-center gap-2 rounded-full border border-white/30 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={17} />
              Back to Events
            </Link>

            <div className="max-w-3xl pb-3 text-white">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <Heart size={14} />
                {event.eventType}
              </span>

              <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-400" />
                  {event.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-emerald-400" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[3px] text-emerald-600 dark:text-emerald-400">
                About this event
              </p>

              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                Be a part of something meaningful.
              </h2>
            </div>

            <button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-500 hover:text-emerald-600 dark:border-gray-700">
              <Share2 size={17} />
              Share Event
            </button>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#12221c] md:p-8">
            <h3 className="text-xl font-bold">Event Description</h3>

            <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-300">
              {event.description}
            </p>

            <div className="my-8 border-t border-gray-100 dark:border-gray-700" />

            <h3 className="text-xl font-bold">Why Participate?</h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

          {/* Organizer */}
          <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#12221c]">
            <h3 className="text-xl font-bold">Event Organizer</h3>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Users size={25} />
              </div>

              <div>
                <h4 className="font-bold">Community Organizer</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {event.email}
                </p>
              </div>

              <div className="ml-auto hidden items-center gap-1 text-sm font-semibold text-emerald-600 sm:flex">
                <ShieldCheck size={17} />
                Organizer
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside>
          <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-[#12221c] dark:shadow-black/20">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Join the movement
            </span>

            <h3 className="mt-3 text-2xl font-black">Your presence matters.</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Be part of this community initiative and help create a positive
              impact.
            </p>

            <div className="my-7 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10">
                  <CalendarDays size={21} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Event Date
                  </p>
                  <p className="mt-1 text-sm font-bold">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
                  <Clock size={21} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Event Time
                  </p>
                  <p className="mt-1 text-sm font-bold">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10">
                  <MapPin size={21} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-bold">{event.location}</p>
                </div>
              </div>
            </div>

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

            <Link
              href="/events/joined"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700"
            >
              <Heart size={19} />
              Join This Event
            </Link>

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

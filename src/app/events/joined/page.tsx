import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Heart } from "lucide-react";

interface JoinedEvent {
  _id: string;
  eventId: string;
  title: string;
  image: string;
  location: string;
  eventDate: string;
  eventType: string;
  joinedAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const JoinedEventsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const token = await getTokenFromServer();

  if (!token) {
    redirect("/login");
  }

  // Fetch joined events
  const response = await fetch(`${API}/joined-events`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch joined events");
  }

  const events: JoinedEvent[] = await response.json();

  return (
    <main className="min-h-screen bg-background px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-forest dark:text-lime">
            <Heart size={22} />
            <span className="font-semibold">My Activities</span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Joined Events
          </h1>

          <p className="mt-2 text-muted-foreground">
            All the events you have joined in one place.
          </p>
        </div>

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <Heart className="mx-auto mb-4 text-muted-foreground/60" size={45} />

            <h2 className="text-xl font-bold">
              No Joined Events Yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              You haven&apos;t joined any events yet.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-block rounded-lg bg-forest px-6 py-3 font-semibold text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-lime hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-xs font-bold text-forest">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="mb-4 text-xl font-bold">
                    {event.title}
                  </h2>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-forest dark:text-lime" />
                      {new Date(event.eventDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} className="text-forest dark:text-lime" />
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event.eventId}`}
                    className="mt-6 block rounded-lg bg-forest px-4 py-3 text-center font-semibold text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
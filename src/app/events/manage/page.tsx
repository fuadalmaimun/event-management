"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Pencil, Trash2, Eye, MapPin, CalendarDays, Plus } from "lucide-react";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import Image from "next/image";

export interface Event {
  _id: string;
  allEventId?: string;
  title: string;
  description: string;
  eventType: string;
  image: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState<Event | null>(null);
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/my-events/${encodeURIComponent(email)}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to load events");
        }

        const data: Event[] = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [email, isPending]);

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleUpdate = (updated: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === selected?._id ? { ...event, ...updated } : event,
      ),
    );

    closeModal();
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event._id !== id));

    closeModal();
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-9 w-56 animate-pulse rounded bg-muted" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="mb-6 h-24 animate-pulse rounded-2xl bg-muted" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <div className="h-48 animate-pulse bg-muted" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-10 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted-foreground">
          Please sign in to manage your events.
        </p>

        <Link
          href="/sign-in"
          className="mt-3 inline-block text-primary underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            YOUR DASHBOARD
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Manage Events
          </h1>

          <p className="mt-2 text-muted-foreground">
            Organize and manage your community events.
          </p>
        </div>

        {/* Total Events */}
        <div className="mb-6 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total events created</p>

          <p className="mt-1 text-3xl font-bold">{events.length}</p>
        </div>

        {/* Empty State */}
        {!events.length ? (
          <div className="rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
            <CalendarDays
              className="mx-auto mb-4 text-muted-foreground"
              size={40}
            />

            <h2 className="text-xl font-semibold">No events yet</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first event and bring people together.
            </p>

            <Link
              href="/events/create"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={17} />
              Create Event
            </Link>
          </div>
        ) : (
          /* Event Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={800}
                    height={500}
                    className="h-48 w-full rounded-t-2xl object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {event.eventType}
                  </span>
                </div>

                {/* Event Information */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-bold">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t pt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="shrink-0 text-primary" />

                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-primary"
                      />

                      <span>{event.eventDate}</span>
                    </p>
                  </div>

                  {/* View, Edit and Delete Buttons */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t pt-4">
                    {/* View */}
                    <Link
                      href={`/events/${event.allEventId || event._id}`}
                      className="flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-sm font-medium transition hover:bg-muted"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(event);
                        setModal("edit");
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-2 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(event);
                        setModal("delete");
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-destructive/30 px-2 py-2.5 text-sm font-medium text-destructive transition hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Edit Event Modal */}
      {selected && modal === "edit" && (
        <EditEvent
          event={selected}
          organizerEmail={email}
          onClose={closeModal}
          onUpdated={handleUpdate}
        />
      )}

      {/* Delete Event Modal */}
      {selected && modal === "delete" && (
        <DeleteEvent
          event={selected}
          organizerEmail={email}
          onClose={closeModal}
          onDeleted={handleDelete}
        />
      )}
    </main>
  );
}

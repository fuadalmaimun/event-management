
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  CalendarDays,
  MapPin,
  Plus,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";

export interface Event {
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

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const userEmail = session?.user?.email;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch my events
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/events?organizerEmail=${encodeURIComponent(userEmail)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to load your events.");
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [userEmail, isPending, API_URL]);

  // Open Edit popup
  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  // Open Delete popup
  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  // Update event in UI after successful edit
  const handleUpdated = (updatedEvent: Partial<Event>) => {
    if (!selectedEvent) return;

    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event._id === selectedEvent._id
          ? { ...event, ...updatedEvent }
          : event,
      ),
    );

    setEditOpen(false);
    setSelectedEvent(null);
  };

  // Remove event from UI after successful delete
  const handleDeleted = (id: string) => {
    setEvents((previousEvents) =>
      previousEvents.filter((event) => event._id !== id),
    );

    setDeleteOpen(false);
    setSelectedEvent(null);
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-forest" size={34} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <AlertCircle size={40} className="text-forest dark:text-lime" />

        <h2 className="text-2xl font-extrabold text-foreground">
          Login Required
        </h2>

        <p className="text-muted-foreground">
          Please login to manage your events.
        </p>

        <Link
          href="/login"
          className="rounded-full bg-forest px-6 py-3 font-bold text-lime dark:bg-lime dark:text-forest-deep"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[3px] text-forest dark:text-lime">
              Your Contributions
            </p>

            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Manage Events
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage the community events you have created.
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-extrabold text-lime transition hover:-translate-y-0.5 hover:bg-forest-mid dark:bg-lime dark:text-forest-deep"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </div>

        {/* Event Count */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-muted-foreground">
            Your Events:{" "}
            <span className="font-extrabold text-forest dark:text-lime">
              {events.length}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-forest/20 bg-card px-5 py-16 text-center dark:border-white/15">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest/10 text-forest dark:bg-lime/10 dark:text-lime">
              <CalendarDays size={30} />
            </div>

            <h2 className="text-xl font-extrabold text-foreground">
              No Events Created Yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You haven't created any events yet. Start making a difference
              in your community by creating your first event.
            </p>

            <Link
              href="/events/create"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-lime dark:bg-lime dark:text-forest-deep"
            >
              <Plus size={17} />
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {!error && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-3xl border border-forest/10 bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10 dark:border-white/10"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-forest/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-forest-deep">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-extrabold text-foreground">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-forest/10 pt-4 dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-forest dark:text-lime"
                      />

                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin
                        size={16}
                        className="shrink-0 text-forest dark:text-lime"
                      />

                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-forest/10 pt-4 dark:border-white/10">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex flex-1 items-center justify-center rounded-xl bg-forest px-3 py-2.5 text-sm font-bold text-lime transition hover:bg-forest-mid dark:bg-lime dark:text-forest-deep"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleEdit(event)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-forest/20 px-3 py-2.5 text-sm font-bold text-forest transition hover:bg-lime/20 dark:border-white/20 dark:text-lime"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(event)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-red-500/10 px-3 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Edit Popup Component */}
      {editOpen && selectedEvent && userEmail && (
        <EditEvent
          event={selectedEvent}
          organizerEmail={userEmail}
          onClose={() => {
            setEditOpen(false);
            setSelectedEvent(null);
          }}
          onUpdated={handleUpdated}
        />
      )}

      {/* Delete Popup Component */}
      {deleteOpen && selectedEvent && userEmail && (
        <DeleteEvent
          event={selectedEvent}
          organizerEmail={userEmail}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedEvent(null);
          }}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  );
}

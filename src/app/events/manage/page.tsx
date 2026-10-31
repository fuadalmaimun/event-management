"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  MapPin,
  CalendarDays,
  Plus,
} from "lucide-react";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";

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
  const [menu, setMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);
  const [loading, setLoading] = useState(true);
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) {
      if (!isPending) setLoading(false);
      return;
    }

    fetch(`${API}/my-events/${encodeURIComponent(email)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [email, isPending]);

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleUpdate = (updated: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) => (e._id === selected?._id ? { ...e, ...updated } : e)),
    );
    closeModal();
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e._id !== id));
    closeModal();
  };

  if (isPending || loading)
    return (
      <div className="py-32 text-center text-muted-foreground">
        Loading your events...
      </div>
    );

  if (!email)
    return (
      <div className="py-32 text-center">
        Please{" "}
        <Link href="/sign-in" className="text-primary underline">
          sign in
        </Link>{" "}
        to manage your events.
      </div>
    );

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
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
        </div>

        <div className="mb-6 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total events created</p>
          <p className="mt-1 text-3xl font-bold">{events.length}</p>
        </div>

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
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-primary-foreground"
            >
              <Plus size={17} /> Create Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group relative overflow-visible rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full rounded-t-2xl object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {event.eventType}
                  </span>
                  <button
                    onClick={() =>
                      setMenu(menu === event._id ? null : event._id)
                    }
                    aria-label="Event options"
                    className="absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow-sm transition hover:bg-background"
                  >
                    <MoreVertical size={19} />
                  </button>

                  {menu === event._id && (
                    <div className="absolute right-3 top-14 z-20 w-44 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-xl">
                      <Link
                        href={`/events/${event.allEventId || event._id}`}
                        onClick={() => setMenu(null)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                      >
                        <Eye size={16} /> View Event
                      </Link>
                      <button
                        onClick={() => {
                          setSelected(event);
                          setModal("edit");
                          setMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                      >
                        <Pencil size={16} /> Edit Event
                      </button>
                      <button
                        onClick={() => {
                          setSelected(event);
                          setModal("delete");
                          setMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 size={16} /> Delete Event
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-bold">
                    {event.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="mt-4 space-y-2 border-t pt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="shrink-0 text-primary" />{" "}
                      <span className="line-clamp-1">{event.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-primary"
                      />{" "}
                      {event.eventDate}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selected && modal === "edit" && (
        <EditEvent
          event={selected}
          organizerEmail={email}
          onClose={closeModal}
          onUpdated={handleUpdate}
        />
      )}
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

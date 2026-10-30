
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  ImagePlus,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Healthcare",
  "Food Distribution",
  "Community Support",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    image: "",
    location: "",
    eventDate: "",
  });

  // Today's date in local timezone
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login before creating an event.");
      router.push("/login");
      return;
    }

    if (!formData.eventDate || formData.eventDate <= minDate) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setLoading(true);

      const eventData = {
        ...formData,
        organizerEmail: session.user.email,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-forest" size={32} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-foreground">
          Login Required
        </h2>
        <p className="text-muted-foreground">
          Please login to create a community event.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="rounded-full bg-forest px-6 py-3 font-bold text-lime dark:bg-lime dark:text-forest-deep"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-lime dark:bg-lime dark:text-forest-deep">
            <PlusCircle size={28} />
          </div>

          <p className="mb-2 text-xs font-black uppercase tracking-[3px] text-forest dark:text-lime">
            Make A Difference
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Create An Event
          </h1>

          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Bring your community together and create positive change.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-forest/10 bg-card p-5 shadow-sm sm:p-8 dark:border-white/10"
        >
          {/* Event Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-bold text-foreground"
            >
              Event Title *
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={100}
              placeholder="e.g. Community Tree Plantation"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-bold text-foreground"
            >
              Event Description *
            </label>

            <textarea
              id="description"
              name="description"
              required
              minLength={10}
              rows={5}
              placeholder="Describe your event, its purpose and how people can participate..."
              value={formData.description}
              onChange={handleChange}
              className="w-full resize-y rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <label
              htmlFor="eventType"
              className="text-sm font-bold text-foreground"
            >
              Event Type *
            </label>

            <select
              id="eventType"
              name="eventType"
              required
              value={formData.eventType}
              onChange={handleChange}
              className="w-full rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            >
              <option value="">Select event type</option>

              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail Image URL */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <ImagePlus size={17} />
              Thumbnail Image URL *
            </label>

            <input
              id="image"
              name="image"
              type="url"
              required
              placeholder="https://example.com/event-image.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            />

            {formData.image && (
              <div className="overflow-hidden rounded-xl border border-forest/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.image}
                  alt="Event thumbnail preview"
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <MapPin size={17} />
              Event Location *
            </label>

            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="e.g. Ramna Park, Dhaka"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <label
              htmlFor="eventDate"
              className="flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <CalendarDays size={17} />
              Event Date *
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              required
              min={minDate}
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-forest/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10 dark:border-white/10"
            />

            <p className="text-xs text-muted-foreground">
              Please select a date after today.
            </p>
          </div>

          {/* Organizer Email */}
          <div className="space-y-2">
            <label
              htmlFor="organizerEmail"
              className="text-sm font-bold text-foreground"
            >
              Organizer Email
            </label>

            <input
              id="organizerEmail"
              type="email"
              value={session.user.email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-forest/10 bg-forest/5 px-4 py-3 text-sm text-muted-foreground outline-none dark:border-white/10 dark:bg-white/5"
            />

            <p className="text-xs text-muted-foreground">
              Your logged-in email will be saved with this event.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3.5 text-sm font-extrabold text-lime transition hover:-translate-y-0.5 hover:bg-forest-mid hover:shadow-lg hover:shadow-forest/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-lime dark:text-forest-deep dark:hover:bg-lime-bright"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                Create Event
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

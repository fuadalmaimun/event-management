"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Pencil, Save, X } from "lucide-react";
import type { Event } from "./page";
import { toast } from "sonner";

interface EditEventProps {
  event: Event;
  organizerEmail: string;
  onClose: () => void;
  onUpdated: (updatedEvent: Partial<Event>) => void;
}

export default function EditEvent({
  event,
  organizerEmail,
  onClose,
  onUpdated,
}: EditEventProps) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    image: event.image,
    location: event.location,
    eventDate: event.eventDate?.slice(0, 10),
  });

  const [updating, setUpdating] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const response = await fetch(`${API_URL}/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          organizerEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event.");
      }
      onUpdated(formData);
      toast.success("Event updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="my-auto w-full max-w-xl rounded-3xl border border-forest/10 bg-background p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-forest dark:text-lime">
              <Pencil size={18} />
              <span className="text-xs font-black uppercase tracking-wider">
                Update Your Contribution
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-foreground">
              Edit Event
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your event information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updating}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-forest/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Event Title
            </label>

            <input
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Description
            </label>

            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
              placeholder="Describe your event"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Event Type
            </label>

            <select
              required
              value={formData.eventType}
              onChange={(e) =>
                setFormData({ ...formData, eventType: e.target.value })
              }
              className="w-full rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
            >
              <option value="">Select event type</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Food Distribution">Food Distribution</option>
              <option value="Community Support">Community Support</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Image URL
            </label>

            <input
              required
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Location
            </label>

            <input
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
              placeholder="Enter event location"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">
              Event Date
            </label>

            <input
              required
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={formData.eventDate}
              onChange={(e) =>
                setFormData({ ...formData, eventDate: e.target.value })
              }
              className="w-full rounded-xl border border-forest/15 bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-forest dark:border-white/15"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="rounded-xl border border-forest/20 px-5 py-3 text-sm font-bold text-foreground transition hover:bg-forest/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-bold text-lime transition hover:bg-forest-mid disabled:opacity-50 dark:bg-lime dark:text-forest-deep"
            >
              {updating ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}

              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

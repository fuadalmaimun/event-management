"use client";

import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import type { Event } from "./page";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeleteEventProps {
  event: Event;
  organizerEmail: string;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeleteEvent({
  event,
  organizerEmail,
  onClose,
  onDeleted,
}: DeleteEventProps) {
  const [deleting, setDeleting] = useState(false);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Unable to verify your session. Please login again.");
      }

      const response = await fetch(`${API_URL}/events/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organizerEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event.");
      }
      onDeleted(event._id);
      onClose();
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);

      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-forest/10 bg-background p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <Trash2 size={27} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-forest/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-extrabold text-foreground">
          Delete Event?
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-bold text-foreground">{event.title}</span>? This
          action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-xl border border-forest/20 px-5 py-3 text-sm font-bold text-foreground transition hover:bg-forest/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {deleting && <Loader2 size={17} className="animate-spin" />}

            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

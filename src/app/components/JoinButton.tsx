
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Event {
  _id: string;
  title: string;
  image: string;
  location: string;
  eventDate: string;
  eventType: string;
}

const JoinButton = ({ event }: { event: Event }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = session?.user?.email;

  // Check already joined
  useEffect(() => {
    if (isPending || !email) {
      setIsJoined(false);
      return;
    }

    const checkJoined = async () => {
      try {
        const token = await getTokenFromClient();

        // Not logged in (or token unavailable) → treat as not joined
        if (!token) {
          setIsJoined(false);
          return;
        }

        const res = await fetch(
          `${API}/joined-events/${encodeURIComponent(email)}/${event._id}`,
          {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to check joined status");

        const data = await res.json();
        setIsJoined(data.isJoined);
      } catch (error) {
        console.error("Error checking joined status:", error);
      }
    };

    checkJoined();
  }, [email, event._id, isPending]);

  // Join or Leave
  const handleJoin = async () => {
    // Session check হওয়ার আগে action হবে না
    if (isPending || loading) return;

    // Login না থাকলে login page-এ পাঠাবে
    if (!email) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(
          `/events/${event._id}`
        )}`
      );
      return;
    }

    setLoading(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Unable to verify your session. Please login again.");
      }

      const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (isJoined) {
        const res = await fetch(`${API}/leave-event`, {
          method: "DELETE",
          headers: authHeaders,
          body: JSON.stringify({
            eventId: event._id,
            email,
          }),
        });

        if (!res.ok) throw new Error();

        setIsJoined(false);
        toast.success("You left the event!");
      } else {
        const res = await fetch(`${API}/join-event`, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({
            eventId: event._id,
            email,
            title: event.title,
            image: event.image,
            location: event.location,
            eventDate: event.eventDate,
            eventType: event.eventType,
          }),
        });

        if (!res.ok) throw new Error();

        setIsJoined(true);
        toast.success("Successfully joined the event!");
      }
    } catch (error) {
      console.error("Join/Leave error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={isPending || loading}
      className={`group flex w-full items-center justify-center gap-3 rounded-xl px-7 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
        isJoined
          ? "border border-red-200 bg-red-50 text-red-600 hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
          : "bg-gradient-to-r from-forest to-forest-mid text-lime hover:from-forest-mid hover:to-forest-soft dark:from-lime dark:to-lime-bright dark:text-forest-deep dark:hover:from-lime-bright dark:hover:to-lime"
      }`}
    >
      {isPending ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Checking login...
        </>
      ) : loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Please wait...
        </>
      ) : isJoined ? (
        <>
          <Heart
            size={20}
            className="transition-transform group-hover:scale-110"
          />
          Leave Event
        </>
      ) : (
        <>
          <Heart
            size={20}
            className="transition-transform group-hover:scale-125"
          />
          Join This Event
        </>
      )}
    </button>
  );
};

export default JoinButton;

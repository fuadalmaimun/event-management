"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Clock, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "auto";
type Theme = "light" | "dark";

const STORAGE_KEY = "gt-theme";
const CHANGE_EVENT = "gt-theme-change";

/** Dark between 6 PM and 6 AM (local time). */
function isNight(): boolean {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

function resolveTheme(mode: Mode): Theme {
  if (mode !== "auto") return mode;
  return isNight() ? "dark" : "light";
}

function applyTheme(mode: Mode): Theme {
  const theme = resolveTheme(mode);
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function readStoredMode(): Mode {
  if (typeof window === "undefined") return "auto";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") {
      return stored;
    }
  } catch {
    /* storage unavailable */
  }
  return "auto";
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const options: { mode: Mode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Switch to light mode", Icon: Sun },
  {
    mode: "auto",
    label: "Automatic theme, dark from 6 PM to 6 AM",
    Icon: Clock,
  },
  { mode: "dark", label: "Switch to dark mode", Icon: Moon },
];

export default function ThemeToggle() {
  // The stored mode lives in localStorage (an external store). The server
  // snapshot always returns "auto", so hydration matches the inline theme
  // script's default before the real preference is picked up.
  const mode = useSyncExternalStore<Mode>(
    subscribe,
    readStoredMode,
    () => "auto",
  );

  // Re-apply before paint — covers the dev Strict Mode remount that clears
  // the `dark` class set by the inline theme script.
  useLayoutEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // While in auto mode, keep following the clock as the page stays open.
  useEffect(() => {
    if (mode !== "auto") return;

    const sync = () => applyTheme("auto");
    const interval = window.setInterval(sync, 30_000);
    document.addEventListener("visibilitychange", sync);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [mode]);

  const select = (next: Mode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
    applyTheme(next);
  };

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-0.5 rounded-full border border-forest/12 bg-white/70 p-1 shadow-[0_1px_2px_rgba(13,42,28,0.06)] backdrop-blur-md dark:border-white/15 dark:bg-white/[0.06]"
    >
      {options.map(({ mode: option, label, Icon }) => {
        const active = option === mode;
        return (
          <button
            key={option}
            type="button"
            onClick={() => select(option)}
            aria-label={label}
            title={label}
            aria-pressed={active}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full transition-all duration-300 sm:h-8 sm:w-8",
              active
                ? "bg-forest text-lime shadow-sm dark:bg-lime dark:text-forest-deep"
                : "text-forest/55 hover:text-forest dark:text-on-forest/55 dark:hover:text-lime",
            )}
          >
            <Icon size={15} strokeWidth={2.3} />
          </button>
        );
      })}
    </div>
  );
}

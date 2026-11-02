
"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "auto";
type Theme = "light" | "dark";

const STORAGE_KEY = "gt-theme";
const CHANGE_EVENT = "gt-theme-change";

/**
 * Auto theme:
 * 6:00 AM - 5:59 PM = Light
 * 6:00 PM - 5:59 AM = Dark
 */
function resolveTheme(mode: Mode): Theme {
  if (mode !== "auto") return mode;

  const hour = new Date().getHours();

  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function applyTheme(mode: Mode): Theme {
  const theme = resolveTheme(mode);

  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );

  document.documentElement.setAttribute("data-theme", theme);

  return theme;
}

function readStoredMode(): Mode {
  if (typeof window === "undefined") return "auto";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "auto"
    ) {
      return stored;
    }
  } catch {
    // Storage unavailable
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

const options: {
  mode: "light" | "dark";
  label: string;
  Icon: typeof Sun;
}[] = [
  {
    mode: "light",
    label: "Switch to light mode",
    Icon: Sun,
  },
  {
    mode: "dark",
    label: "Switch to dark mode",
    Icon: Moon,
  },
];

export default function ThemeToggle() {
  const mode = useSyncExternalStore<Mode>(
    subscribe,
    readStoredMode,
    () => "auto"
  );

  // Apply theme before browser paint
  useLayoutEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Automatically switch theme according to local time
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

  const select = (next: "light" | "dark") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
    applyTheme(next);
  };

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-full border border-forest/12 bg-white/70 p-1 shadow-[0_1px_2px_rgba(13,42,28,0.06)] backdrop-blur-md dark:border-white/15 dark:bg-white/[0.06]"
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
              "grid h-8 w-8 place-items-center rounded-full transition-all duration-300",
              active
                ? "bg-forest text-lime shadow-sm dark:bg-lime dark:text-forest-deep"
                : "text-forest/55 hover:bg-forest/10 hover:text-forest dark:text-on-forest/55 dark:hover:bg-white/10 dark:hover:text-lime"
            )}
          >
            <Icon size={16} strokeWidth={2.3} />
          </button>
        );
      })}
    </div>
  );
}

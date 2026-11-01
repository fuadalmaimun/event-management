"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Extra class names for the wrapper (layout only — no styling needed). */
  className?: string;
  /** Stagger delay in milliseconds (e.g. 80, 160, 240 for card grids). */
  delay?: number;
}

/**
 * Fades/slides its children in when they scroll into view.
 * Toggles the `is-visible` class directly on the DOM node (no re-render).
 * Honors `prefers-reduced-motion` (content stays visible via CSS) and
 * degrades gracefully when IntersectionObserver is unavailable.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("gt-reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

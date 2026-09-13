"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export function Carousel({
  images,
  captions,
}: {
  images: string[];
  captions?: string[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Some browsers auto-snap the scroll position on load, which — combined
  // with the leading padding — can scroll the track just far enough to
  // hide the intended peek of the first card. Force it back to the start.
  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? 320) + 24; // card width + gap-6
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 sm:px-8 [scroll-padding-inline:1.5rem] sm:[scroll-padding-inline:2rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src}
            data-carousel-card
            className="flex-shrink-0 snap-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(src)}
              alt={captions?.[i] ?? ""}
              loading="lazy"
              className="h-[400px] w-auto rounded-sm object-contain"
            />
            {captions?.[i] && (
              <p className="mt-3 text-sm text-ink/60">{captions[i]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-3 sm:flex">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-ink transition-colors hover:border-accent-light hover:text-accent-light"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-ink transition-colors hover:border-accent-light hover:text-accent-light"
        >
          →
        </button>
      </div>
    </div>
  );
}

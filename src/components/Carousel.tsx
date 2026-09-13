"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export function Carousel({
  images,
  captions,
}: {
  images: string[];
  captions?: string[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  // The track's leading padding (matching CONTAINER) can make some
  // browsers auto-snap-scroll past it on load, canceling out the
  // intended peek of the first card. Force it back to the start.
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
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [scroll-padding-inline:1.5rem] sm:[scroll-padding-inline:2rem] lg:[scroll-padding-inline:3.5rem] ${CONTAINER}`}
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

      <div className={`mt-4 hidden justify-end gap-3 sm:flex ${CONTAINER}`}>
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

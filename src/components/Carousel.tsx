"use client";

import { useRef } from "react";
import { asset } from "@/lib/asset";

export function Carousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

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
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <div
            key={src}
            data-carousel-card
            className="w-72 flex-shrink-0 snap-start sm:w-96"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(src)}
              alt=""
              loading="lazy"
              className="w-full rounded-sm border border-white/10"
            />
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

"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export interface CarouselHandle {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export interface CarouselProps {
  images: string[];
  captions?: string[];
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  function Carousel({ images, captions }, ref) {
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

    useImperativeHandle(ref, () => ({
      scrollPrev: () => scrollByCard(-1),
      scrollNext: () => scrollByCard(1),
    }));

    return (
      <div
        ref={trackRef}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [scroll-padding-inline:1.5rem] sm:[scroll-padding-inline:2rem] lg:[scroll-padding-inline:3.5rem] ${CONTAINER}`}
      >
        {images.map((src, i) => (
          <div key={src} data-carousel-card className="flex-shrink-0 snap-start">
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
    );
  },
);

"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Carousel,
  type CarouselHandle,
  type CarouselScrollState,
} from "@/components/Carousel";
import { Reveal } from "@/components/Reveal";
import { CONTAINER } from "@/lib/layout";

// Renders a section heading on the same row as the carousel's
// Previous/Next buttons (with any body content below the heading),
// followed by the full-bleed image carousel itself.
export function CarouselSection({
  heading,
  body,
  images,
  captions,
}: {
  heading?: string;
  body?: ReactNode;
  images: string[];
  captions?: string[];
}) {
  const carouselRef = useRef<CarouselHandle>(null);
  // null until the carousel reports its first measurement, so the
  // buttons never flash in a wrong enabled/disabled state.
  const [scrollState, setScrollState] = useState<CarouselScrollState | null>(
    null,
  );

  return (
    <>
      <Reveal className={CONTAINER}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {heading && (
            <h3 className="font-display text-xl font-bold sm:text-2xl">
              {heading}
            </h3>
          )}
          {scrollState?.canScroll && (
            <div className="hidden gap-3 sm:flex">
              <button
                type="button"
                aria-label="Previous"
                disabled={!scrollState.canScrollPrev}
                onClick={() => carouselRef.current?.scrollPrev()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-ink transition-colors hover:border-accent-light hover:text-accent-light disabled:pointer-events-none disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                disabled={!scrollState.canScrollNext}
                onClick={() => carouselRef.current?.scrollNext()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-ink transition-colors hover:border-accent-light hover:text-accent-light disabled:pointer-events-none disabled:opacity-30"
              >
                →
              </button>
            </div>
          )}
        </div>
        {body && <div className="mt-4">{body}</div>}
      </Reveal>

      <Reveal className="mt-6">
        <Carousel
          ref={carouselRef}
          images={images}
          captions={captions}
          onScrollStateChange={setScrollState}
        />
      </Reveal>
    </>
  );
}

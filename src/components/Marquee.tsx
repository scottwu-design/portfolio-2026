import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

// A single row of logos/badges that scrolls continuously right to
// left, looping seamlessly — for an "awards" or "as seen in" strip
// rather than a manually-controlled carousel.
export function Marquee({
  heading,
  images,
}: {
  heading: string;
  images: string[];
}) {
  // Duplicated so the track can animate exactly half its width and
  // loop back to an identical starting point with no visible seam.
  const track = [...images, ...images];

  return (
    <div>
      <Reveal className={CONTAINER}>
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {heading}
        </h3>
      </Reveal>

      <div className="mt-10 overflow-hidden">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-8 motion-reduce:animate-none">
          {track.map((src, i) => (
            <div
              key={i}
              className="flex h-28 w-44 flex-shrink-0 items-center justify-center rounded-sm bg-white p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(src)}
                alt=""
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

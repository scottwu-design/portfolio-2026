import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export interface FeatureGridItem {
  icon: string;
  title: string;
  description?: string;
}

// A grid of icon + title + description cards — used for sections that
// step through several short, parallel points (insights, principles)
// instead of a stacked side-by-side narrative.
export function FeatureGrid({
  eyebrow,
  heading,
  items,
  columns,
}: {
  eyebrow?: string;
  heading: string;
  items: FeatureGridItem[];
  columns: 3 | 4;
}) {
  const colsClass =
    columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={CONTAINER}>
      <Reveal className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            {eyebrow}
          </p>
        )}
        <h3 className={`font-display text-xl font-bold sm:text-2xl ${eyebrow ? "mt-1" : ""}`}>
          {heading}
        </h3>
      </Reveal>

      <div className={`mt-10 grid grid-cols-1 gap-x-8 gap-y-10 ${colsClass}`}>
        {items.map((item, i) => (
          <Reveal key={item.title} delay={(i % columns) * 100}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(item.icon)}
              alt=""
              loading="lazy"
              className="h-14 w-14 object-contain"
            />
            <h4 className="mt-4 font-display text-lg font-bold">{item.title}</h4>
            {item.description && (
              <p className="mt-2 leading-relaxed text-ink/70">{item.description}</p>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

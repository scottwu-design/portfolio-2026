import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export interface FeatureGridItem {
  icon?: string;
  title: string;
  description?: string;
  // A white circle behind the icon, for dark icon art that would
  // otherwise blend into the navy page background.
  iconWhiteBg?: boolean;
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
            {item.icon && (
              item.iconWhiteBg ? (
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(item.icon)}
                    alt=""
                    loading="lazy"
                    className="h-[26px] w-[26px] object-contain"
                  />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(item.icon)}
                  alt=""
                  loading="lazy"
                  className="h-[42px] w-[42px] object-contain"
                />
              )
            )}
            <h4
              className={`font-display text-lg font-bold ${item.icon ? "mt-4" : ""}`}
            >
              {item.title}
            </h4>
            {item.description && (
              <p className="mt-2 leading-relaxed text-ink/70">{item.description}</p>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

import { Reveal } from "@/components/Reveal";
import { CONTAINER } from "@/lib/layout";

export interface StatGridItem {
  number: string;
  label: string;
}

// A single row of big-number stats with a small label underneath —
// used for a quick, scannable summary (e.g. contribution counts)
// instead of a stacked number/heading list.
export function StatGrid({
  heading,
  items,
}: {
  heading: string;
  items: StatGridItem[];
}) {
  return (
    <div className={CONTAINER}>
      <Reveal className="max-w-2xl">
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {heading}
        </h3>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 100}>
            <p className="font-display text-6xl font-bold sm:text-7xl">
              {item.number}
            </p>
            <p className="mt-2 text-ink/70">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

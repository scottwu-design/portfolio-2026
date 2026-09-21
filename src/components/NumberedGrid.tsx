import { Reveal } from "@/components/Reveal";
import { CONTAINER } from "@/lib/layout";

// A row of short text items side by side, each marked with a large
// index number — for a handful of parallel points (challenges,
// constraints) that would otherwise sit as a plain vertical bullet
// list with no visual separation between them.
export function NumberedGrid({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div className={CONTAINER}>
      <Reveal className="max-w-2xl">
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {heading}
        </h3>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <p className="font-display text-3xl font-bold text-accent-light">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">{item}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

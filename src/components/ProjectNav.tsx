import Link from "next/link";
import type { ProjectSummary } from "@/data/types";
import { Reveal } from "@/components/Reveal";
import { CONTAINER } from "@/lib/layout";

export function ProjectNav({
  previous,
  next,
}: {
  previous?: ProjectSummary;
  next?: ProjectSummary;
}) {
  if (!previous && !next) return null;

  return (
    <Reveal
      className={`${CONTAINER} flex items-center justify-between border-t border-white/10 py-10`}
    >
      {previous ? (
        <Link
          href={`/work/${previous.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-accent-light"
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Previous Project
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-accent-light"
        >
          Next Project
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      ) : (
        <span />
      )}
    </Reveal>
  );
}

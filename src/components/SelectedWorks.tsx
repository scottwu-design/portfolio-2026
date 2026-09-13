import Link from "next/link";
import type { ProjectSummary } from "@/data/types";
import { CONTAINER } from "@/lib/layout";
import { ProjectGrid } from "@/components/ProjectGrid";

export function SelectedWorks({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section id="selected-works" className="scroll-mt-24 py-20 sm:py-24">
      <div className={`${CONTAINER} text-center`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          Selected Works
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl font-display text-2xl font-bold sm:text-4xl">
          The best way to understand what I do is to see what I have done.
        </h2>
      </div>

      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>

      <div className={`${CONTAINER} mt-12 text-center`}>
        <Link
          href="/work"
          className="inline-block rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
        >
          View All Work
        </Link>
      </div>
    </section>
  );
}

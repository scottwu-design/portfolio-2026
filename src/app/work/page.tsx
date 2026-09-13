import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/lib/content";
import { CONTAINER } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected UX, visual, and motion design projects by Scott Wu — KaiOS, Firefox OS, HTC, and more.",
};

export default function WorkPage() {
  return (
    <div className="bg-navy py-20 text-ink sm:py-24">
      <div className={CONTAINER}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          Work
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          All Work
        </h1>
        <p className="mt-4 max-w-2xl text-ink/60">
          The best way to understand what I do is to see what I have done —
          here&apos;s the complete list of projects.
        </p>
      </div>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

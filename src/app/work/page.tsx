import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected UX, visual, and motion design projects by Scott Wu — KaiOS, Firefox OS, HTC, and more.",
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Selected works
      </p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold text-neutral-900 sm:text-4xl">
        The best way to understand what I do is to see what I have done.
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Here&apos;s a list of selected projects.
      </p>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/CaseStudySection";
import { Hero } from "@/components/Hero";
import { SectionRenderer } from "@/components/SectionRenderer";
import { asset } from "@/lib/asset";
import {
  getAllProjectSlugs,
  getProjectContent,
  getProjectSummary,
} from "@/lib/content";

// Staged rollout of the Option D redesign for case study pages: trying
// it out on Hoy TV App first before applying it to every project.
// Remove this once every slug has moved over to CaseStudySection.
const OPTION_D_SLUGS = new Set(["hoy-tv-app"]);

// Some projects have a dedicated banner image (usually the first
// section's sole image in the original content) that reads better as
// the Hero's background than the grid thumbnail. Falls back to the
// project thumbnail when a slug has no override.
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "hoy-tv-app": "/images/1bd16d78eac35a36.png",
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const summary = getProjectSummary(slug);
  if (!summary) return {};
  return {
    title: summary.title,
    description: `${summary.title} — ${summary.meta} (${summary.year}).`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const summary = getProjectSummary(slug);
  const content = getProjectContent(slug);

  if (!summary || !content) {
    notFound();
  }

  if (OPTION_D_SLUGS.has(slug)) {
    return (
      <article className="bg-navy text-ink">
        <Hero
          backLink={{ label: "← All Work", href: "/work" }}
          eyebrow={summary.meta}
          title={summary.title}
          subtitle={summary.year}
          background={{
            type: "image",
            src: asset(HERO_IMAGE_OVERRIDES[slug] ?? summary.thumbnail),
          }}
        />

        <div className="py-12">
          {content.sections.map((section, idx) => (
            <CaseStudySection key={idx} section={section} />
          ))}
        </div>
      </article>
    );
  }

  return (
    <article>
      <header className="border-b border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/work"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            &larr; All work
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-neutral-900 sm:text-4xl">
            {summary.title}
          </h1>
          <p className="mt-3 text-neutral-500">
            {summary.meta} · {summary.year}
          </p>
        </div>
      </header>

      <div className="py-12">
        {content.sections.map((section, idx) => (
          <SectionRenderer key={idx} section={section} />
        ))}
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/CaseStudySection";
import { Hero } from "@/components/Hero";
import { ProjectNav } from "@/components/ProjectNav";
import { SectionRenderer } from "@/components/SectionRenderer";
import { asset } from "@/lib/asset";
import {
  getAllProjectSlugs,
  getProjectContent,
  getProjectSummary,
  projects,
} from "@/lib/content";

// Staged rollout of the Option D redesign for case study pages: trying
// it out on Hoy TV App first before applying it to every project.
// Remove this once every slug has moved over to CaseStudySection.
const OPTION_D_SLUGS = new Set([
  "hoy-tv-app",
  "kaios-st-lock-screen",
  "kaios-smart-touch",
  "kaios-smart-feature-phone",
  "kaios-smart-tv-launcher",
  "kaios-smart-watch",
  "yadea-e-scooter",
  "htc-sense-ui",
  "home-automation",
  "h5os-smart-feature-phone",
  "fxos-smart-tv",
  "fxos-smartphone",
  "fxos-smart-feature-phone",
  "htc-lifeme",
  "htc-multi-windows",
]);

// Some projects have a dedicated banner image (usually the first
// section's sole image in the original content) that reads better as
// the Hero's background than the grid thumbnail. Falls back to the
// project thumbnail when a slug has no override.
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "hoy-tv-app": "/images/1bd16d78eac35a36.png",
  "kaios-st-lock-screen": "/images/f6219556491234a1.png",
  "kaios-smart-touch": "/images/d56c2cb34a04914c.png",
  "kaios-smart-feature-phone": "/images/11ff258dac663aae.png",
  "kaios-smart-tv-launcher": "/images/6372d8349d326737.png",
  "kaios-smart-watch": "/images/4716d504dd48b52f.png",
  "yadea-e-scooter": "/images/f3cc4e2f6f56eddc.png",
  "htc-sense-ui": "/images/0f15d4f34e573773.jpg",
  "home-automation": "/images/ac84798518a9207f.png",
  "h5os-smart-feature-phone": "/images/ffcecba0151e433f.png",
  "fxos-smart-tv": "/images/e406c6cfb100ac2c.jpg",
  "fxos-smartphone": "/images/571b4e279eaa573d.jpg",
  "fxos-smart-feature-phone": "/images/9b01b4d1d7f8aa64.jpg",
  "htc-lifeme": "/images/59d78f217fdd7ad4.jpg",
  "htc-multi-windows": "/images/24337a2e5c0ae1c4.jpg",
};

// Some projects read better with a descriptive lead sentence as the
// Hero's headline (with the project name demoted to a small eyebrow
// label above it) instead of the project title itself. Falls back to
// the project title/no eyebrow when a slug has no override.
const HERO_TITLE_OVERRIDES: Record<string, string> = {
  "kaios-st-lock-screen":
    "How I led the design sprint to redesign the unlock screen experience on KaiOS SmartTouch phone",
};
const HERO_EYEBROW_OVERRIDES: Record<string, string> = {
  "kaios-st-lock-screen": "CASE STUDY",
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
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const previous =
      projectIndex > 0 ? projects[projectIndex - 1] : undefined;
    const next =
      projectIndex >= 0 && projectIndex < projects.length - 1
        ? projects[projectIndex + 1]
        : undefined;

    return (
      <article className="bg-navy text-ink">
        <Hero
          eyebrow={HERO_EYEBROW_OVERRIDES[slug]}
          title={HERO_TITLE_OVERRIDES[slug] ?? summary.title}
          background={{
            type: "image",
            src: asset(HERO_IMAGE_OVERRIDES[slug] ?? summary.thumbnail),
          }}
          size="tall"
        />

        <div className="py-12">
          {content.sections.map((section, idx) => (
            <CaseStudySection key={idx} section={section} slug={slug} />
          ))}
        </div>

        <ProjectNav previous={previous} next={next} />
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/SectionRenderer";
import {
  getAllProjectSlugs,
  getProjectContent,
  getProjectSummary,
} from "@/lib/content";

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

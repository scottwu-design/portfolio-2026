import Link from "next/link";
import type { ProjectSummary } from "@/data/types";
import { asset } from "@/lib/asset";

export function WorksMosaic({ projects }: { projects: ProjectSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative block overflow-hidden bg-navy"
        >
          <div className="aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(project.thumbnail)}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="text-sm font-medium text-ink group-hover:text-accent-light">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-ink/50">
              {project.meta} · {project.year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

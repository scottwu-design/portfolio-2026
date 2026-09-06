import Link from "next/link";
import type { ProjectSummary } from "@/data/types";
import { asset } from "@/lib/asset";

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group block"
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(project.thumbnail)}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:underline">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {project.meta} · {project.year}
          </p>
        </Link>
      ))}
    </div>
  );
}

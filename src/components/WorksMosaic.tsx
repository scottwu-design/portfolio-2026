import Link from "next/link";
import type { ProjectSummary } from "@/data/types";
import { asset } from "@/lib/asset";

export function WorksMosaic({ projects }: { projects: ProjectSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 bg-navy px-6 sm:grid-cols-2 sm:gap-8 sm:px-8">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative block aspect-[4/3] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(project.thumbnail)}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/0 p-8 text-center opacity-0 transition-all duration-300 group-hover:bg-navy/70 group-hover:opacity-100">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {project.meta} · {project.year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

import type { ContentNode, Section } from "@/data/types";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

function ImageGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(images[0])}
          alt=""
          className="w-full rounded-sm border border-white/10"
          loading="lazy"
        />
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {images.map((src, i) => (
        <Reveal key={src} delay={(i % 3) * 100}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(src)}
            alt=""
            className="w-full rounded-sm border border-white/10"
            loading="lazy"
          />
        </Reveal>
      ))}
    </div>
  );
}

function ContentNodes({ nodes }: { nodes: ContentNode[] }) {
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (node.type === "heading") {
      const next = nodes[i + 1];
      if (next && next.type === "heading") {
        elements.push(
          <Reveal key={key++} className="mt-10 max-w-2xl first:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              {node.text}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">
              {next.text}
            </h3>
          </Reveal>,
        );
        i += 2;
        continue;
      }
      elements.push(
        <Reveal key={key++} className="mt-10 max-w-2xl first:mt-0">
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            {node.text}
          </h3>
        </Reveal>,
      );
      i += 1;
      continue;
    }

    if (node.type === "list") {
      elements.push(
        <Reveal key={key++} className="mt-4 max-w-2xl">
          <ul className="list-disc space-y-1.5 pl-5 text-ink/70">
            {node.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>,
      );
      i += 1;
      continue;
    }

    elements.push(
      <Reveal key={key++} className="mt-4 max-w-2xl">
        <p className="leading-relaxed text-ink/70">{node.text}</p>
      </Reveal>,
    );
    i += 1;
  }

  return <>{elements}</>;
}

function RoleTeamDuration({
  role,
  team,
  duration,
}: {
  role: string[];
  team: string[];
  duration: string[];
}) {
  const cols = [
    { label: "Role", items: role },
    { label: "Team", items: team },
    { label: "Duration", items: duration },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 border-y border-white/10 py-8 sm:grid-cols-3">
      {cols.map((col, i) => (
        <Reveal key={col.label} delay={i * 100}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            {col.label}
          </p>
          <ul className="mt-2 space-y-1 text-ink/80">
            {col.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function CaseStudySection({ section }: { section: Section }) {
  if (section.kind === "roleTeamDuration") {
    return (
      <div className={`${CONTAINER} py-6`}>
        <RoleTeamDuration
          role={section.role}
          team={section.team}
          duration={section.duration}
        />
      </div>
    );
  }

  return (
    <div className={`${CONTAINER} py-6`}>
      <ContentNodes nodes={section.nodes} />
      {section.images.length > 0 && (
        <div className="mt-6">
          <ImageGallery images={section.images} />
        </div>
      )}
    </div>
  );
}

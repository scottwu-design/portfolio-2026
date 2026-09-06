import type { ContentNode, Section } from "@/data/types";
import { asset } from "@/lib/asset";

function ImageGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(images[0])}
        alt=""
        className="w-full rounded-lg border border-black/5"
        loading="lazy"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={asset(src)}
          alt=""
          className="w-full rounded-lg border border-black/5"
          loading="lazy"
        />
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
          <div key={key++} className="mt-10 first:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              {node.text}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
              {next.text}
            </h3>
          </div>
        );
        i += 2;
        continue;
      }
      elements.push(
        <h3
          key={key++}
          className="mt-10 text-xl font-semibold text-neutral-900 first:mt-0 sm:text-2xl"
        >
          {node.text}
        </h3>
      );
      i += 1;
      continue;
    }

    if (node.type === "list") {
      elements.push(
        <ul key={key++} className="mt-4 list-disc space-y-1.5 pl-5 text-neutral-700">
          {node.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      i += 1;
      continue;
    }

    elements.push(
      <p key={key++} className="mt-4 leading-relaxed text-neutral-700">
        {node.text}
      </p>
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
    <div className="grid grid-cols-1 gap-8 border-y border-black/10 py-8 sm:grid-cols-3">
      {cols.map((col) => (
        <div key={col.label}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
            {col.label}
          </p>
          <ul className="mt-2 space-y-1 text-neutral-800">
            {col.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SectionRenderer({ section }: { section: Section }) {
  if (section.kind === "roleTeamDuration") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-6">
        <RoleTeamDuration
          role={section.role}
          team={section.team}
          duration={section.duration}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      <ContentNodes nodes={section.nodes} />
      {section.images.length > 0 && (
        <div className="mt-6">
          <ImageGallery images={section.images} />
        </div>
      )}
    </div>
  );
}

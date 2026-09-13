import type { ContentNode, Section } from "@/data/types";
import { Carousel } from "@/components/Carousel";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

// Diagrams/screenshots that ship as transparent PNGs and need a white
// card behind them instead of blending into the navy page background.
const WHITE_BG_IMAGES = new Set([
  "/images/2e9404c58c6bcc87.png", // What problems did we identify?
  "/images/434e1eacbaf01c09.png", // Ideations
  "/images/1a0ac749f2d28cf3.png", // User flow
  "/images/90684e0ec494fe81.png", // Award-winning
]);

function SingleImage({ src }: { src: string }) {
  if (WHITE_BG_IMAGES.has(src)) {
    return (
      <div className="rounded-sm bg-white p-6 sm:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(src)} alt="" loading="lazy" className="w-full" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt=""
      loading="lazy"
      className="w-full rounded-sm border border-white/10"
    />
  );
}

function ImageGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Reveal>
        <SingleImage src={images[0]} />
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {images.map((src, i) => (
        <Reveal key={src} delay={(i % 3) * 100}>
          <SingleImage src={src} />
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

interface HeadingGroup {
  heading: string;
  paras: string[];
}

// Splits nodes like [heading, para, para, heading, para, ...] into one
// group per heading, collecting the paragraphs that follow it.
function groupByHeading(nodes: ContentNode[]): HeadingGroup[] {
  const groups: HeadingGroup[] = [];
  for (const node of nodes) {
    if (node.type === "heading") {
      groups.push({ heading: node.text, paras: [] });
    } else if (node.type === "para" && groups.length > 0) {
      groups[groups.length - 1].paras.push(node.text);
    }
  }
  return groups;
}

// The WIREFRAME section pairs each sub-heading (e.g. "Mobile App",
// "Website") with its own screenshot, side by side, instead of the
// default stacked text-then-gallery layout.
function WireframeSection({
  title,
  groups,
  images,
}: {
  title: string;
  groups: HeadingGroup[];
  images: string[];
}) {
  return (
    <>
      <Reveal className="max-w-2xl first:mt-0">
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {title}
        </h3>
      </Reveal>

      <div className="mt-6 space-y-12">
        {groups.map((group, i) => (
          <Reveal
            key={group.heading}
            delay={i * 100}
            className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2"
          >
            <div>
              <h4 className="font-display text-lg font-bold">
                {group.heading}
              </h4>
              {group.paras.map((p, pi) => (
                <p key={pi} className="mt-3 leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}
            </div>
            {images[i] && <SingleImage src={images[i]} />}
          </Reveal>
        ))}
      </div>
    </>
  );
}

// Finds where the LAST heading group starts (a heading not itself the
// second line of a preceding eyebrow+heading pair), so that trailing
// content can be split off and paired with a single image while
// earlier content stays full-width.
function findLastGroupStart(nodes: ContentNode[]): number | null {
  let lastStart: number | null = null;
  let i = 0;
  while (i < nodes.length) {
    if (nodes[i].type === "heading") {
      lastStart = i;
      i += nodes[i + 1]?.type === "heading" ? 2 : 1;
    } else {
      i += 1;
    }
  }
  return lastStart;
}

// Renders heading/para/list nodes as plain elements (no individual
// Reveal wrapping) for use inside a single surrounding Reveal, e.g. a
// side-by-side text+image pair.
function renderPlainNodes(nodes: ContentNode[]): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (node.type === "heading") {
      const next = nodes[i + 1];
      if (next && next.type === "heading") {
        elements.push(
          <div key={key++} className="mt-4 first:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              {node.text}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">
              {next.text}
            </h3>
          </div>,
        );
        i += 2;
        continue;
      }
      elements.push(
        <h3
          key={key++}
          className="mt-4 font-display text-xl font-bold first:mt-0 sm:text-2xl"
        >
          {node.text}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (node.type === "list") {
      elements.push(
        <ul key={key++} className="mt-4 list-disc space-y-1.5 pl-5 text-ink/70">
          {node.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>,
      );
      i += 1;
      continue;
    }

    elements.push(
      <p key={key++} className="mt-4 leading-relaxed text-ink/70">
        {node.text}
      </p>,
    );
    i += 1;
  }

  return elements;
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

  // The WIREFRAME section pairs "Mobile App" / "Website" with their own
  // screenshot, side by side, instead of the default layout.
  const firstNode = section.nodes[0];
  if (firstNode?.type === "heading" && firstNode.text === "WIREFRAME") {
    const groups = groupByHeading(section.nodes.slice(1));
    return (
      <div className={`${CONTAINER} py-6`}>
        <WireframeSection
          title={firstNode.text}
          groups={groups}
          images={section.images}
        />
      </div>
    );
  }

  // The DESIGN SYSTEM section has several images (components, screen
  // captures, etc.) — show them as a horizontally scrollable carousel
  // instead of a static grid.
  const hasDesignSystemHeading = section.nodes.some(
    (n) => n.type === "heading" && n.text === "DESIGN SYSTEM",
  );
  if (hasDesignSystemHeading && section.images.length > 0) {
    return (
      <div className={`${CONTAINER} py-6`}>
        <ContentNodes nodes={section.nodes} />
        <Reveal className="mt-6">
          <Carousel images={section.images} />
        </Reveal>
      </div>
    );
  }

  // When a section's trailing list has exactly one item per image (e.g.
  // a screen-by-screen breakdown like "Home / Live TV / Details..."),
  // treat each item as that image's caption instead of a separate list.
  const lastNode = section.nodes[section.nodes.length - 1];
  const captions =
    lastNode?.type === "list" &&
    section.images.length > 0 &&
    lastNode.items.length === section.images.length
      ? lastNode.items
      : null;

  // A section with exactly one image pairs its trailing heading group
  // (e.g. "What problems did we identify?", "Ideations", "Award-winning")
  // side by side with that image; any earlier content stays full-width.
  if (!captions && section.images.length === 1) {
    const splitIndex = findLastGroupStart(section.nodes);
    if (splitIndex !== null) {
      const before = section.nodes.slice(0, splitIndex);
      const group = section.nodes.slice(splitIndex);
      return (
        <div className={`${CONTAINER} py-6`}>
          {before.length > 0 && <ContentNodes nodes={before} />}
          <Reveal className={before.length > 0 ? "mt-10" : undefined}>
            <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
              <div>{renderPlainNodes(group)}</div>
              <SingleImage src={section.images[0]} />
            </div>
          </Reveal>
        </div>
      );
    }
  }

  return (
    <div className={`${CONTAINER} py-6`}>
      <ContentNodes
        nodes={captions ? section.nodes.slice(0, -1) : section.nodes}
      />
      {section.images.length > 0 && (
        <div className="mt-6">
          {captions ? (
            <Reveal>
              <Carousel images={section.images} captions={captions} />
            </Reveal>
          ) : (
            <ImageGallery images={section.images} />
          )}
        </div>
      )}
    </div>
  );
}

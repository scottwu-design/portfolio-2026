import type { ContentNode, Section } from "@/data/types";
import { CarouselSection } from "@/components/CarouselSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/FeatureGrid";
import { Marquee } from "@/components/Marquee";
import { NumberedGrid } from "@/components/NumberedGrid";
import { Reveal } from "@/components/Reveal";
import { StatGrid, type StatGridItem } from "@/components/StatGrid";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

// Diagrams/screenshots that ship as transparent PNGs and need a white
// card behind them instead of blending into the navy page background.
// Keyed by slug first: the same uploaded asset (content hash) can be
// reused across different projects for unrelated images, so a plain
// image-path lookup risks applying the wrong page's treatment to a
// coincidentally-shared file.
const WHITE_BG_IMAGES: Record<string, Set<string>> = {
  "hoy-tv-app": new Set([
    "/images/2e9404c58c6bcc87.png", // What problems did we identify?
    "/images/434e1eacbaf01c09.png", // Ideations
    "/images/1a0ac749f2d28cf3.png", // User flow
    "/images/90684e0ec494fe81.png", // Award-winning
  ]),
  "kaios-st-lock-screen": new Set([
    "/images/a7b3d716305b7402.png", // Crazy 8s
    "/images/b38b02ba567701be.png", // Narrowing down to the best solutions
    "/images/2ff6223656850ef3.png", // One tap to unlock solution
    "/images/0e3021817d93b234.png", // User testing with actual device (solution 1)
    "/images/b4a66501ddc69673.png", // Swipe up to unlock solution
    "/images/039a16af99efead8.png", // User testing with actual device (solution 2)
    "/images/d60eb46b70e16ff7.png", // What I learned & next steps
    "/images/c3ec51e29fe8a047.png", // How do our users unlock the device on the lock screen?
    "/images/c08f1d6f3d6b2b28.png", // What problems did we identify?
    "/images/a1b65956640eb7b1.png", // Rewriting problems as outcomes and dot voting
  ]),
  "kaios-smart-touch": new Set([
    "/images/ec5c19ba272b1f0f.png", // What's Smart Touch?
    "/images/5331824ccb9a645a.png", // Product positioning map
    "/images/5ecc02c0a560dc4a.png", // FOB pricing
    "/images/e040f63eb9474442.png", // What's the product proposition?
    "/images/24cb665b1d7b3c79.png", // Who are the target users?
    "/images/fae0f72a4dd7cc45.png", // UX design
    "/images/b9880f9eaae81372.png", // Infogation bar
    "/images/baaecf9a66d5d2a7.png", // Cards
    "/images/2eca6dea05b3de7b.png", // The navigation of screens flow
    "/images/8caaeaa0436f3354.png", // Visual characteristics
    "/images/a1eea2f6221b8ef9.gif", // Meet KaiOS apps
    "/images/64ab51ce03c440d6.png", // KaiStore
    "/images/c5fdadf33da3c8b4.png", // Internet browser
    "/images/9535f899e933d964.png", // First time use
    "/images/3f59a41d0b08fa3e.png", // Wallpaper design
  ]),
  "kaios-smart-feature-phone": new Set([
    "/images/968861c0acda55d0.png", // What's our proposition?
    "/images/e139aad8cbd4058c.png", // Type
    "/images/1030d8b23fa8be78.png", // Iconography
    "/images/d2f5238b288efef1.png", // Option of Apps Menu
    "/images/90d3347148fc3f3e.png", // Typing Guide
    "/images/0f8b28316d83b5e8.gif", // Make In-App Payment
  ]),
  "kaios-smart-tv-launcher": new Set([
    "/images/cbfd6032a2633305.png", // Launcher architecture
    "/images/0c6eff90b5bbde1e.gif", // Visual design direction
    "/images/73fcfea03dec8faf.gif", // Simulator
    "/images/0d38cf916fffe6fe.gif", // Board
  ]),
};

// Headings whose section is just a title plus a handful of extra
// screenshots with no per-image text — rendered as a full-bleed
// carousel instead of a small static grid.
const CAROUSEL_HEADINGS = new Set([
  "MEET OTHER APPS AT A GLANCE",
  "VISUAL REFRESH",
]);

// Headings whose section is a row of logos/badges (awards, press,
// clients) — rendered as a continuously auto-scrolling marquee
// instead of a static grid or a manually-controlled carousel.
const MARQUEE_HEADINGS = new Set(["AWARDS"]);

// Headings whose section is a short text-only list — laid out as
// side-by-side numbered columns instead of a plain stacked bullet
// list.
const NUMBERED_GRID_HEADINGS = new Set(["CHALLENGES", "GOAL"]);

// Sections whose static screenshot/gif reads much better as the
// actual motion/prototype recording — keyed by slug then by the
// group's HEADING text (not the image path): the same uploaded asset
// gets reused for unrelated images even within one page (e.g. one gif
// used both as a UI Component thumbnail and as The Internet Enabler's
// video-teaser image on kaios-smart-feature-phone), so only the
// heading reliably identifies a single occurrence.
// autoplay requires muted in every browser, and loop repeats playback
// continuously — matching the looping gif/screen-recording feel these
// videos replaced.
const VIDEO_PLAYER_PARAMS = "autoplay=1&loop=1&muted=1";

const VIDEO_OVERRIDES: Record<string, Record<string, string>> = {
  "kaios-smart-touch": {
    "THE ADVANTAGE OF INFOGATION BAR":
      `https://player.vimeo.com/video/718534971?h=d1ca59d48b&${VIDEO_PLAYER_PARAMS}`,
    "ANIMATION OF LAUNCHER NAVIGATION":
      `https://player.vimeo.com/video/715438836?h=0328e68ef8&${VIDEO_PLAYER_PARAMS}`,
    "ONBOARDING TUTORIAL":
      `https://player.vimeo.com/video/718986407?h=3fc668e351&${VIDEO_PLAYER_PARAMS}`,
  },
  "kaios-smart-feature-phone": {
    "THE INTERNET ENABLER":
      "https://player.vimeo.com/video/711522349?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    CARDS: `https://player.vimeo.com/video/824962055?h=f584ea1789&${VIDEO_PLAYER_PARAMS}`,
  },
  "kaios-smart-tv-launcher": {
    // This section has no heading to key by (just a lone caption), so
    // the image path itself is the key here.
    "/images/c3b7c493750fdf31.png":
      `https://player.vimeo.com/video/713591199?h=f9ce1fabef&${VIDEO_PLAYER_PARAMS}`,
  },
};

function SingleImage({
  src,
  slug,
  videoKey,
}: {
  src: string;
  slug: string;
  videoKey?: string;
}) {
  const videoSrc = VIDEO_OVERRIDES[slug]?.[videoKey ?? ""];
  if (videoSrc) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-sm">
        <iframe
          src={videoSrc}
          title="Vimeo video"
          className="h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (WHITE_BG_IMAGES[slug]?.has(src)) {
    return (
      <div className="rounded-sm bg-white p-3 sm:p-5">
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
      className="w-full rounded-sm"
    />
  );
}

function ImageGallery({ images, slug }: { images: string[]; slug: string }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Reveal>
        <SingleImage src={images[0]} slug={slug} />
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {images.map((src, i) => (
        <Reveal key={src} delay={(i % 3) * 100}>
          <SingleImage src={src} slug={slug} />
        </Reveal>
      ))}
    </div>
  );
}

// Renders paragraph text, turning any [label](url) markdown-style
// links into real external links (opened in a new tab) — the source
// data is otherwise plain strings, so this is the one place inline
// links get parsed out.
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderTextWithLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    parts.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-ink/30 underline-offset-2 transition-colors hover:text-accent-light hover:decoration-accent-light"
      >
        {match[1]}
      </a>,
    );
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts;
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
        <p className="leading-relaxed text-ink/70">
          {renderTextWithLinks(node.text)}
        </p>
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
  slug,
}: {
  title: string;
  groups: HeadingGroup[];
  images: string[];
  slug: string;
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
                  {renderTextWithLinks(p)}
                </p>
              ))}
            </div>
            {images[i] && (
              <SingleImage src={images[i]} slug={slug} videoKey={group.heading} />
            )}
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

// Splits nodes into one group per heading (each heading's eyebrow
// partner, if any, stays in the same group), preserving any
// leading content in the first group. Used for long case-study
// sections that step through a series of heading + image beats.
function splitIntoGroups(nodes: ContentNode[]): ContentNode[][] {
  const groups: ContentNode[][] = [];
  let i = 0;

  let lead: ContentNode[] = [];
  if (nodes[0]?.type !== "heading") {
    while (i < nodes.length && nodes[i].type !== "heading") i += 1;
    lead = nodes.slice(0, i);
  }

  while (i < nodes.length) {
    const start = i;
    i += nodes[i + 1]?.type === "heading" ? 2 : 1;
    while (i < nodes.length && nodes[i].type !== "heading") i += 1;
    groups.push(nodes.slice(start, i));
  }

  if (lead.length > 0) {
    if (groups.length > 0) groups[0] = [...lead, ...groups[0]];
    else groups.push(lead);
  }

  return groups;
}

// Pairs each heading group with its own image, side by side, stacked
// down the page — for sections that step through a beat-by-beat
// narrative with one screenshot per beat.
function GroupedGallery({
  groups,
  images,
  slug,
}: {
  groups: ContentNode[][];
  images: string[];
  slug: string;
}) {
  return (
    <div className="space-y-16">
      {groups.map((group, i) => {
        const image = images[i];
        // When a group starts with an eyebrow+heading pair (two
        // headings back to back), the second one is the actual
        // visible title — that's what VIDEO_OVERRIDES is keyed by.
        const headingNode =
          group[0]?.type === "heading" && group[1]?.type === "heading"
            ? group[1]
            : group.find((n) => n.type === "heading");
        const heading = headingNode?.type === "heading" ? headingNode.text : undefined;
        const hasVideo = Boolean(heading && VIDEO_OVERRIDES[slug]?.[heading]);
        const showMedia = Boolean(image) || hasVideo;
        return (
          <Reveal
            key={i}
            className={
              showMedia
                ? "grid grid-cols-1 items-center gap-8 sm:grid-cols-2"
                : "max-w-2xl"
            }
          >
            <div>{renderPlainNodes(group)}</div>
            {showMedia && (
              <SingleImage src={image ?? ""} slug={slug} videoKey={heading} />
            )}
          </Reveal>
        );
      })}
    </div>
  );
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
        {renderTextWithLinks(node.text)}
      </p>,
    );
    i += 1;
  }

  return elements;
}

// Parses [title, description, title, description, ...] pairs into
// FeatureGrid items, one per image in order. The description node is
// read regardless of whether it's typed "heading" or "para" in the
// source data — some items were scraped with a styled second line
// that functions as body copy despite the heading type.
function parseFeatureItems(
  nodes: ContentNode[],
  images: string[],
): FeatureGridItem[] {
  const items: FeatureGridItem[] = [];
  for (let i = 0; i < nodes.length; i += 2) {
    const titleNode = nodes[i];
    const title = titleNode && titleNode.type !== "list" ? titleNode.text : "";
    const descNode = nodes[i + 1];
    const description =
      descNode && descNode.type !== "list" ? descNode.text : undefined;
    items.push({ title, description, icon: images[items.length] });
  }
  return items;
}

// Parses [number, label, number, label, ...] pairs into StatGrid
// items — the reverse order of parseFeatureItems, since these were
// scraped as the number's own paragraph followed by its heading label.
function parseStatItems(nodes: ContentNode[]): StatGridItem[] {
  const items: StatGridItem[] = [];
  for (let i = 0; i < nodes.length; i += 2) {
    const numberNode = nodes[i];
    const number = numberNode && numberNode.type !== "list" ? numberNode.text : "";
    const labelNode = nodes[i + 1];
    const label = labelNode && labelNode.type !== "list" ? labelNode.text : "";
    items.push({ number, label });
  }
  return items;
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

export function CaseStudySection({
  section,
  slug,
}: {
  section: Section;
  slug: string;
}) {
  if (section.kind === "roleTeamDuration") {
    return (
      <div className={`${CONTAINER} py-12`}>
        <RoleTeamDuration
          role={section.role}
          team={section.team}
          duration={section.duration}
        />
      </div>
    );
  }

  // A lone caption + single image with no heading (e.g. "Animation of
  // the spatial navigation model...") — when that image has a video
  // override, swap in the video and move the caption below it instead
  // of above.
  if (
    section.nodes.length === 1 &&
    section.nodes[0].type === "para" &&
    section.images.length === 1 &&
    VIDEO_OVERRIDES[slug]?.[section.images[0]]
  ) {
    const captionNode = section.nodes[0];
    const image = section.images[0];
    return (
      <div className={`${CONTAINER} py-12`}>
        <Reveal>
          <SingleImage src={image} slug={slug} videoKey={image} />
          <p className="mt-4 leading-relaxed text-ink/70">
            {renderTextWithLinks(captionNode.text)}
          </p>
        </Reveal>
      </div>
    );
  }

  const firstNode = section.nodes[0];
  if (firstNode?.type === "heading" && NUMBERED_GRID_HEADINGS.has(firstNode.text)) {
    const listNode = section.nodes.find((n) => n.type === "list");
    if (listNode?.type === "list") {
      return (
        <div className="py-12">
          <NumberedGrid heading={firstNode.text} items={listNode.items} />
        </div>
      );
    }
  }

  // The WIREFRAME section pairs "Mobile App" / "Website" with their own
  // screenshot, side by side, instead of the default layout.
  if (firstNode?.type === "heading" && firstNode.text === "WIREFRAME") {
    const groups = groupByHeading(section.nodes.slice(1));
    return (
      <div className={`${CONTAINER} py-12`}>
        <WireframeSection
          title={firstNode.text}
          groups={groups}
          images={section.images}
          slug={slug}
        />
      </div>
    );
  }

  // EMERGING MARKET USERS BEHAVIOR INSIGHTS: six parallel insights,
  // each with its own icon — laid out as a 3-column feature grid
  // instead of a stacked side-by-side narrative.
  if (
    firstNode?.type === "heading" &&
    firstNode.text === "EMERGING MARKET USERS BEHAVIOR INSIGHTS"
  ) {
    const items = parseFeatureItems(section.nodes.slice(1), section.images);
    return (
      <div className="py-12">
        <FeatureGrid heading={firstNode.text} items={items} columns={3} />
      </div>
    );
  }

  // DESIGN PRINCIPLE: a handful of parallel principles, each with its
  // own icon — laid out as a single-row feature grid. Some pages give
  // it its own subheading line (2 leading nodes before the items
  // start), others don't (1 leading node) — infer which from how many
  // nodes are left over once every image has claimed a title+desc
  // pair.
  if (firstNode?.type === "heading" && firstNode.text === "DESIGN PRINCIPLE") {
    const leadCount = section.nodes.length - 2 * section.images.length;
    const subheadingNode = leadCount >= 2 ? section.nodes[1] : undefined;
    const subheading =
      subheadingNode?.type === "heading" ? subheadingNode.text : "";
    const items = parseFeatureItems(
      section.nodes.slice(Math.max(leadCount, 1)),
      section.images,
    );
    return (
      <div className="py-12">
        <FeatureGrid
          eyebrow={subheading ? firstNode.text : undefined}
          heading={subheading || firstNode.text}
          items={items}
          columns={items.length === 3 ? 3 : 4}
        />
      </div>
    );
  }

  // INDIVIDUAL CONTRIBUTIONS TO THIS PROJECT: a quick number/label
  // summary — laid out as a single row of big-number stats.
  if (
    firstNode?.type === "heading" &&
    firstNode.text === "INDIVIDUAL CONTRIBUTIONS TO THIS PROJECT"
  ) {
    const items = parseStatItems(section.nodes.slice(1));
    return (
      <div className="py-12">
        <StatGrid heading={firstNode.text} items={items} />
      </div>
    );
  }

  // A handful of sections are just a heading plus a handful of extra
  // screenshots with no per-image text — those read better as a
  // full-bleed carousel than a small static grid.
  if (
    firstNode?.type === "heading" &&
    CAROUSEL_HEADINGS.has(firstNode.text) &&
    section.nodes.length === 1 &&
    section.images.length > 1
  ) {
    return (
      <div className="py-12">
        <CarouselSection heading={firstNode.text} images={section.images} />
      </div>
    );
  }

  // AWARDS-style sections: a row of logos/badges that scrolls
  // continuously instead of sitting in a static grid.
  if (
    firstNode?.type === "heading" &&
    MARQUEE_HEADINGS.has(firstNode.text) &&
    section.nodes.length === 1 &&
    section.images.length > 1
  ) {
    return (
      <div className="py-12">
        <Marquee heading={firstNode.text} images={section.images} />
      </div>
    );
  }

  // The APPLY VISUAL DESIGN / DESIGN SYSTEM section: "Visual
  // Exploration" pairs side by side with the first image, and "Design
  // System" keeps the remaining images as a horizontally scrollable
  // carousel instead of a static grid.
  const hasDesignSystemHeading = section.nodes.some(
    (n) => n.type === "heading" && n.text === "DESIGN SYSTEM",
  );
  if (hasDesignSystemHeading && section.images.length > 0) {
    const splitIndex = findLastGroupStart(section.nodes);
    const before =
      splitIndex !== null ? section.nodes.slice(0, splitIndex) : [];
    const group =
      splitIndex !== null ? section.nodes.slice(splitIndex) : section.nodes;
    const [firstImage, ...restImages] = section.images;

    const groupHeadingNode = group.find((n) => n.type === "heading");
    const groupHeadingText =
      groupHeadingNode?.type === "heading" ? groupHeadingNode.text : "";
    const groupBodyNodes = group.filter((n) => n !== groupHeadingNode);

    return (
      <div className="py-12">
        {before.length > 0 && (
          <div className={CONTAINER}>
            <Reveal>
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
                <div>{renderPlainNodes(before)}</div>
                {firstImage && <SingleImage src={firstImage} slug={slug} />}
              </div>
            </Reveal>
          </div>
        )}
        <div className={before.length > 0 ? "mt-10" : undefined}>
          <CarouselSection
            heading={groupHeadingText}
            body={
              groupBodyNodes.length > 0 ? (
                <>{renderPlainNodes(groupBodyNodes)}</>
              ) : undefined
            }
            images={restImages}
          />
        </div>
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
      const groupHeadingNode =
        group[0]?.type === "heading" && group[1]?.type === "heading"
          ? group[1]
          : group.find((n) => n.type === "heading");
      const groupHeading =
        groupHeadingNode?.type === "heading" ? groupHeadingNode.text : undefined;
      return (
        <div className={`${CONTAINER} py-12`}>
          {before.length > 0 && <ContentNodes nodes={before} />}
          <Reveal className={before.length > 0 ? "mt-10" : undefined}>
            <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
              <div>{renderPlainNodes(group)}</div>
              <SingleImage
                src={section.images[0]}
                slug={slug}
                videoKey={groupHeading}
              />
            </div>
          </Reveal>
        </div>
      );
    }
  }

  if (captions && section.images.length > 0) {
    const bodyNodes = section.nodes.slice(0, -1);
    const headingNode = bodyNodes.find((n) => n.type === "heading");
    const headingText =
      headingNode?.type === "heading" ? headingNode.text : "";
    const restNodes = bodyNodes.filter((n) => n !== headingNode);

    return (
      <div className="py-12">
        <CarouselSection
          heading={headingText}
          body={
            restNodes.length > 0 ? (
              <>{renderPlainNodes(restNodes)}</>
            ) : undefined
          }
          images={section.images}
          captions={captions}
        />
      </div>
    );
  }

  // A long section that steps through several heading groups with one
  // image per beat (e.g. a design-sprint narrative) pairs each group
  // with its corresponding image in sequence, instead of dumping every
  // image into one grid at the bottom. A single trailing group with no
  // image of its own (e.g. a closing personal-contribution note) is
  // still allowed — it just renders full-width with no paired image.
  if (!captions && section.images.length > 1) {
    const groups = splitIntoGroups(section.nodes);
    const extraTrailingGroups = groups.length - section.images.length;
    if (
      groups.length > 1 &&
      extraTrailingGroups >= 0 &&
      extraTrailingGroups <= 1
    ) {
      return (
        <div className={`${CONTAINER} py-12`}>
          <GroupedGallery groups={groups} images={section.images} slug={slug} />
        </div>
      );
    }
  }

  return (
    <div className="py-12">
      <div className={CONTAINER}>
        <ContentNodes nodes={section.nodes} />
      </div>
      {section.images.length > 0 && (
        <div className={`mt-6 ${CONTAINER}`}>
          <ImageGallery images={section.images} slug={slug} />
        </div>
      )}
    </div>
  );
}

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
  "kaios-smart-watch": new Set([
    "/images/04f770ca55bc6c0b.png", // Who are the users?
    // UI Components (every image in the section)
    "/images/774eaed10b2b3241.png", // List
    "/images/119f5bb3605a2555.png", // Header button
    "/images/1c233b17f948873a.png", // Button
    "/images/46a1ba46c81541cd.png", // Input / Option menu
    "/images/b3a05fab27de82e7.png", // Number keypad
    "/images/85740b4714d66729.png", // Magnifying effect on number keypad
    "/images/aae2c921917c56eb.png", // Slider
    "/images/a800fafc3df8e055.png", // Date picker
    "/images/0b67c600447fb40d.png", // Dialog
    "/images/230e425843188685.png", // Progress bar
    "/images/bc428a6a37b4702a.png", // Notifications
    "/images/56fc7900f4303718.png", // Voice assistant
    "/images/89ec143bfe201f31.png", // Color
    "/images/e04766405eeff218.gif", // (last UI component image)
    "/images/9b5f48c04ca785c1.png", // Screen shapes
    "/images/001819f222b17f98.png", // Hardware compatibility
    "/images/cbeb4662a37099a1.png", // Watch faces
    "/images/dc7e6fd4275e9fcd.png", // Kids / Sports
    "/images/b646337ce25f6cf2.png", // Unisex
  ]),
  "yadea-e-scooter": new Set([
    "/images/d90625018742be03.png", // App audit
    "/images/fa9f81641bb610bf.png", // Typography and colors
  ]),
  "h5os-smart-feature-phone": new Set([
    "/images/ebea979a7a09668f.png", // Visual direction
    "/images/d9d1bb3e867dafc7.png", // Theme
    "/images/b189eacbf7122eca.png", // Action icon
    "/images/8fefd546ac3f7418.png", // Badge icon
    "/images/5b62d7b6a342aac4.png", // Typeface
    "/images/d52ef7105548049a.png", // Invisible boundary
  ]),
  "fxos-smart-tv": new Set([
    "/images/e7efb4aa82f578c4.jpg", // UX Wireframe
  ]),
  "htc-lifeme": new Set([
    "/images/33a268fc4d62e12d.jpg", // UX Wireframe
    "/images/5670b3b55ecf4bd3.jpg", // Timeline view in Day, Month, and Year
    "/images/38ff16cb0722c9ec.jpg", // A look back video themes
  ]),
};

// FeatureGrid sections whose icon art is dark and needs a white
// circle behind it to stay visible on the navy page background.
const ICON_WHITE_BG_HEADINGS: Record<string, Set<string>> = {
  "h5os-smart-feature-phone": new Set(["DESIGN PRINCIPLE"]),
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

// Headings whose section steps through several parallel points, each
// with its own icon — rendered as a FeatureGrid instead of a stacked
// side-by-side narrative.
const FEATURE_GRID_HEADINGS = new Set([
  "EMERGING MARKET USERS BEHAVIOR INSIGHTS",
  "DESIGN PRINCIPLE",
  "DESIGN OBJECTIVE",
  "FEATURES",
  "VISUAL DIRECTION",
]);

// Headings whose section is a flat list of independent named items
// (not all of which have a body paragraph) — each one pairs with its
// own image regardless, so every heading starts a new group rather
// than being folded into an eyebrow+title pair with its neighbor.
const WIREFRAME_HEADINGS = new Set([
  "WIREFRAME",
  "UI COMPONENTS",
  "Overview of H5OS apps in motion",
]);

// Like WIREFRAME_HEADINGS, but the first heading is itself one of the
// flat items (not a standalone section title) — e.g. a page with no
// umbrella heading at all, just a bare list of named screens. Every
// node, including the first, becomes its own group instead of the
// first being consumed as the section's title.
const WIREFRAME_HEADINGS_NO_TITLE = new Set([
  "Timeline view in Day, Month, and Year",
  "Animation of home in pin an channel/app to home",
]);

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

// A heading key's value is normally a single video URL. When the same
// heading text legitimately repeats for two different items (e.g. two
// "HTC Sense 5.0" motion clips shown with identical visible titles),
// it can be an array instead — consumed in document order, one entry
// per occurrence, via GroupedGallery's per-heading occurrence count.
const VIDEO_OVERRIDES: Record<string, Record<string, string | string[]>> = {
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
  "htc-sense-ui": {
    "HTC Weather Clock":
      `https://player.vimeo.com/video/164675945?${VIDEO_PLAYER_PARAMS}`,
    "Panorama mode":
      `https://player.vimeo.com/video/164675986?${VIDEO_PLAYER_PARAMS}`,
    // Two distinct motion clips share the identical visible title
    // "HTC Sense 5.0" — resolved in document order (first occurrence
    // gets the first entry, second occurrence the second).
    "HTC Sense 5.0": [
      "https://player.vimeo.com/video/164694515?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
      "https://player.vimeo.com/video/164813825?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    ],
  },
  "fxos-smart-tv": {
    "Animation of home in pin an channel/app to home":
      "https://player.vimeo.com/video/165096295?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Animation of Dashboard in entering floating mode and transition of widget panels":
      `https://player.vimeo.com/video/165097433?${VIDEO_PLAYER_PARAMS}`,
    "Animation of UI components":
      `https://player.vimeo.com/video/165105448?${VIDEO_PLAYER_PARAMS}`,
    // The private-link hash — earlier attempts (plain URL, embed-code
    // format, and this same hash) hit a transient Vimeo block; retried
    // and it now loads fine directly on Vimeo's own player page.
    "Animation of Popup UI components":
      `https://player.vimeo.com/video/165105506?h=f4951df1d2&${VIDEO_PLAYER_PARAMS}`,
  },
  "fxos-smartphone": {
    "Essential Phone Project — Launch & Close":
      `https://player.vimeo.com/video/164666255?${VIDEO_PLAYER_PARAMS}`,
    "Essential Phone Project — Pin & Unpin":
      `https://player.vimeo.com/video/164664548?${VIDEO_PLAYER_PARAMS}`,
    "Ripple Project — Download":
      `https://player.vimeo.com/video/164890932?${VIDEO_PLAYER_PARAMS}`,
    "Ripple Project — Share":
      `https://player.vimeo.com/video/164890852?${VIDEO_PLAYER_PARAMS}`,
  },
  "home-automation": {
    // A private-link hash, unlike the plain video id tried earlier —
    // this one isn't domain-restricted.
    Greeting: `https://player.vimeo.com/video/436842485?h=36dfa586c1&${VIDEO_PLAYER_PARAMS}`,
  },
  "fxos-smart-feature-phone": {
    // No heading exists for this section, so the image path is the
    // key here (see the SingleImage videoKey convention below).
    "/images/7d8b9067d2ed1854.jpg":
      `https://player.vimeo.com/video/164571808?h=9665280cc0&${VIDEO_PLAYER_PARAMS}`,
  },
  "h5os-smart-feature-phone": {
    // This embed-code query format (app_id=58479, matching Vimeo's own
    // share dialog) isn't domain-restricted, unlike the plain player
    // URLs tried earlier for this same set of videos.
    "UI Components in motion":
      "https://player.vimeo.com/video/719829869?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Launcher navigation in motion":
      "https://player.vimeo.com/video/720245506?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Add a contact to Pinboard in motion":
      "https://player.vimeo.com/video/720245616?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Play FM radio and add a favorite station in motion":
      "https://player.vimeo.com/video/720245274?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Play songs via Music app in motion":
      "https://player.vimeo.com/video/720245915?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "Incoming call in motion":
      "https://player.vimeo.com/video/720245155?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
    "A parallax header of Message app in motion":
      "https://player.vimeo.com/video/720245746?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
  },
};

// Resolves a single video URL for call sites that always expect one
// override per key (as opposed to GroupedGallery's per-occurrence
// array lookup) — picks the first entry if the value is an array.
function resolveVideoSrc(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function SingleImage({
  src,
  slug,
  videoKey,
  occurrence = 0,
}: {
  src: string;
  slug: string;
  videoKey?: string;
  occurrence?: number;
}) {
  const rawVideo = VIDEO_OVERRIDES[slug]?.[videoKey ?? ""];
  const videoSrc = Array.isArray(rawVideo) ? rawVideo[occurrence] : rawVideo;
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
        <SingleImage src={images[0]} slug={slug} videoKey={images[0]} />
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {images.map((src, i) => (
        <Reveal key={src} delay={(i % 3) * 100}>
          <SingleImage src={src} slug={slug} videoKey={src} />
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
  title?: string;
  groups: HeadingGroup[];
  images: string[];
  slug: string;
}) {
  return (
    <>
      {title && (
        <Reveal className="max-w-2xl first:mt-0">
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            {title}
          </h3>
        </Reveal>
      )}

      <div className="mt-6 space-y-12">
        {groups.map((group, i) => (
          <Reveal
            key={i}
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
  // Tracks how many times each heading text has been seen so far, so
  // two groups that legitimately share the same visible title (e.g.
  // two identically-titled motion clips) can each resolve their own
  // entry from that heading's video array in document order.
  const occurrenceCounts: Record<string, number> = {};
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
        const occurrence = heading ? (occurrenceCounts[heading] ?? 0) : 0;
        if (heading) occurrenceCounts[heading] = occurrence + 1;
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
              <SingleImage
                src={image ?? ""}
                slug={slug}
                videoKey={heading}
                occurrence={occurrence}
              />
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

  // h5OS Smart Feature Phone's trailing screenshot grid has no
  // heading to key by — a full-bleed carousel with white cards reads
  // much better than the default static grid for a run of app
  // screenshots.
  if (
    slug === "h5os-smart-feature-phone" &&
    section.nodes.length === 0 &&
    section.images.length > 1
  ) {
    return (
      <div className="py-12">
        <CarouselSection images={section.images} whiteBg />
      </div>
    );
  }

  // FxOS Smart Feature Phone's concept video: title + description,
  // then the video below — both contained (matching CONTAINER's side
  // padding) instead of the default small side-by-side image grid.
  if (
    slug === "fxos-smart-feature-phone" &&
    firstNode?.type === "heading" &&
    firstNode.text === "Concept Video"
  ) {
    const videoSrc = resolveVideoSrc(VIDEO_OVERRIDES[slug]?.[section.images[0]]);
    const descNode = section.nodes[1];
    const description = descNode?.type === "para" ? descNode.text : undefined;
    return (
      <div className={`${CONTAINER} py-12`}>
        <Reveal className="max-w-2xl">
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            {firstNode.text}
          </h3>
          {description && (
            <p className="mt-4 leading-relaxed text-ink/70">
              {renderTextWithLinks(description)}
            </p>
          )}
        </Reveal>
        {videoSrc && (
          <Reveal className="mt-6">
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
          </Reveal>
        )}
      </div>
    );
  }

  // Home Automation's animated walkthrough: the title, then the
  // "Greeting" video on its own, then the remaining named screens as
  // a full-bleed carousel instead of the default paired-with-image
  // layout.
  if (
    slug === "home-automation" &&
    firstNode?.type === "heading" &&
    firstNode.text ===
      "Animation of home automation from greeting screen to home screen"
  ) {
    const videoSrc = resolveVideoSrc(VIDEO_OVERRIDES[slug]?.["Greeting"]);
    const screenCaptions = section.nodes
      .slice(1)
      .filter((n): n is Extract<ContentNode, { type: "heading" }> => n.type === "heading")
      .map((n) => n.text);
    return (
      <div className="py-12">
        <div className={CONTAINER}>
          <Reveal className="max-w-2xl">
            <h3 className="font-display text-xl font-bold sm:text-2xl">
              {firstNode.text}
            </h3>
          </Reveal>
        </div>
        {videoSrc && (
          <Reveal className="mt-6">
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src={videoSrc}
                title="Vimeo video"
                className="h-full w-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Reveal>
        )}
        <div className="mt-10">
          <CarouselSection
            heading="KEY SCREENS"
            images={section.images}
            captions={screenCaptions}
          />
        </div>
      </div>
    );
  }

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

  // WIREFRAME-style sections pair each sub-heading (e.g. "Mobile App",
  // "Website", or a flat list of UI component names) with its own
  // screenshot, side by side, instead of the default layout. Every
  // heading starts its own group here — unlike the eyebrow+title
  // pairing used elsewhere — since these are independent items that
  // just don't all have a body paragraph.
  if (firstNode?.type === "heading" && WIREFRAME_HEADINGS.has(firstNode.text)) {
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

  if (
    firstNode?.type === "heading" &&
    WIREFRAME_HEADINGS_NO_TITLE.has(firstNode.text)
  ) {
    const groups = groupByHeading(section.nodes);
    return (
      <div className={`${CONTAINER} py-12`}>
        <WireframeSection groups={groups} images={section.images} slug={slug} />
      </div>
    );
  }

  // A handful of parallel points, each optionally with its own icon —
  // laid out as a feature grid (3 columns for 6 items, 4 for a single
  // row of 4, otherwise 3) instead of a stacked side-by-side
  // narrative. Some pages give the section its own subheading line (2
  // leading nodes before the items start), others don't (1 leading
  // node) — infer which from how many nodes are left over once every
  // image has claimed a title+desc pair. Sections with no images at
  // all (no icons to assign) have no such anchor, so just skip the
  // section's own heading. A section with a "list" node never matches
  // this repeated-title+desc shape (e.g. an intro paragraph followed
  // by a bulleted list under the same heading text on a different
  // page) — fall through to the default rendering instead.
  const hasListNode = section.nodes.some((n) => n.type === "list");
  if (
    firstNode?.type === "heading" &&
    FEATURE_GRID_HEADINGS.has(firstNode.text) &&
    !hasListNode
  ) {
    const leadCount =
      section.images.length > 0
        ? section.nodes.length - 2 * section.images.length
        : 1;
    const subheadingNode = leadCount >= 2 ? section.nodes[1] : undefined;
    const subheading =
      subheadingNode?.type === "heading" ? subheadingNode.text : "";
    const iconWhiteBg = ICON_WHITE_BG_HEADINGS[slug]?.has(firstNode.text);
    const items = parseFeatureItems(
      section.nodes.slice(Math.max(leadCount, 1)),
      section.images,
    ).map((item) => (iconWhiteBg ? { ...item, iconWhiteBg: true } : item));
    return (
      <div className="py-12">
        <FeatureGrid
          eyebrow={subheading ? firstNode.text : undefined}
          heading={subheading || firstNode.text}
          items={items}
          columns={items.length === 4 ? 4 : 3}
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
  // treat each item as that image's caption instead of a separate
  // list. Require it to be the section's only list, so a section with
  // several genuine bullet lists (where the last one just happens to
  // match the image count) doesn't get misread as captions.
  const lastNode = section.nodes[section.nodes.length - 1];
  const listNodeCount = section.nodes.filter((n) => n.type === "list").length;
  const captions =
    lastNode?.type === "list" &&
    listNodeCount === 1 &&
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

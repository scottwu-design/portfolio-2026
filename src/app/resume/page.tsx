import type { Metadata } from "next";
import {
  EXPERIENCE,
  LANGUAGES,
  SPECIALTIES,
  STUDY,
  TOOLS,
} from "@/data/resume";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Scott Wu's resume — 10+ years of experience in visual, UX, and motion design across KaiOS, Mozilla, HTC, and more.",
};

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/15 px-3 py-1 text-sm text-ink/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <div className="bg-navy text-ink">
      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/8c9b725b8fb063b4.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />

        <div className={`relative ${CONTAINER}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            Summary
          </p>
          <p className="mt-6 max-w-3xl font-display text-xl font-bold leading-snug sm:text-3xl">
            I&apos;m a creative professional with 10+ years of experience in
            visual, UX, and motion design in New York and Taipei,
            specializing in the fields of mobile phone, TV, wearable, web,
            and IoT.
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink/70">
            My work ranges from interaction design, user interface visual
            design, motion graphic design, and print design to brand
            identity. I strive to create successful and engaging work with
            newfound everyday influences.
          </p>
        </div>
      </section>

      <section className={`${CONTAINER} py-20 sm:py-24`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          Experience
        </p>

        <ol className="mt-8 space-y-12 border-l border-white/15 pl-8">
          {EXPERIENCE.map((entry) => (
            <li key={entry.title} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(entry.logo)}
                  alt=""
                  className="h-9 w-9 rounded-full bg-white object-contain p-1"
                />
                <h3 className="font-display text-lg font-bold">
                  {entry.title}
                </h3>
              </div>
              <p className="mt-1 text-sm text-ink/50">
                {entry.dateRange} · {entry.location}
              </p>
              {entry.projects && (
                <p className="mt-3 text-sm text-ink/60">{entry.projects}</p>
              )}
              {entry.award && (
                <p className="mt-2 text-sm text-ink/60">{entry.award}</p>
              )}
              {entry.intro && (
                <p className="mt-3 text-ink/70">{entry.intro}</p>
              )}
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/70">
                {entry.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-white/10 py-20 sm:py-24">
        <div className={`${CONTAINER} grid grid-cols-1 gap-10 sm:grid-cols-2`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Specialties
            </p>
            <TagList items={SPECIALTIES} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Tools
            </p>
            <TagList items={TOOLS} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Study
            </p>
            <ul className="mt-3 space-y-4">
              {STUDY.map((s) => (
                <li key={s.school}>
                  <p className="font-medium text-ink">{s.school}</p>
                  <p className="text-sm text-ink/50">
                    {s.dateRange} · {s.degree}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Language
            </p>
            <ul className="mt-3 space-y-2">
              {LANGUAGES.map((l) => (
                <li key={l.name}>
                  <span className="font-medium text-ink">{l.name}</span>{" "}
                  <span className="text-sm text-ink/50">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

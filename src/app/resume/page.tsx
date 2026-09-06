import type { Metadata } from "next";
import {
  EXPERIENCE,
  LANGUAGES,
  SPECIALTIES,
  STUDY,
  TOOLS,
} from "@/data/resume";
import { asset } from "@/lib/asset";

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
          className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <>
      <section
        className="relative flex min-h-[50vh] items-center bg-black bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${asset("/images/8c9b725b8fb063b4.jpg")})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Summary
          </p>
          <p className="mt-4 text-xl leading-relaxed sm:text-2xl">
            I&apos;m a creative professional with 10+ years of experience in
            visual, UX, and motion design in New York and Taipei,
            specializing in the fields of mobile phone, TV, wearable, web,
            and IoT. My work ranges from interaction design, user interface
            visual design, motion graphic design, and print design to brand
            identity. I strive to create successful and engaging work with
            newfound everyday influences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Experience
        </p>

        <ol className="mt-8 space-y-12 border-l border-neutral-200 pl-8">
          {EXPERIENCE.map((entry) => (
            <li key={entry.title} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900" />
              <h3 className="text-lg font-semibold text-neutral-900">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {entry.dateRange} · {entry.location}
              </p>
              {entry.projects && (
                <p className="mt-3 text-sm text-neutral-600">
                  {entry.projects}
                </p>
              )}
              {entry.award && (
                <p className="mt-2 text-sm text-neutral-600">{entry.award}</p>
              )}
              {entry.intro && (
                <p className="mt-3 text-neutral-700">{entry.intro}</p>
              )}
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-700">
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

      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Specialties
            </p>
            <TagList items={SPECIALTIES} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Tools
            </p>
            <TagList items={TOOLS} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Study
            </p>
            <ul className="mt-3 space-y-4">
              {STUDY.map((s) => (
                <li key={s.school}>
                  <p className="font-medium text-neutral-900">{s.school}</p>
                  <p className="text-sm text-neutral-500">
                    {s.dateRange} · {s.degree}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Language
            </p>
            <ul className="mt-3 space-y-2">
              {LANGUAGES.map((l) => (
                <li key={l.name}>
                  <span className="font-medium text-neutral-900">
                    {l.name}
                  </span>{" "}
                  <span className="text-sm text-neutral-500">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

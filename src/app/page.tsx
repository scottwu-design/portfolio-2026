import Link from "next/link";
import { WorksMosaic } from "@/components/WorksMosaic";
import { projects } from "@/lib/content";

const I_AM = [
  {
    title: "A Designer of Global Backgrounds",
    body: "I completed my master's at Parsons Design School and gained valuable work experience in New York and Taipei. Working with top designers shaped my high standards and distinctive design sensibilities.",
  },
  {
    title: "Adaptive in Different Workplace",
    body: "From New York to Taipei, my career led me into all kinds of companies, from creative agencies to multinational corporates to start-ups. The different scales of these companies gave me perfect opportunities to learn different ways of working and how we bring our products to life.",
  },
  {
    title: "Capable in Both Visual and UX",
    body: "I specialize in UI, interaction, and motion design for a wide range of products, such as mobile phones, wearables, websites, TVs, and Set-top boxes. My expertise spans from small-scale applications to large-scale operating systems and ecosystems.",
  },
];

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      {/* Hero — nav sits directly on navy, thin rule below like the reference nav */}
      <section className="border-b border-white/10 px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <p className="animate-[rise_0.7s_ease_forwards] text-xs font-semibold uppercase tracking-[0.2em] text-accent-light opacity-0">
            Digital Product Designer
          </p>
          <h1 className="mt-6 animate-[rise_0.8s_0.1s_ease_forwards] font-display text-4xl font-bold leading-[1.05] tracking-tight opacity-0 sm:text-6xl sm:leading-[1.02]">
            Hello, I&apos;m Scott Wu, a creative professional focused on{" "}
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
              digital product design.
            </span>
          </h1>
          <div className="mt-10 flex animate-[rise_0.8s_0.3s_ease_forwards] items-center gap-4 opacity-0">
            <Link
              href="/work"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View My Work
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* I Am — bordered capability cards, real content */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            I am...
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {I_AM.map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-white/15 p-7 transition-colors hover:border-accent-light"
              >
                <h2 className="font-display text-lg font-bold leading-snug">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works — full-bleed edge-to-edge mosaic */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            Selected Works
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl font-display text-2xl font-bold sm:text-4xl">
            The best way to understand what I do is to see what I have done.
          </h2>
        </div>
        <div className="mt-12">
          <WorksMosaic projects={featured} />
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-block rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
          >
            View All Work
          </Link>
        </div>
      </section>
    </div>
  );
}

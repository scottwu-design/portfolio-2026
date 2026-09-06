import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";

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
    <>
      <section
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black bg-cover bg-center px-6 py-24 text-center text-white"
        style={{ backgroundImage: `url(${asset("/images/804a177782632f59.png")})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Hello, I&apos;m Scott Wu, a creative professional focused on
            digital product design.
          </h1>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/work"
              className="rounded-full border border-white px-8 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white hover:text-black"
            >
              Works
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-white px-8 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white hover:text-black"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          I am...
        </p>
        <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {I_AM.map((item) => (
            <div key={item.title}>
              <h2 className="text-lg font-semibold text-neutral-900">
                {item.title}
              </h2>
              <p className="mt-3 leading-relaxed text-neutral-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Selected works
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-neutral-900 sm:text-3xl">
          The best way to understand what I do is to see what I have done.
        </h2>
        <div className="mt-10">
          <ProjectGrid projects={featured} />
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-block rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            View all work
          </Link>
        </div>
      </section>
    </>
  );
}
